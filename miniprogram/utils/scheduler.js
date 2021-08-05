
var load = require('./loadDatabase.js');

// load.loadDataBase();

// global variable
const input1  = ["CSC108H1-S-20219", "MAT137Y1-Y-20219", "PHY100H1-F-20219"];
const input2  = ["CSC108H1-S-20219", "MAT137Y1-Y-20219"];

const FALL = 0;
const WINTER =1;


let plan = {
  F: [],
  S: []
};

let courses = { // handle input 
  F: [],
  S: [],
  Y: []
}


// add section into attempt in term 
async function addCourseToAttempt(attempt, code, section, term){
  await wx.cloud.database().collection('courses').doc(code)
  .get()
  .then((res) => {
    let meetings = res.data.meetings;
    let courseSchedule = meetings[section].schedule;
    for (let day in courseSchedule){
      let start = courseSchedule[day].meetingStartTime;
      let end = courseSchedule[day].meetingEndTime;
      let meetingDay = courseSchedule[day].meetingDay;
      attempt[term][meetingDay].push([parseInt(start, 10), parseInt(end, 10)]);
      }
    }   
  )
}

function addCourse(schedule, sectionObj, term){
  let offerings = sectionObj.offerings;
  for (let day in offerings){
    schedule[term][day].push(offerings[day]);
  }
  return schedule;
}

function removeCourse(schedule, sectionObj, term){
  let offerings = sectionObj.offerings;
  for (let day in offerings){
    schedule[term][day].pop(offerings);
  }
  return schedule;
}

function checkAllConflicts(schedule, term){
  let acc = 0
  for (let day in schedule[term]){
    acc = acc + checkConflictOnDay(day, term, schedule);
  }
  return acc;
}


// return the number of conflicts within the given day in the given term
function checkConflictOnDay(day, term, schedule){
  let conflicts = 0;
  let daySchedule = schedule[term][day];
  for (let i = 0; i < daySchedule.length - 1; i++){
    for (let j = i + 1 ; j < daySchedule.length; j++){

      let first = daySchedule[i];
      let second = daySchedule[j];
      // condition 1 : second course start inbetween the first course: first[0] <= second[0] < first[1]
      let condition1 = (first[0] <= second[0]) && (second[0] < first[1]);

      // condition 2: second course end inbetween the first course: first[0] < second[1] < first[1]
      let condition2 = (first[0] < second[1]) && (second[1] <= first[1]);

      // condition 3: first course is completely during the second course: second[0] <= first[0] AND first[1] <= second[1]
      let condition3 = (second[0] <= first[0]) && (first[1] <= second[1]);

      if (condition1 || condition2 || condition3){
        // if first and second course fail one of conditions, conflicts +1
        conflicts++;
      }
    }
  }
  return conflicts
}

async function chooseTheBest(attempt, candidates, term){
  let schedule = [
    {"MO": [], "TU": [], "WE": [], "TH": [], "FR": []}, 
    {"MO": [], "TU": [], "WE": [], "TH": [], "FR": []}
  ];
  // // get courseCode in attempt plan
  // let courseCodes = [];
  // for (let section of attempt){
  //   courseCodes.push(section.courseCode);
  // }
  // draw the current schedule by adding courses in the attempt plan
  let allConflicts = {};
  for (let i = 0; i < attempt.length; i++){
    schedule = addCourse(schedule, attempt[i], term);
  }
  // get courseCode of candidates (candidates have the same code)
  let candidateCode = candidates[0].courseCode;
  // add one candidate to schedule and after calculating the conflict, pop the candidate added
  for (let i = 0; i < candidates.length; i++){
    schedule = addCourse(schedule, candidates[i], term);
    let conflictNum = checkAllConflicts(schedule, term);

    // add the conflictNum and its corresponding section to allConflicts
    if (!allConflicts[conflictNum]){
      allConflicts[conflictNum] = [];
    } 
    allConflicts[conflictNum].push(candidates[i]);
    // remove the course from schedule
    schedule = removeCourse(schedule, candidates[i], term);
  }

  // find the smallest key in allConflicts
  let keys = [];
  for (let k in allConflicts){
    keys.push(parseInt(k, 10));
  }

  let minKey = Math.min(...keys);
  // console.log('minKay', minKey);
  // console.log('allConflicts', allConflicts);
  let bestSection = allConflicts[minKey][0];
  // add the correct section to attempt
  attempt.push(bestSection);
  return [attempt, minKey];
}

async function getOfferings(code){
  let result = await wx.cloud.database().collection('courses').doc(code).get()
  for (let section of result.data.lectOfferings){
    section.courseCode = code;
  }
  for (let section of result.data.tutOfferings){
    section.courseCode = code;
  }
  return [result.data.lectOfferings, result.data.tutOfferings];
}

