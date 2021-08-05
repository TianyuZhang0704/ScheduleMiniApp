// miniprogram/subpages/coursePlan/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    schedule: [
      {
        meetingName: "LEC-0101",
        offerings: {
          "MO": [9, 10],
          "TH": [9, 10],
          "TU": [9, 10]
        },
        courseCode: "MAT137Y1",
        section: 'Y'
      }, {
        meetingName: "LEC-0101",
        offerings: {
          "MO": [9, 10],
          "TH": [9, 10],
          "TU": [9, 10]
        },
        courseCode: "MAT137Y1",
        section: 'Y'
      }, {
        meetingName: "LEC-0101",
        offerings: {
          "MO": [9, 10],
          "TH": [9, 10],
          "TU": [9, 10]
        },
        courseCode: "MAT137Y1",
        section: 'Y'
      }, {
        meetingName: "LEC-0101",
        offerings: {
          "MO": [9, 10],
          "TH": [9, 10],
          "TU": [9, 10]
        },
        courseCode: "MAT137Y1",
        section: 'Y'
      }
    ],
    conflict: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let plan = JSON.parse(options.plan);
    for (let i = 0; i < plan[0].length; i++) {
      let courseCode = plan[0][i].courseCode;
      let pos = courseCode.indexOf("-");
      plan[0][i].courseCode = courseCode.slice(0, pos);
      plan[0][i].section = courseCode.slice(pos + 1, pos + 2);
    }
    this.setData({
      schedule: plan[0],
      conflict: plan[1]
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