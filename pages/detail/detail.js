// detail.js
var Util = require('../../utils/util.js');
var Api = require('../../utils/api.js');

Page({
  data: {
    title: '岗位详情',
    detail: {},
    replies: [],
    hidden: false
  },
  fetchDetail: function(id) {
    var that = this;
    wx.request({
      url: Api.getPostDetail({
        id: id
      }),
      success: function(res) {
        //res.data[0].created = Util.formatTime(Util.transLocalTime(res.data[0].created));
        console.log(res);
        that.setData({
          detail: res.data
        })
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
    //that.fetchReplies(id);
  },
  // fetchReplies: function(id) {
  //   var that = this;
  //   wx.request({
  //     url: Api.getReplies({
  //       topic_id: id
  //     }),
  //     success: function(res) {
  //       res.data.forEach(function(item) {
  //         item.created = Util.formatTime(Util.transLocalTime(item.created));
  //       })
  //       that.setData({
  //         replies: res.data
  //       })
  //       setTimeout(function() {
  //         that.setData({
  //           hidden: true
  //         })
  //       }, 300)
  //     }
  //   })
  // },
  onLoad: function (options) {
    this.setData({
      hidden: false
    })
    this.fetchDetail(options.id);
  }
})
