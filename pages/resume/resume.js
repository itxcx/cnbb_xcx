var Api = require('../../utils/api.js');

Page({
  data: {
       detail: {},
    replies: [],
    hidden: false
  },
 
  fetchData: function() {
    var that = this;
    that.setData({
      hidden: false
    })
    wx.request({
      url: Api.getUserDefaultResumeDetail(),
      success: function(res) {
        that.setData({
          detail: res
        })
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
  },
  onLoad: function () {
    this.fetchData();
  }
})