const scheduler = require('../../utils/scheduler');

// miniprogram/pages/testPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var calculateSchedule = require('../../utils/calculateSchedule');
    // calculateSchedule.main_func();
    // var loadDataBase = require('../../utils/loadDatabase.js');
    // loadDataBase.loadDataBase(["CSC108H1-S-20219", "MAT137Y1-Y-20219", "PHY100H1-F-20219"]);
    var scheduler = require('../../utils/scheduler.js')
    scheduler.main_func(["CSC108H1-S-20219", "MAT137Y1-Y-20219", "PHY100H1-F-20219"]);
    // var addCSC108Reply = require('../../utils/addCSC108reply');
    // addCSC108Reply.addCSC108Reply();
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})