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
    hukou:"",
    hidden: false,
      userInfo: {},
      edu_id:0,
      address:"",
      hukouAddress:""
  },
 //获取简历基本信息
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
          source:res.data==undefined&&res.data.info.avatar_url==''?that.data.source1:res.data.info.avatar_url,
          formatDate:Util.formatDate(res.data.info.birthday),
          politics:Util.transPolitics(res.data.info.politics),
          
           degree:res.data.edus.length>0?Util.transDegree(res.data.edus[0].degree):"",
           startdate:res.data.edus.length>0?Util.formatShortDate(res.data.edus[0].sdate):"",
           enddate:res.data.edus.length>0?Util.formatShortDate(res.data.edus[0].edate):"",
           hukou:Util.transHukou(res.data.info.hk_type),
           edu_id:res.data.edus.length>0?res.data.edus[0].id:0,
           address:res.data.info.province_name==null?"":res.data.info.province_name+res.data.info.city_name+res.data.info.address,
           hukouAddress:res.data.info.hk_province_name==null?"":res.data.info.hk_province_name+res.data.info.hk_city_name
         
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
        source1:userInfo==undefined?"":userInfo.avatarUrl
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
      })//设置头像地址结束
      //更新数据库中的头像
      wx.request({
      url: Api.updateAvatar(),
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
        method: "POST",  
        data: Util.json2Form( { avatar_id: JSON.parse(file).file_id,access_token:Api.getAccessToken()}),  
      success: function(res) {
        that.setData({
        }),
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
    //更新数据库中的头像结束
      }
    })
  }
})
  }
})