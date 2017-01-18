// detail.js
var Util = require('../../utils/util.js');
var Api = require('../../utils/api.js');

Page({
  data: {
    title: '岗位详情',
    detail: {},
    replies: [],
    resume_id: true,
    btn_name:'投递简历',
    loading:false,
    hidden: false
  },
  fetchDetail: function(id) {
    var that = this;
    wx.request({
      url: Api.getPostDetail({
        id: id,
        access_token:Api.getAccessToken(),
      }),
      success: function(res) {
        res.data.last_time = Util.getDateDiff(Util.getDateTimeStamp(res.data.last_time));
        res.data.salary = Util.salary2Str(res.data.ssalary,res.data.esalary,res.data.salary_unit);
        res.data.degree = Util.transDegree(res.data.degree);//学历
        res.data.work_type = Util.transWorkType(res.data.work_type);//工作类型
        console.log(res);
        var btn_disabled = false;
        var btn = '投递简历';
        if ( res.data.is_delivered ){
          btn = '已投递';
          btn_disabled = true;
        }
        that.setData({
          btn_name:btn,
          disabled:btn_disabled,
          detail: res.data
        })
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
  })
    that.fetchDefaultResumeDetail();
  },

  fetchDefaultResumeDetail:function(){//设置resume_id
    var that = this;
    // var resume_id = '';
    var resume_id = wx.getStorageSync('resume_id');
    // try {
    //   wx.removeStorageSync('resume_id');
    // } catch (e) {
    //   // Do something when catch error
    // }
    try {
      
      console.log(resume_id);
      if (resume_id) {
          //缓存里的resume_id
          that.setData({
            resume_id: resume_id
          })
      }else{
          wx.request({
            url: Api.getUserDefaultResumeDetail(),
            success: function(res) {
              console.log(res);
              // 设置数据缓存resume_id
              wx.setStorage({
                key:"resume_id",
                data:res.data.id
              });
              that.setData({
                resume_id: res.data.id
              })
            }
          })
      }
    } catch (e) {
    }
    //wx.removeStorageSync('resumeDetail');
  },
  sub_deliver:function(){
     var that = this; 
     console.log(that);
     wx.request( {  
      url: Api.deliver(), 
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
      method: "POST",   
      data:Util.json2Form(
        {
        access_token:Api.getAccessToken(),
        post_id: that.data.detail.id,
        resume_id:that.data.resume_id,
        device:99
      }),
      complete: function( res ) { 
          console.log(res);
        if( res == null || res.data.error_code!="success" ) { 
          wx.showModal({
           title: '提示',
           content: res.data.error_description,
           success: function(e) {
            if (e.confirm) {
              var url = '../resume/resume';
                wx.navigateTo({
                  url: url
                })
            }
           }
          })
          console.error( res.data );  
          return;  
        }  
        else
        {
          that.setData({
            btn_name:'已投递',
            disabled:true
          });
          
          wx.showToast({
            title:'投递成功',
            icon:'success',
            duration:2000
         });
        }

         setTimeout(function(){
             wx.hideToast()
         },2000)
      }  
    })
  }, 
  onLoad: function (options) {
    this.setData({
      hidden: false
    })
    this.fetchDetail(options.id);
  }
})
