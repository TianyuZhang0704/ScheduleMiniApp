// miniprogram/subpages/postpage/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    title: "",
    tags: [],
    isTop: false,
    authorName: "",
    avatarUrl: "",
    courseCode: "",
    postTime: "",
    commentNum: 0,
    commentId: [],
    comments: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      myId: wx.getStorageInfoSync("userInfo").openid,
      postId: options.postId
    })
    let that = this;
    wx.cloud.callFunction({
      name: 'getCommentByPostId',
      data: {
        postId: that.data.postId
      },
      success: res => {
        console.log("getCommentByPostId 调用成功", res);
        this.setData({
          authorName: res.result.data.authorName,
          avatarUrl: res.result.data.avatarUrl,
          commentId: res.result.data.commentId,
          commentNum: res.result.data.commentNum,
          comments: res.result.data.commentObjs,
          content: res.result.data.content,
          code: res.result.data.courseCode,
          isTop: res.result.data.isTop,
          postTime: res.result.data.postTime,
          tags: res.result.data.tags,
          title: res.result.data.title,
          openid: res.result.data._openid
        })
      },
      fail: res => {
        console.log("getCommentByPostId 调用失败", res);
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