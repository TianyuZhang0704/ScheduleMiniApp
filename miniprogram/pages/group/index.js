// pages/group/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    statusHeight: 0,
    inputVal: '',
    searchVal: '',
    pageNum: 1,
    pageSize: 6,
    sectionType: 0,   // 0: All Courses, 1: Enrolled
    groupList: [],
    scrollFinished: false
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
    this.getGroupList(this.data.searchVal, this.data.pageNum, this.data.pageSize);
  },

  onClearInput: function() {
    console.log("clear")
    this.setData({
      inputVal: '',
      searchVal: '',
      groupList: [],
      pageNum: 1
    })
    this.getGroupList(this.data.searchVal, this.data.pageNum, this.data.pageSize);
  },

  onSearch: function() {
    this.setData({
      groupList: [],
      searchVal: this.data.inputVal,
      pageNum: 1
    })
    this.getGroupList(this.data.searchVal, this.data.pageNum, this.data.pageSize);
  },

  getGroupList: function(val, pageNum, pageSize) {
    wx.showLoading({
      title: 'Searching...',
    })
    let that = this;
    // call cloudfunction pagination
    wx.cloud.callFunction({
      name: 'pagination',
      data: {
        code: val,
        pageNum: pageNum, // 此处不能传入<= 0 的非整数
        pageSize: pageSize // 此处不能传入<= 0 的非整数
      },
      success: res => {
        console.log("pagination 调用成功", res)
        let result_lst = res.result.data;
        let lst = that.data.groupList;
        if (result_lst.length == 0) {
          that.setData({
            scrollFinished: true
          })
          wx.hideLoading();
          return;
        }
        for (let i = 0; i < result_lst.length; i++) {
          let group_item = {};
          group_item.code = result_lst[i]._id;
          group_item.courseName = result_lst[i].courseName;
          group_item.postNum = result_lst[i].postNum;
          lst.push(group_item);
        }
        that.setData({
          groupList: lst
        })
        wx.hideLoading();
      },
      fail: res => {
        console.log("pagination 调用失败", res)
        wx.hideLoading();
      }
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

  onScrollBottom: function() {
    console.log("reach bottom")
    if (!this.data.scrollFinished) {
      console.log("break")
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getGroupList(this.data.searchVal, this.data.pageNum, this.data.pageSize);
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