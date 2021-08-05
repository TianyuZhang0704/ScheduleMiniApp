var scheduler = require('./scheduler.js');

// global variable
const input1  = ["CSC108H1-S-20219", "MAT137Y1-Y-20219", "PHY100H1-F-20219"];
const input2  = ["CSC108H1-S-20219", "MAT137Y1-Y-20219"];

const FALL = 0;
const WINTER =1;
const schedule = [
  {"MO": [], "TU": [], "WE": [], "TH": [], "FR": []}, 
  {"MO": [], "TU": [], "WE": [], "TH": [], "FR": []}
];

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

async function addCourseFromAttemptToSche(code, section, term){
  const res = await wx.cloud.database().collection('courses').doc(code).get()
  let meetings = res.data.meetings;
    let courseSchedule = meetings[section].schedule;
    for (let day in courseSchedule){
      let start = courseSchedule[day].meetingStartTime;
      let end = courseSchedule[day].meetingEndTime;
      let meetingDay = courseSchedule[day].meetingDay;
      attempt[term][meetingDay].push([parseInt(start, 10), parseInt(end, 10)]);
      }
}

function checkAllConflicts(attempt, term){
  let acc = 0
  for (let day in attempt[term]){
    acc = acc + checkConflictOnDay(day, term);
  }
}


// return the number of conflicts within the given day in the given term
function checkConflictOnDay(day, term){
  let conflicts = 0;
  let daySchedule = attempt[term][day];
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

async function choooseTheBest(courseCodes, attempt, candidates, term){
  let plans = [];
  let allConflicts = {};
  for (let i = 0; i < attempt.length; i++){
    addCourseFromAttemptToSche(courseCodes[i], attempt[i].meetingName, term);
  }
    // await addCourseToAttempt(attempt, candidate, section);
    // let conflict = checkAllConflicts(attmpt,term);
    // if (Object.keys(allConflicts).includes(conflict)){
    //   allConflicts[conflict].push(attempt)
    // }

}

async function getOfferings(code){
  let result = await wx.cloud.database().collection('courses').doc(code).get()
  return [result.data.lectOfferings, result.data.tutOfferings];
}


async function main_func(){
  // handelInput(input1); 
  // console.log(courses);
  // addCourseToSche("CSC108H1-S-20219", "LEC-0101");
  // console.log('schedule in main', schedule);
  // console.log(checkAllConflicts(FALL));
  // await getOfferings("CSC108H1-S-20219");
  await scheduler.handelInput(input1);
  console.log('input handeled in main', courses);
  let attempt = [];
  let courseCodes = [];

  // start point
  attempt.push(courses.Y[0].lectOfferings[1]);
  courseCodes.push(courses.Y[i].lectOfferings[0]);
  console.log('attempt and courseCode', [attempt, courseCodes]);
  // [attempt, courseCodes] = helper.chooseTheBest(courseCode, attempt, courses.Y[i].tutOfferings, FALL);

}

module.exports = {
  main_func: main_func,
  getOfferings : getOfferings,
  choooseTheBest: choooseTheBest,
  schedule: schedule
}