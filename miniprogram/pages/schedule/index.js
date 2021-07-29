// miniprogram/pages/schedule/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    tab: -1,
    showSelection: false,
    inputVal: '',
    courses: [
      {
        name: "CSC104H1-S-20209",
        code: "CSC104H1",
        courseTitle: "Computational Thinking",
        section: "S"
      }, {
        name: "CSC108H1-S-20209",
        code: "CSC108H1",
        courseTitle: "Introduction to Computer Programming",
        section: "S"
      }, {
        name: "CSC111H1-S-20209",
        code: "CSC111H1",
        courseTitle: "Foundations of Computer Science II",
        section: ""
      }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    
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
      url: 'https://timetable.iit.artsci.utoronto.ca/api/20209/courses',
      data: { 
        code: that.data.inputVal,
        section: that.data.section ? that.data.section : '',
      // code: "CSC108" 大小写都可以 
      // title: "Introduction to Computer Programming" 
      },
      header: { 'content-type': 'application/json' // 默认值 
      }, 
      success (res) { 
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