async function handelInput(input){
  let i = 0;
  while (i < input.length){
    let term = input[i].split('-')[1];
    let courseItem = {};
    courseItem.code = input[i];
    // save offering schedules to each course
    let [lect, tut] = await getOfferings(input[i]);
    courseItem.lectOfferings = lect;
    courseItem.tutOfferings = tut;
    if (term.localeCompare('F') === 0){
      courses.F.push(courseItem);
    } else if (term.localeCompare('S') === 0){
      courses.S.push(courseItem);
    } else {
      courses.Y.push(courseItem);
    }
    i++;
  }
}

let conflictToYear = {};

let conflictToAll = {};

async function setYears() {
  for (let i = 0; i < courses.Y.length; i++) {
    for (let j = 0; j < courses.Y[i].lectOfferings.length; j++) {

      let attempt = [];
      let total = 0;

      // start point
      attempt.push(courses.Y[i].lectOfferings[j]);
      chooseTheBest(attempt, courses.Y[i].tutOfferings, FALL)
      .then ((res) => {
        attempt = res[0]
      })

      // add remaing year courses
      for (let k = i + 1; k < courses.Y.length; k++) {
        attempt = await chooseTheBest(attempt, courses.Y[k].lectOfferings, FALL)[0];
        total = total + await chooseTheBest(attempt, courses.Y[k].lectOfferings, FALL)[1];
        attempt = await chooseTheBest(attempt, courses.Y[k].tutOfferings, FALL)[0];
        total = total + await chooseTheBest(attempt, courses.Y[k].tutOfferings, FALL)[1];


        // if total conflict num not in dict, add key
        if (!conflictToYear[total]) {
          conflictToYear[total] = [];
        }
        // save to dict by corresponding conflict num
        conflictToYear[total].push(attempt);
        console.log(conflictToYear);
        }
      }
    }
    return conflictToYear;
  }


function findBestYearPlan() {

  let nums = [];
  for (var key in conflictToYear) {
    nums.push(key);
  }

  // if dict is empty, no year courses, just return empty and no conflict
  if (nums == []) {
    return [[], 0];
  }

  // otherwise, find minimum conflict
  let minKey = Math.min(...nums);
  let result = conflictToYear[minKey][0];

    // delete best plan, so next time will find second best
    conflictToYear[minKey].splice(0, 1);

    // if a key contains empty list, just delete it
    if (conflictToYear[minKey] == []) {
      delete conflictToYear[minKey];
    }
    return [result, minKey];  
}

async function scheduler() {
  while (Object.keys(conflictToYear).length !== 0) {
    
    // start point
    let [attempt, total] = findBestYearPlan();
    
    // add remaining fall courses
    for (let i = 0; i < courses.F.length; i++) {
      attempt = await chooseTheBest(attempt, courses.F[i].lectOfferings, FALL)[0];
      total = total + await chooseTheBest(attempt, courses.F[i].lectOfferings, FALL)[1];
      attempt = await chooseTheBest(attempt, courses.F[i].tutOfferings, FALL)[0];
      total = total + await chooseTheBest(attempt, courses.F[i].tutOfferings, FALL)[1];
    }

    // add remaining year courses
    for (let j = 0; j < courses.S.length; j++) {
      attempt = await chooseTheBest(attempt, courses.S[j].lectOfferings, WINTER).schedule;
      total = total + await chooseTheBest(attempt, courses.S[j].lectOfferings, WINTER)[1];
      attempt = await chooseTheBest(attempt, courses.S[j].tutOfferings, WINTER).schedule;
      total = total + await chooseTheBest(attempt, courses.S[j].tutOfferings, WINTER)[1];
    }

    // if no conflict, return directly
    if (total == 0) {
      return [attempt, total];
    }

    // if total conflict num not in dict, add key
    if (!conflictToAll[total]) {
      conflictToAll[total] = [];
    }

    // save to dict by corresponding conflict num
    conflictToAll[total].push(attempt);
  }

  // If haven't return yet, meanings no plan with 0 conflict. Then find least conflict.
  return findBestAllPlan();
}

function findBestAllPlan() {

  let nums = [];
  for (var key in conflictToAll) {
    nums.push(key);
  }

  // if dict is empty, err
  if (nums == []) {
    return [[], -1];
  }

  // otherwise, find minimum conflict
  let minKey = Math.min(...nums);
  let result = conflictToYear[minKey][0];
  return [result, minKey];
}

async function main_func(){
  let schedule = [
    {"MO": [], "TU": [], "WE": [], "TH": [], "FR": []}, 
    {"MO": [], "TU": [], "WE": [], "TH": [], "FR": []}
  ];
  await handelInput(input1);
  console.log("handeled input", courses);
  console.log('obj', courses.Y[0]);
  schedule = addCourse(schedule, courses.Y[0].lectOfferings[0], FALL);
  console.log(schedule);
  
}

module.exports = {
  main_func: main_func,
  handelInput: handelInput
}
