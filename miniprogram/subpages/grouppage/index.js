// miniprogram/subpages/grouppage/index.js
import { getPostListByGroupId } from '../../utils/getPostListByGroupId.js';

Page({

  /**
   * Page initial data
   */
  data: {
    code: "",
    postNum: 0,
    tabs: [
      {
        text: "All Posts"
      }, {
        text: "Official"
      }, {
        text: "Find Study Group"
      }, {
        text: "Question"
      }, {
        text: "Experience"
      }
    ],
    currTab: 0,
    navScrollLeft: 0,
    posts: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      code: options.code,
      postNum: options.postNum
    })
    let that = this;
    let curr = that.data.currTab;
    wx.showLoading({
      title: 'Loading...',
    })
    getPostListByGroupId(that.data.code, curr == 0 ? '' : that.data.tabs[curr].text).then(res => {
      that.setData({
        posts: res.result.data
      })
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoadinng();
      wx.showToast({
        title: err.message,
        icon: "none"
      })
    })
    // wx.cloud.callFunction({
    //   name: 'getPostListByGroupId',
    //   data: {
    //     code: that.data.code,
    //     tag: curr == 0 ? '' : that.data.tabs[curr].text
    //   },
    //   success: res => {
    //     console.log("getPostListByGroup 调用成功", res);
    //     that.setData({
    //       posts: res.result.data
    //     })
    //   },
    //   fail: res => {
    //     console.log("getPostListByGroup 调用失败", res);
    //   }
    // })
  },

  toNewPost: function() {
    wx.navigateTo({
      url: '/subpages/createpost/index',
    })
  },

  switchTab: function(event) {
    console.log("switch tab")
    let curr = event.currentTarget.dataset.current;
    console.log(curr)
    if (curr >= 3) {
      this.setData({
        navScrollLeft: 350
      })
    } else if (curr == 2) {
      this.setData({
        navScrollLeft: 50
      })
    } else {
      this.setData({
        navScrollLeft: 0
      })
    }
    // this.setData({
    //   navScrollLeft: curr * 100
    // })
    if (this.data.currTab == curr) {
      return false;
    } else {
      this.setData({
        currTab: curr
      })
    }
    let that = this;
    let currTab = that.data.currTab;
    wx.showLoading({
      title: 'Loading...',
    })
    getPostListByGroupId(that.data.code, curr == 0 ? '' : that.data.tabs[currTab].text).then(res => {
      that.setData({
        posts: res.result.data
      })
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoadinng();
      wx.showToast({
        title: err.message,
        icon: "none"
      })
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