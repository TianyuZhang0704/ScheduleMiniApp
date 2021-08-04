// miniprogram/pages/home/index.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    swiperList: [
      {
        path: '/images/ejpday.jpeg'
      }, {
        path: '/images/lecture.jpeg'
      }, {
        path: '/images/campus.jpeg'
      }, {
        path: '/images/ejp.jpeg'
      }, {
        path: '/images/snow.jpeg'
      }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 500,
    statusHeight: 0,
    inputVal: '',
    searchVal: '',
    modules: [
      {
        id: 'mod1',
        name: 'Calender',
        icon: '../../images/My_Calendar.png'
      }, {
        id: 'mod2',
        name: 'Map',
        icon: '../../images/Map.png'
      }, {
        id: 'mod3',
        name: 'Courses',
        icon: '../../images/Edit_Message.png'
      }, {
        id: 'mod4',
        name: 'Posts',
        icon: '../../images/My_Posts.png'
      }, {
        id: 'mod5',
        name: 'Meesage',
        icon: '../../images/Messages.png'
      }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    if (!app.globalData.isLoggedIn) {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
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
      console.log('设置选中项 0')
      this.getTabBar().setData({
        selected: 0
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