var Api = require('../../utils/api.js');
var Util = require('../../utils/util.js');
Page({
  data: {
       detail: {},
    replies: [],
    formatDate:"",
    politics:"",
    description:"",
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
          detail: res.data,
          formatDate:Util.formatDate(res.data.info.birthday),
          politics:Util.transPolitics(res.data.info.politics),
          description:res.data.info.tags.join(";")
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