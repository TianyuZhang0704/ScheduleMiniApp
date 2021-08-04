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
    comments: [],
    replyMask: false,
    selectCommentId: '',
    selectComment: {},
    selectReplyList: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let info = wx.getStorageSync('userInfo');
    console.log("open id: ", info.openid)
    this.setData({
      myId: info.openid,
      postId: options.postId
    })
    let that = this;
    wx.showLoading({
      title: 'Loading...',
    })
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
        wx.hideLoading();
      },
      fail: res => {
        console.log("getCommentByPostId 调用失败", res);
        wx.hideLoading();
      }
    })
    // wx.cloud.callFunction({
    //   name: 'getReplyByCommentId',
    //   data: {
    //     commentId: "CSC108H1-comment-2"
    //   },
    //   success: res => {
    //     console.log("getReplyByCommentId 调用成功", res)
    //     that.setData({
    //       selectComment: res.result.commentObj,
    //       selectReplyList: res.result.replyObjects
    //     })
    //   },
    //   fail: res => {
    //     console.log("getReplyByCommentId 调用失败", res)
    //   }
    // })
  },

  onBack: function() {
    wx.navigateBack({
      delta: 0,
    })
  },

  clickReply: function(event) {
    let that = this;
    this.setData({
      selectCommentId: event.detail.id,
      replyMask: true
    })
    wx.cloud.callFunction({
      name: 'getReplyByCommentId',
      data: {
        commentId: that.data.selectCommentId
      },
      success: res => {
        console.log("getReplyByCommentId 调用成功", res)
        that.setData({
          selectComment: res.result.commentObj,
          selectReplyList: res.result.replyObjects
        })
      },
      fail: res => {
        console.log("getReplyByCommentId 调用失败", res)
      }
    })
  },

  closePop: function() {
    this.setData({
      selectCommentId: '',
      selectComment: {},
      selectReplyList: [],
      replyMask: false
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