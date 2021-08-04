// global variable
const input1  = ["CSC108H1-S-20219", "MAT237Y1-Y-20219", "PHY100H1-F-20219", "PHY100H1-F-20219"];
const input2  = ["CSC108H1-S-20219", "MAT237Y1-Y-20219"];

const FALL = 0;
const WINTER =1;
const schedule = [
  {"MO": [[9,12],[9,10],[1,10],[8,12]], "TU": [], "WE": [], "TH": [], "FR": []}, 
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
// Helpers:

function handelInput(input){
  let i = 0;
  while (i < input.length){
    let term = input[i].split('-')[1];
    if (term.localeCompare('F') === 0){
      courses.F.push(input[i]);
    } else if (term.localeCompare('S') === 0){
      courses.S.push(input[i]);
    } else {
      courses.Y.push(input[i]);
    }
    i++;
  }
}

async function addYearCourseToSche(code){
  await wx.cloud.database().collection('courses').doc(code)
  .get()
  .then((res) => {
      let meetings = res.data.meetings;
      for (let section in meetings){
        let lesson = res.data.meetings[section]
        if (lesson.teachingMethod.localeCompare("LEC") === 0){
          let courseSchedule = lesson.schedule;
          for (let day in courseSchedule){
            let start = courseSchedule[day].meetingStartTime;
            let end = courseSchedule[day].meetingEndTime;
            let meetingDay = courseSchedule[day].meetingDay;
            schedule[FALL][meetingDay].push([parseInt(start, 10), parseInt(end, 10)]);
          }
          // console.log(schedule);
          break;
        }

        
        // for (let day in off[0]){
        //   schedule[FALL][day].push(off[0][day])
        // }
      }

      // console.log('schdule in addCourseToSche', schedule);

    }     
  )
}

function checkAllConflicts(term){
  let acc = 0
  for (let day in schedule[term]){
    acc += checkConflictOnDay(day, term);
  }
}


// return the number of conflicts within the given day in the given term
function checkConflictOnDay(day, term){
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




function main_func(){
  handelInput(input1); 
  console.log(courses);
  // // addYearCourseToSche("MAT237Y1-Y-20219");
  // // console.log('schedule in main', schedule);
  // console.log(checkAllConflicts(FALL));

}

module.exports = {
  main_func: main_func
}