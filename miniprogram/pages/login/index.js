// miniprogram/pages/login/index.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    openid: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const ui = wx.getAccountInfoSync("userInfo");
    this.setData({
      openid: ui.openid,
      openid: ui.openid
    })
    console.log(this.data.openid);
  },

  onGoUserInfo: function (e) {
    this.setData({
      userInfo: e.detail.userInfo
    })
    console.log("userinfo: ", this.data.userInfo);
    let that = this;
    if (!this.data.logged) {
      wx.cloud.callFunction({
        name: 'login',
        success: res => {
          console.log('[Cloud function] [login] user openid: ', res.result.openid);
          that.setData({
            logged: true,
            openid: res.result.openid,
            userInfo: e.detail.userInfo
          })
          that.data.userInfo.openid = that.data.openid;
          wx.setStorageSync('userInfo', that.data.userInfo);
          wx.getStorageSync('isLoggedIn', true);
          wx.navigateBack({
            delta: 1
          })
        },
        fail: err => {
          console.log('[Cloud function] [login] Call failed', err);
        }
      })
    }
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