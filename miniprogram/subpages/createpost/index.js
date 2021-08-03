// miniprogram/subpages/createpost/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    inputVal: "",
    tagsAdded: [],
    allTags: [
      {
        name: "Find Study Group",
        isActive: false
      }, {
        name: "Questions",
        isActive: false
      }, {
        name: "Experience",
        isActive: false
      }
    ],
    showSuccess: false,
    statusHeight: 0
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

  addTag: function(event) {
    let idx = event.currentTarget.dataset.idx;
    if (!this.data.allTags[idx].isActive) {
      let name = event.currentTarget.dataset.name;
      let allCopy = this.data.allTags;
      let myCopy = this.data.tagsAdded;
      let newItem = {};
      newItem.name = name;
      newItem.idx = idx;
      myCopy.push(newItem);
      allCopy[idx].isActive = true
      this.setData({
        allTags: allCopy,
        tagsAdded: myCopy
      })
    }
  },

  deleteTag: function(event) {
    let idx = event.currentTarget.dataset.idx;
    let index = event.currentTarget.dataset.index;
    let allCopy = this.data.allTags;
    let myCopy = this.data.tagsAdded;
    allCopy[idx].isActive = false;
    myCopy.splice(index, 1);
    this.setData({
      allTags: allCopy,
      tagsAdded: myCopy
    })
  },

  onCancel: function() {
    wx.navigateBack({
      delta: 0,
    })
  },

  onPost: function() {
    this.setData({
      showSuccess: true
    })
    let that = this;
    setTimeout(() => {
      that.setData({
        showSuccess: false
      })
      wx.navigateBack({
        delta: 0,
      })
    }, 2000);
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