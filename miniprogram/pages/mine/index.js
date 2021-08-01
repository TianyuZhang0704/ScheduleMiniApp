// miniprogram/pages/mine/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    avatarUrl: '',
    nickName: ''
  },

  // input : ["CSC108H1-S-20219",... ]
  // output: [
  // [[
  //   {code: "",
  //    courseTitle: "",
  //    prerequisite: "",
  //    lecture: {}, //LEC-0101: {schedule: {…}, instructors: {…}, meetingId: "153789", teachingMethod: "LEC", sectionNumber: "0101", …}
  //    // tut: {}
  //   }, 
  //   {code: "",
  //   courseTitle: "",
  //   prerequisite: "",
  //   lecture: {}, //LEC-0101: {schedule: {…}, instructors: {…}, meetingId: "153789", teachingMethod: "LEC", sectionNumber: "0101", …}
  //   // tut: {}
  //  }]],
  // [],
  // [],
  // [],
  // []
  // ]
 
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let userinfo = wx.getStorageSync('userInfo');
    console.log("uesrinfo: ", userinfo);
    this.setData({
      avatarUrl: userinfo.avatarUrl,
      nickName: userinfo.nickName
    })
    console.log(this.data.avatarUrl);
    // 引用utils helper
    //  var utils=require('./utils/generatePosts.js');
    // utils.generateCSC108Posts();
    // utils.generateMAT137Posts();
   

    // call cloudfunction pagination
    // wx.cloud.callFunction({
    //   name: 'pagination',
    //   data: {
    //     code: "",
    //     pageNum: 1, // 此处不能传入<= 0 的非整数
    //     pageSize: 20 // 此处不能传入<= 0 的非整数
    //   },
    //   success: res => {
    //     console.log("pagination 调用成功", res)
    //   },
    //   fail: res => {
    //     console.log("pagination 调用失败", res)
    //   }
    // })


  },

  goToViewSchedule: function() {
    wx.navigateTo({
      url: '../viewschedule/index',
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
      console.log('设置选中项 4')
      this.getTabBar().setData({
        selected: 4
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