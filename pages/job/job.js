// latest.js
var Api = require('../../utils/api.js');

Page({
  data: {
    title: '最新岗位',
    job: [],
    p:[],
    msg:'加载中',
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
  fetchData: function(p) {
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
          job: res.data.data ,
          p:res.data.page

        })
        setTimeout(function() {
          that.setData({
            msg:'加载中',
            hidden: true
          })
        }, 300)
      }
    })
  },
  //加载更多
  loadMore: function(p) {
    var that = this;
    that.setData({
      hidden: false
    })
    wx.request({
      url: Api.getPostList({
        p: p?p:1
      }),
      success: function(res) {
        //console.log(res);
        console.log(that.data);
        that.setData({
          job: that.data.job.concat(res.data.data),
          p:res.data.page
        })
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
},
 onReachBottom: function() {//下拉加载更多
  var p = this.data.p.page;
  var count = this.data.p.end_page;
  count = 3;
  if (p > count){
      that.setData({
        hidden: false
      });
      setTimeout(function() {
        that.setData({
          msg:'后面没有了',
          hidden: true
        })
      }, 300)
      return false;
  }
    this.loadMore(p+1);
     console.log(p+'--'+count);

 },
  onLoad: function () {
    this.fetchData();
  }
})