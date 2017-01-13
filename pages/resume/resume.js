var Api = require('../../utils/api.js');
var Util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
       detail: {},
    replies: [],
    formatDate:"",
    politics:"",
    description:"",
    degree:"",
    startdate:"",
    enddate:"",
    source:"",
    source1:"",
    hidden: false,
      userInfo: {}
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
          source:res.data.info.avatar_url==''?that.data.source1:res.data.info.avatar_url,
          formatDate:Util.formatDate(res.data.info.birthday),
          politics:Util.transPolitics(res.data.info.politics),
          description:res.data.info.tags.join(";"),
           degree:res.data.edus.length>0?Util.transDegree(res.data.edus[0].degree):"",
           startdate:res.data.edus.length>0?Util.formatShortDate(res.data.edus[0].sdate):"",
           enddate:res.data.edus.length>0?Util.formatShortDate(res.data.edus[0].edate):"",
         
        }),
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据，页面自动渲染
      that.setData({
        userInfo:userInfo,
        source1:userInfo.avatarUrl
      })
       console.log(userInfo.avatarUrl)
    })
    this.fetchData();
  },
  //上传图片
  uploadImage:function(e){
     var that = this
   wx.chooseImage({
  success: function(res) {
    var tempFilePaths = res.tempFilePaths
    wx.uploadFile({
      url: Api.uploadFile(), 
      //仅为示例，非真实的接口地址
      filePath: tempFilePaths[0],
      name: 'file',
      formData:{
        
      },
      success: function(res){
        var file = res.data
        //do something
        console.log(file)
         that.setData({
        source:JSON.parse(file).path
      })
      }
    })
  }
})
  }
})