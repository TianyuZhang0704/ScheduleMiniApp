// miniprogram/pages/schedule/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    tab: -1,    // -1: any, 0: fall, 1: winter, 2: year
    showSelection: false,
    inputVal: '',
    statusHeight: 0,
    sectionType: 0,    // 0: fall, 1: winter
    courses: [],
    myFallCourses: [],
    myWinterCourses: [],
    myCurrCourses: [],
    myAllCourses: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success (res) {
        let top = wx.getMenuButtonBoundingClientRect().top;
        that.setData({
          statusHeight: res.statusBarHeight + top + 6
        })
        console.log(that.data.statusHeight)
      }
    })
    this.setData({
      myCurrCourses: this.data.myFallCourses
    })
  },

  onChangeSection: function() {
    this.setData({
      showSelection: !this.data.showSelection,
      // tab: this.data.tab == 0 ? 1 : 0
    })
  },

  chooseFall: function() {
    this.setData({
      tab: 0,
      showSelection: false,
      section: 'F'
    })
  },

  chooseWinter: function() {
    this.setData({
      tab: 1,
      showSelection: false,
      section: 'S'
    })
  },

  chooseAny: function() {
    this.setData({
      tab: -1,
      showSelection: false,
      section: ''
    })
  },

  chooseYear: function() {
    this.setData({
      tab: 2,
      showSelection: false,
      section: 'Y'
    })
  },

  onChangeFall: function() {
    this.setData({
      sectionType: 0,
      myCurrCourses: this.data.myFallCourses
    })
  },

  onChangeWinter: function() {
    this.setData({
      sectionType: 1,
      myCurrCourses: this.data.myWinterCourses
    })
  },

  viewCurrentSchedule: function() {
    wx.navigateTo({
      url: '/pages/viewschedule/index',
    })
  },

  onClearInput: function() {
    console.log("clear")
    this.setData({
      inputVal: '',
      courses: []
    })
  },

  onSearch: function() {
    // if (this.data.tab == -1) {
    //   wx.showToast({
    //     title: 'Please select a section',
    //     icon: "none"
    //   })
    //   return;
    // }
    let that = this;
    wx.showLoading({
      title: 'Searching...',
    })
    wx.request({
      url: 'https://timetable.iit.artsci.utoronto.ca/api/20219/courses',
      data: { 
        code: that.data.inputVal,
        section: that.data.section ? that.data.section : '',
      // code: "CSC108" 大小写都可以 
      // title: "Introduction to Computer Programming" 
      },
      header: { 'content-type': 'application/json' // 默认值 
      }, 
      success (res) { 
        let courses= [];
        let name;
        for (name in res.data) {
          let courseItem = {};
          courseItem.name = name;
          courseItem.code = res.data[name].code;
          courseItem.courseTitle = res.data[name].courseTitle;
          courseItem.section = res.data[name].section;
          courses.push(courseItem);
        }
        that.setData({
          courses: courses
        })
        wx.hideLoading();
        console.log(res.data)
      } 
    })
  },

  onAdd: function(e) {
    let course = e.detail;
    let tempFall = this.data.myFallCourses;
    let tempWinter = this.data.myWinterCourses;
    let tempAll = this.data.myAllCourses;
    tempAll.push(course);
    this.setData({
      myAllCourses: tempAll
    })
    if (course.section == "Y") {
      tempFall.push(course);
      tempWinter.push(course);
      this.setData({
        myFallCourses: tempFall,
        myWinterCourses: tempWinter
      })
      let currTab = this.data.sectionType;
      if (currTab == 0) {
        this.setData({
          myCurrCourses: tempFall
        })
      } else {
        this.setData({
          myCurrCourses: tempWinter
        })
      }
    } else if (course.section == "F") {
      tempFall.push(course);
      this.setData({
        myFallCourses: tempFall,
        myCurrCourses: tempFall
      })
    } else {
      tempWinter.push(course);
      this.setData({
        myWinterCourses: tempWinter,
        myCurrCourses: tempWinter
      })
    }
  },

  deleteCurr: function(e) {
    let idx = e.currentTarget.dataset.idx;
    console.log(idx)
    let tempCurr = this.data.myCurrCourses;
    let tempFall = this.data.myFallCourses;
    let tempWinter = this.data.myWinterCourses;
    let tempAll = this.data.myAllCourses;
    let course = this.data.myCurrCourses[idx];
    console.log(course)
    tempCurr.splice(idx, 1);
    if (course.section == "F" || course.section == "Y") {
      for (let i = 0; i < tempFall.length; i ++) {
        if (tempFall[i].name == course.name) {
          tempFall.splice(i, 1);
        }
      }
    }
    if (course.section == "S" || course.section == "Y") {
      for (let j = 0; j < tempWinter.length; j ++) {
        if (tempWinter[j].name == course.name) {
          tempWinter.splice(j, 1);
        }
      }
    }
    for (let k = 0; k < tempAll.length; k++) {
      if (tempAll[k].name == course.name) {
        tempAll.splice(k, 1);
      }
    }
    this.setData({
      myCurrCourses: tempCurr,
      myFallCourses: tempFall,
      myWinterCourses: tempWinter,
      myAllCourses: tempAll
    })
  },

  toSchedule: function() {
    if (this.data.myAllCourses.length == 0) {
      wx.showToast({
        title: 'Please Select Course',
        icon: 'none'
      })
      return;
    }
    let input = [];
    for (let i = 0; i < this.data.myAllCourses.length; i++) {
      input.push(this.data.myAllCourses[i].code)
    }
    console.log(input)
    let scheduler = require('../../utils/scheduler.js');
    let result = scheduler.main_func(input);
    console.log(result);
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log('设置选中项 1')
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})