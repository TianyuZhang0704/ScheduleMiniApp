// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');
const scheduleHelper = require('../../miniprogram/utils/scheduleHelper');
const URL = 'https://timetable.iit.artsci.utoronto.ca/api/20219/courses';
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  // step1: split input into two arrays: fall and winter
  let courses = {
    F: [],
    S: [],
    Y: []
  }
  let i = 0;
  while (i < event.inputVal.length){
    let course = event.inputVal[i];
    let term = await cloud.database().collection('courses').doc(course).get()
    .then(res => {
      courses[res.data.section].push(course);
    })
    .catch (err =>{
      console.log('fail', err);
    })
    i++;
  }
  
  // step2: initialize schedule to do combination
  let schedule = {
    F: {MO: [], TU: [], WE: [], TH: [], FR: []},
    S: {MO: [], TU: [], WE: [], TH: [], FR: []},
  };
  meetings = {
    "LEC-0101": {
     MO: [9, 10],
     TU: [9, 10],
     W: [9, 10]
    },
    "LEC-0201": [9, 10],
    "LEC-0301": [16, 19]
  }



  let plan = {
    F: [],
    S: []
  };

  // step3: define helpers:
  function addCourse(code, term){
    const meetings = 
    // add lecture

  }

  function popCourse(code){

  }

  function checkConflict(term){
    

    return true; 
  }
  
  function randomConflicts(term){

  }

  function addFall(){
    let fallNum = courses[F].length;
    let yearNum =  courses[Y].length;

    for (let i = 0; i < courses[F].length; i++){
      addCourse(courses.F[i]);
    }
    if (plan[F].length < fallNum + yearNum){
      randomConflicts(F);
    } else if (plan[F].length = fallNum + yearNum){
      console.log('we planed fall without conflicts', plan[F]);
    } else {
      console.log('error occurs in add(term)');
    }
  }

  //step4: do combination on fall term 
  // add the first course to inialize comparison



}
