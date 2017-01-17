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
        hkarray:new Array("城镇户口","农村户口","集体户口"),
        provinceNames:new Array(),
        provinceCodes:new Array(),
        cityNames:new Array(),
        cityCodes:new Array(),
        provinceIndex:0,
        cityIndex:0,
        hkprovinceIndex:0,
        hkcityIndex:0,
         hkcityNames:new Array(),
        hkcityCodes:new Array(),
        uid:0,
        resumeid:0
    },
    fetchProvince:function(){
      var that=this;
       that.setData({
      hidden: false
    })
       wx.request({
      url: Api.getProvinces(),
      success: function(res) {
         var provinceCodes=new Array();
         var provinceNames=new Array();
         var i=0;
           for(i=0;i<res.data.length;i++ ){
              provinceCodes[i]=res.data[i].code
              provinceNames[i]=res.data[i].name
              if(that.data.resumebase.province_code==provinceCodes[i])
              {
                 that.setData({provinceIndex:i});
              }
           }
         
        that.setData({
         provinceNames:provinceNames,
         provinceCodes:provinceCodes
        }),
       that.fetchCity();
       //户口省
       that.fetchhkProvince();
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
    },
   fetchCity:function(){
      //城市
      var that=this;
       that.setData({
      hidden: false
    })
        console.log(that.data.provinceCodes[that.data.provinceIndex])
        wx.request({
      url: Api.getResideAreas(that.data.provinceCodes[that.data.provinceIndex]),
      success: function(res) {
         var cityCodes=new Array();
         var cityNames=new Array();
         var i=0;
           for(i=0;i<res.data.length;i++ ){
              cityCodes[i]=res.data[i].code
              cityNames[i]=res.data[i].name
              if(that.data.resumebase.city_code==cityCodes[i])
              {
                that.setData({cityIndex:i});
              }
           }
          
        that.setData({
         cityNames:cityNames,
         cityCodes:cityCodes
        }),
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
   },
   //户口省
    fetchhkProvince:function(){
      var that=this;
         var i=0;
           for(i=0;i<that.data.provinceCodes.length;i++ ){
              if(that.data.resumebase.hk_province_code==that.data.provinceCodes[i])
              {
                 that.setData({hkprovinceIndex:i});
              }
           }
       that.fetchhkCity();
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
    },
    //户口市
   fetchhkCity:function(){
      //城市
      var that=this;
       that.setData({
      hidden: false
    })
        console.log(that.data.provinceCodes[that.data.hkprovinceIndex])
        wx.request({
      url: Api.getResideAreas(that.data.provinceCodes[that.data.hkprovinceIndex]),
      success: function(res) {
         var hkcityCodes=new Array();
         var hkcityNames=new Array();
         var i=0;
           for(i=0;i<res.data.length;i++ ){
              hkcityCodes[i]=res.data[i].code
              hkcityNames[i]=res.data[i].name
              if(that.data.resumebase.hk_city_code==hkcityCodes[i])
              {
                that.setData({hkcityIndex:i});
              }
           }
          
        that.setData({
         hkcityNames:hkcityNames,
         hkcityCodes:hkcityCodes
        }),
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
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
          birthday:Util.formatDate2(res.data.birthday)
        }),
         that.fetchProvince();
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
      that.setData({gender:parseInt(val)+1})
  },
  changeBirthday:function(e){
     var that = this;
      const val=e.detail.value
      console.log(val);
      that.setData({birthday:val})
  },
  changeHktype:function(e){
     var that = this;
      const val=e.detail.value
      that.setData({hukou:val})
  },
  //选择省
  changeProvince:function(e){
      var that = this;
      const val=e.detail.value
      that.setData({provinceIndex:val,cityIndex:0})
       that.fetchCity();
  },
   //选择市
  changeCity:function(e){
      var that = this;
      const val=e.detail.value
      that.setData({cityIndex:val})
  },
   //选择户口省
  changehkProvince:function(e){
      var that = this;
      const val=e.detail.value
      that.setData({hkprovinceIndex:val,hkcityIndex:0})
       that.fetchhkCity();
  },
   //选择户口市
  changehkCity:function(e){
      var that = this;
      const val=e.detail.value
      that.setData({hkcityIndex:val})
  },
  //提交数据
  formBindsubmit:function(e){
   
     var that = this; 
     wx.request( {  
      url: Api.createResumeBase(),  
      header: {  
      //请求头和ajax写法一样
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
      method: "POST",   
      data: Util.json2Form( { resume_id:that.data.resume_id,avatar_id:that.data.resumebase.avatar_id,full_name:e.detail.value.fullname,gender:that.data.gender,mobile:e.detail.value.mobile,email:e.detail.value.email,birthday:e.detail.value.birthday.replace(/-/g,""),
      province_id:that.data.provinceCodes[that.data.provinceIndex],
      city_id:that.data.cityCodes[that.data.cityIndex],hk_type:that.data.hukou,hk_province_id:that.data.provinceCodes[that.data.hkprovinceIndex],hk_city_id:that.data.hkcityCodes[that.data.hkcityIndex],card_type:0,card_no:e.detail.value.card_no,
      address:e.detail.value.address,access_token:Api.getAccessToken() }),  
      complete: function( res ) { 
          console.log(res);
        if( res == null || res.data.error_code!="success" ) { 
          wx.showToast({
            title:'更新失败',
            icon:'loading',
            duration:2000
          }); 
          console.error( res.data );  
          return;  
        }  
        else
        {
          /*wx.showToast({
            title:'成功',
            icon:'success',
            duration:2000
         });*/
         wx.navigateBack();
        }

         setTimeout(function(){
             wx.hideToast()
         },2000)
      }  
    })  
  },
     onLoad: function (options) {
    console.log('base onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
   var uid=options.uid;
   var resumeid=options.resumeid;
    that.fetchData(uid,resumeid);
    that.setData({uid:uid,resumeid:resumeid});
  },
  refresh:function(){
    var that=this;
 that.fetchData(that.data.uid,that.data.resumeid);
  },
  onPullDownRefresh:function(e){
  var that=this;
 that.fetchData(that.data.uid,that.data.resumeid);
  }
})