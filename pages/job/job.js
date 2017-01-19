// latest.js
var Api = require('../../utils/api.js');
var Util = require('../../utils/util.js');

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
        page: 1
      }),
      success: function(res) {
        console.log(res);
        for (var i = 0; i < res.data.posts.length ; i++) {
          //console.log(Util.getDateTimeStamp(res.data.posts[i].last_time));
          res.data.posts[i].last_time = Util.getDateDiff(Util.getDateTimeStamp(res.data.posts[i].last_time));
          res.data.posts[i].salary = Util.salary2Str(res.data.posts[i].ssalary,res.data.posts[i].esalary,res.data.posts[i].salary_unit);
          res.data.posts[i].degree = Util.transDegree(res.data.posts[i].degree);//学历
          res.data.posts[i].field = res.data.posts[i].degree;
          if(res.data.posts[i].work_days > 0){
            res.data.posts[i].field += '|'+res.data.posts[i].work_days+'天/周';
          }
          if(res.data.posts[i].work_duration > 0){
            res.data.posts[i].field += '|至少'+res.data.posts[i].work_duration/30+'个月';
          }
        }
        //res.data.data.last_time
        that.setData({
          job: res.data.posts,
          page:res.data.current_page,
          end_page:res.data.pages

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
        page: p?p:1
      }),
      success: function(res) {
        for (var i = 0; i < res.data.posts.length ; i++) {
          //console.log(Util.getDateTimeStamp(res.data.posts[i].last_time));
          res.data.posts[i].last_time = Util.getDateDiff(Util.getDateTimeStamp(res.data.posts[i].last_time));
          res.data.posts[i].salary = Util.salary2Str(res.data.posts[i].ssalary,res.data.posts[i].esalary,res.data.posts[i].salary_unit);
          res.data.posts[i].degree = Util.transDegree(res.data.posts[i].degree);//学历
          res.data.posts[i].field = res.data.posts[i].degree;
          if(res.data.posts[i].work_days > 0){
            res.data.posts[i].field += '|'+res.data.posts[i].work_days+'天/周';
          }
          if(res.data.posts[i].work_duration > 0){
            res.data.posts[i].field += '|至少'+res.data.posts[i].work_duration/30+'个月';
          }
        }
        console.log(that.data);
        that.setData({
          job: that.data.job.concat(res.data.posts),
          page:res.data.current_page,
          end_page:res.data.pages
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
  var that = this;
  var p = that.data.page+1;
  var count = that.data.end_page;
  //count = 2;
  if (p > count){
        wx.showToast({
          title:'没有更多了',
          icon:'success',
          duration:2000
        }); 
      return false;
  }
    this.loadMore(p);
     //console.log(p+'--'+count);

 },
  onLoad: function () {
    this.fetchData();
  }
})