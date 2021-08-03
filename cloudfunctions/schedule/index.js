// 云函数入口文件
const cloud = require('wx-server-sdk');
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
  let schedule = [
    {"MO": [], "TU": [], "WE": [], "TH": [], "FR": []}, 
    {"MO": [], "TU": [], "WE": [], "TH": [], "FR": []},
  ];

  let plan = {
    F: [],
    S: []
  };

  // step3: define helpers:
    // add lecture
    cloud.database().collection('courses').doc('CSC108H1-S-20219')
    .get({
      success(res){
        let off = res.data.offerings;
        let ind;
        for (ind in off){
          let d = Object.keys(off[ind])[0];
          schedule[0][d].push(off[ind][d]);
        }
      }     
    })
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




