// miniprogram/pages/schedule/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    tab: -1,    // -1: year, 0: fall, 1: winter
    showSelection: false,
    inputVal: '',
    statusHeight: 0,
    sectionType: 0,    // 0: fall, 1: winter
    courses: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let that = this
    wx.getSystemInfo({
      success (res) {
        let top = wx.getMenuButtonBoundingClientRect().top;
        that.setData({
          statusHeight: res.statusBarHeight + top + 6
        })
        console.log(that.data.statusHeight)
      }
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

  chooseYear: function() {
    this.setData({
      tab: -1,
      showSelection: false,
      section: ''
    })
  },

  onChangeFall: function() {
    this.setData({
      sectionType: 0
    })
  },

  onChangeWinter: function() {
    this.setData({
      sectionType: 1
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