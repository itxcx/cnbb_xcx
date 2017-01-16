// latest.js
var Api = require('../../utils/api.js');

Page({
  data: {
    title: '最新岗位',
    job: [],
    hidden: false
  },
  onPullDownRefresh: function () {
    this.fetchData();
    console.log('onPullDownRefresh', new Date())
  },
  // 事件处理函数
  redictDetail: function(e) {
    var id = e.currentTarget.id,
    //alert(id);
      url = '../detail/detail?id=' + id;
      
    wx.navigateTo({
      url: url
    })
  },
  fetchData: function() {
    var that = this;
    that.setData({
      hidden: false
    })
    wx.request({
      url: Api.getPostList({
        p: 1
      }),
      success: function(res) {
        console.log(res);
        that.setData({
          job: res.data
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