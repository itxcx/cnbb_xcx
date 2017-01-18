var Api = require('../../utils/api.js');
var Util = require('../../utils/util.js');
Page({
    data:{
        resumeedu:{},
        provinceNames:new Array(),
        provinceCodes:new Array(),
        provinceIndex:0,
        schoolNames:new Array(),
        schoolCodes:new Array(),
        schoolIndex:0,
        resume_id:0,
        edu_id:0,
        majorNames:new Array(),
        majorCodes:new Array(),
        majorIndex:0,
        sdate:"",
        edate:"",
        degreeNames:new Array("大专","本科","硕士","博士"),
        degreeCodes:new Array(1,2,3,4),
        degreeIndex:0
    },
    fetchProvince:function(){
      var that=this;
       that.setData({
      hidden: false
    })
       wx.request({
      url: Api.getSchoolAreas(),
      success: function(res) {
         var provinceCodes=new Array();
         var provinceNames=new Array();
         var i=0;
           for(i=0;i<res.data.length;i++ ){
              provinceCodes[i]=res.data[i].code
              provinceNames[i]=res.data[i].name
                console.log(that.data.resumeedu.province_code)
              if(that.data.resumeedu.province_code==provinceCodes[i])
              {
                 that.setData({provinceIndex:i});
              }
           }
         
        that.setData({
         provinceNames:provinceNames,
         provinceCodes:provinceCodes
        }),
       that.fetchSchool();
      
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
    },
   fetchSchool:function(){
      //学校
      var that=this;
       that.setData({
      hidden: false
    })
       
        wx.request({
      url: Api.getSchool(that.data.provinceCodes[that.data.provinceIndex]),
      success: function(res) {
         var schoolCodes=new Array();
         var schoolNames=new Array();
         var i=0;
           for(i=0;i<res.data.length;i++ ){
              schoolCodes[i]=res.data[i].id
              schoolNames[i]=res.data[i].name
              if(that.data.resumeedu.school_id==schoolCodes[i])
              {
                that.setData({schoolIndex:i});
              }
           }
          
        that.setData({
         schoolNames:schoolNames,
         schoolCodes:schoolCodes
        }),
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
   },
     fetchMajor:function(){
      //专业分类
      var that=this;
       that.setData({
      hidden: false
    });

        wx.request({
      url: Api.getMajorCategories(),
      success: function(res) {
             
         var majorCodes=new Array();
         var majorNames=new Array();
         var i=0;
           for(i=0;i<res.data.length;i++ ){
              majorCodes[i]=res.data[i].id
              majorNames[i]=res.data[i].name
              if(that.data.resumeedu.major_category_id==majorCodes[i])
              {
                that.setData({majorIndex:i});
              }
           }
         console.log(majorNames);
        that.setData({
         majorNames:majorNames,
         majorCodes:majorCodes
        }),
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
   },
   
    //获取简历教育经历
  fetchData: function(edu_id) {
    var that = this;
    that.setData({
      hidden: false
    })
    wx.request({
      url: Api.getEdu(edu_id),
      success: function(res) {
        that.setData({
          resumeedu: res.data,
           sdate:Util.formatShortDate(res.data.sdate),
           edate:Util.formatShortDate(res.data.edate),
           degreeIndex:res.data.degree-1
        }),
         that.fetchProvince();
         that.fetchMajor();
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
  },
  //选择专业分类
  changeMajorCategory:function(e){
        var that = this;
      const val=e.detail.value
      that.setData({majorIndex:val})
  },
  changeSdate:function(e){
     var that = this;
      const val=e.detail.value
      console.log(val);
      that.setData({sdate:val.substr(0,7)})
  },
  changeEdate:function(e){
     var that = this;
      const val=e.detail.value
      console.log(val);
      that.setData({edate:val.substr(0,7)})
  },
  changeDegree:function(e){
     var that = this;
      const val=e.detail.value
      that.setData({degreeIndex:val})
  },
  //选择省
  changeProvince:function(e){
      var that = this;
      const val=e.detail.value
      that.setData({provinceIndex:val,cityIndex:0})
       that.fetchSchool();
  },
   //选择市
  changeSchool:function(e){
      var that = this;
      const val=e.detail.value
      console.log(val);
      that.setData({schoolIndex:val})
  },
   
  //提交数据
  formBindsubmit:function(e){
   
     var that = this; 
     wx.request( {  
      url: Api.createEdu(that.data.edu_id),  
      header: {  
      //请求头和ajax写法一样
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
      method: "POST",   
      data: Util.json2Form( { 
      resume_id:that.data.resume_id,
      edu_id:that.data.edu_id,
      access_token:Api.getAccessToken(),grade:e.detail.value.sdate.substr(0,4),school_province_code:that.data.provinceCodes[that.data.provinceIndex],school_id:that.data.schoolCodes[that.data.schoolIndex],sdate:e.detail.value.sdate.replace(/-/g,""),edate:e.detail.value.edate.replace(/-/g,""),
degree:that.data.degreeCodes[that.data.degreeIndex],
faculty:e.detail.value.faculty,major_cid:that.data.majorCodes[that.data.majorIndex],major:e.detail.value.major }),  
      complete: function( res ) { 
          console.log(res);
        if( res == null || res.data.error_code!="success" ) { 
          wx.showToast({
            title:res.data.error_description,
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
          var pages = getCurrentPages();
        if(pages.length > 1){
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            //关键在这里
            prePage.fetchData()
        }
          wx.navigateBack();
        }

         setTimeout(function(){
             wx.hideToast()
         },2000)
      }  
    })  
  },
     onLoad: function (options) {
    console.log('edu onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
   var edu_id=options.edu_id;
   var resume_id=options.resume_id;
    that.fetchData(edu_id);
    that.setData({edu_id:edu_id,resume_id:resume_id});
  },
  refresh:function(){
    var that=this;
 that.fetchData(that.data.edu_id);
  },
  onPullDownRefresh:function(e){
  var that=this;
 that.fetchData(that.data.edu_id);
  }
})