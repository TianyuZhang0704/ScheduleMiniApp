// pages/group/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    statusHeight: 0,
    inputVal: '',
    sectionType: 0   // 0: All Courses, 1: Enrolled
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

  onClearInput: function() {
    console.log("clear")
    this.setData({
      inputVal: '',
      courses: []
    })
  },

  onChangeAll: function() {
    this.setData({
      sectionType: 0
    })
  },

  onChangeMy: function() {
    this.setData({
      sectionType: 1
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
      console.log('设置选中项 3')
      this.getTabBar().setData({
        selected: 3
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