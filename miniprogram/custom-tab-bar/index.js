const app = getApp();
Component({
  data: {
    selected: 0,
    color: "#B1B3BA",
    selectedColor: "#6493DF",
    list: [{
      pagePath: "/pages/home/index",
      iconPath: "../images/home_grey.png",
      selectedIconPath: "../images/home_blue.png",
      text: "Home",
      isSpecial: false
    }, {
      pagePath: "/pages/schedule/index",
      iconPath: "../images/schedule_grey.png",
      selectedIconPath: "../images/schedule_blue.png",
      text: "Schedule",
      isSpecial: false
    }, {
      pagePath: "/pages/viewschedule/index",
      iconPath: "../images/app_logo.png",
      selectedIconPath: "../images/app_logo.png",
      text: "",
      isSpecial: true
    }, {
      pagePath: "/pages/group/index",
      iconPath: "../images/group_grey.png",
      selectedIconPath: "../images/group_blue.png",
      text: "Group",
      isSpecial: false
    }, {
      pagePath: "/pages/mine/index",
      iconPath: "../images/mine_grey.png",
      selectedIconPath: "../images/mine_blue.png",
      text: "Mine",
      isSpecial: false
    }],
    //适配IphoneX的屏幕底部横线
    isIphoneX: app.globalData.isIphoneX
  },
  attached() {},
  methods: {
    switchTab(e) {
      const dataset = e.currentTarget.dataset
      const path = dataset.path
      const index = dataset.index
      console.log("path", path);
      //如果是特殊跳转界面
      if (this.data.list[index].isSpecial) {
        console.log("special")
        wx.navigateTo({
          url: path
        })
      } else {
        //正常的tabbar切换界面
        console.log("normal")
        wx.switchTab({
          url: path
        })
        this.setData({
          selected: index
        })
      }
    }
  }
})