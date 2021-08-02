// miniprogram/subpages/grouppage/index.js
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
        text: "Questions"
      }, {
        text: "Experience"
      }
    ],
    currTab: 0,
    navScrollLeft: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      code: options.code,
      postNum: options.postNum
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