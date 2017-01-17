// detail.js
var Util = require('../../utils/util.js');
var Api = require('../../utils/api.js');

Page({
  data: {
    title: '岗位详情',
    detail: {},
    replies: [],
    btn_name:'立即投递',
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
        //res.data[0].created = Util.formatTime(Util.transLocalTime(res.data[0].created));
        console.log(res);
        var btn_disabled = false;
        var btn = '立即投递';
        if ( res.data.data.is_delivered ){
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
    //that.fetchReplies(id);
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
        post_id: that.data.detail.data.id,
        resume_id:that.data.detail.data.resume_id,
        device:99
      }),
      complete: function( res ) { 
          console.log(res);
        if( res == null || res.data.error_code!="success" ) { 
          wx.showToast({
            title:'投递失败',
            icon:'loading',
            duration:2000
          }); 
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
  btn_primary:function(){
    var that = this;

    this.setData({
      text:'您单击了primary按钮'
    })
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
