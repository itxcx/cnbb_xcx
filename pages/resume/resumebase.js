var Api = require('../../utils/api.js');
var Util = require('../../utils/util.js');
Page({
    data:{
        resumebase:{},
        hukou:"",
        gender:0,
        genderarray:new Array("","男","女"),
        genderarray2:new Array("男","女"),
        birthday:"",
        hkarray:new Array("城镇户口","农村户口","集体户口")
    },
    //获取简历基本信息
  fetchData: function(uid,resumeid) {
    var that = this;
    that.setData({
      hidden: false
    })
    wx.request({
      url: Api.getResumeBase(uid,resumeid),
      success: function(res) {
        that.setData({
          resumebase: res.data,
          gender:res.data.gender,
           hukou:res.data.hk_type,
          birthday:Util.formatDate2(res.data.birthday),
        }),
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
  },
  //选择性别性别
  changeGender:function(e){
        var that = this;
      const val=e.detail.value
       console.log(val)
      that.setData({gender:parseInt(val)+1})
       console.log(that.data.gender)
  },
  changeBirthday:function(e){
     var that = this;
      const val=e.detail.value
       console.log(val)
      that.setData({birthday:val})
  },
  changeHktype:function(e){
     var that = this;
      const val=e.detail.value
       console.log(val)
      that.setData({hukou:val})
  },
     onLoad: function (options) {
    console.log('base onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
   var uid=options.uid;
   var resumeid=options.resumeid;
    this.fetchData(uid,resumeid);
  },
})