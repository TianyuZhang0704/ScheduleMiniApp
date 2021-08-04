// global variable
var load = require('../utils/loadDatabase.js');
var helper = require('../utils/calculateSchedule.js');

// load.loadDataBase();

const input1  = ["CSC108H1-S-20219", "MAT237Y1-Y-20219", "PHY100H1-F-20219", "PHY100H1-F-20219"];
const input2  = ["CSC108H1-S-20219", "MAT237Y1-Y-20219"];

const FALL = 0;
const WINTER =1;
const schedule = [
  {"MO": [[9,12],[9,10],[1,10],[8,12]], "TU": [], "WE": [], "TH": [], "FR": []}, 
  {"MO": [], "TU": [], "WE": [], "TH": [], "FR": []}
];

var schedule = [
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
// Helpers:

function handelInput(input){
  let i = 0;
  while (i < input.length){
    let term = input[i].split('-')[1];
    let courseItem = {};
    courseItem.code = input[i];
    // save offering schedules to each course
    let [lect, tut] = helper.getOfferings(input[i]);
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

let lectOfferings = [
  {
    meetingName: "LEC-0101",
    day: "TH",
    time: [13, 15]
  }
]

let tutOfferings = [
  {
    meetingName: "TUT-0101",
    day: "TU",
    time: [15, 16]
  }, {
    meetingName: "TUT-0102",
    day: "TU",
    time: [15, 16]
  }
]

let conflictToYear = {};

let conflictToAll = {};

function setYears() {
  for (let i = 0; i < courses.Y.length; i++) {
    for (let j = 0; j < courses.Y[i].lectOfferings; j++) {

      let attempt = [];
      let total = 0;

      // start point
      attempt.push(courses.Y[i].lectOfferings[j]);
      attempt = helper.chooseTheBest(attempt, courses.Y[i].tutOfferings, FALL);

      // add remaing year courses
      for (let k = i + 1; k < courses.Y.length; k++) {
        attempt = helper.chooseTheBest(attempt, courses.Y[k].lectOfferings, FALL).schedule;
        total = total + helper.chooseTheBest(attempt, courses.Y[k].lectOfferings, FALL).numConflicts;
        attempt = helper.chooseTheBest(attempt, courses.Y[k].tutOfferings, FALL).schedule;
        total = total + helper.chooseTheBest(attempt, courses.Y[k].tutOfferings, FALL).numConflicts;
      }

      // if total conflict num not in dict, add key
      if (!conflictToYear[total]) {
        conflictToYear[total] = [];
      }

      // save to dict by corresponding conflict num
      conflictToYear[total].push(attempt);
    }
  }
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

function scheduler() {
  while (Object.keys(conflictToYear).length !== 0) {

    // start point
    let [attempt, total] = findBestYearPlan();

    // add remaining fall courses
    for (let i = 0; i < courses.F.length; i++) {
      attempt = helper.chooseTheBest(attempt, courses.F[i].lectOfferings, FALL).schedule;
      total = total + helper.chooseTheBest(attempt, courses.F[i].lectOfferings, FALL).numConflicts;
      attempt = helper.chooseTheBest(attempt, courses.F[i].tutOfferings, FALL).schedule;
      total = total + helper.chooseTheBest(attempt, courses.F[i].tutOfferings, FALL).numConflicts;
    }

    // add remaining year courses
    for (let j = 0; j < courses.S.length; j++) {
      attempt = helper.chooseTheBest(attempt, courses.S[j].lectOfferings, WINTER).schedule;
      total = total + helper.chooseTheBest(attempt, courses.S[j].lectOfferings, WINTER).numConflicts;
      attempt = helper.chooseTheBest(attempt, courses.S[j].tutOfferings, WINTER).schedule;
      total = total + helper.chooseTheBest(attempt, courses.S[j].tutOfferings, WINTER).numConflicts;
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

