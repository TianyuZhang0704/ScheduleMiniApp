// global variable
const input1  = ["CSC108H1-S-20219", "MAT237Y1-Y-20219", "PHY100H1-F-20219", "PHY100H1-F-20219"];
const input2  = ["CSC108H1-S-20219", "MAT237Y1-Y-20219"];

const FALL = 0;
const WINTER =1;
const SCHEDULE = [
  {"MO": [], "TU": [], "WE": [], "TH": [], "FR": []}, 
  {"MO": [], "TU": [], "WE": [], "TH": [], "FR": []},
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

async function addCourseToSche(code, term){
  await wx.cloud.database().collection('courses').doc(code)
  .get()
  .then((res) => {
      let off = res.data.offerings;
      let ind;
      for (ind in off){
        let d = Object.keys(off[ind])[0];
        SCHEDULE[term][d].push(off[ind][d]);
      }
      checkConflictOnDay('MO', FALL);
    }     
  )
}

function checkConflictOnDay(day, term){
  console.log(SCHEDULE[term][day]);
}

function checkConflictinTwo(course1, course2){

}


function main_func(){
  handelInput(input1); 
  addCourseToSche("CSC108H1-S-20219", FALL);
  checkConflictOnDay('WE', FALL);
  console.log(SCHEDULE);
}

module.exports = {
  main_func: main_func
}