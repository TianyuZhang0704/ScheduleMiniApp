// miniprogram/pages/viewschedule/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    avatarUrl: '',
    tab: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let ui = wx.getStorageSync('userInfo');
    this.setData({
      avatarUrl: ui.avatarUrl
    })
  },

  switchTab: function() {
    this.setData({
      tab: this.data.tab == 0 ? 1 : 0
    })
  },

  onBack: function() {
    wx.navigateBack({
      delta: 0,
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