function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//整数转年月日
function formatDate(date) {
    if(date!=null)
  {
  var year = date.toString().substr(0,4)
  var month =date.toString().substr(4,2)
  var day = date.toString().substr(6,2)
  return year+"年"+month+"月"+day+"日"
  }
  return "";
}
function formatDate2(date) {
   if(date!=null)
  {
  var year = date.toString().substr(0,4)
  var month =date.toString().substr(4,2)
  var day = date.toString().substr(6,2)
  //return new Date(year,month-1,day)
  return year+"-"+month+"-"+day
  }
  return "";
}
//短整数转年月
function formatShortDate(date){
  if(date!=null)
  {
 var year = date.toString().substr(0,4);
  var month =date.toString().substr(4,2)
  return year+"-"+month
  }
  return "";
}
function transLocalTime(t) {
  return new Date(t * 1000);
}
//转换职位类型
function transWorkType(n)
{
  var str = '';
  switch ( n ) {
      case 0:
          str = '不限';break;
      case 1:
          str = '假期';break;
      case 2:
          str = '日常';break;
      default:
          str = '不限';
  }
  return str;
}
//转换政治面貌
function transPolitics(n)
{
  if(n==1)
  return "团员";
  else if(n==2)
  return "党员";
  else if(n==0)
  return "其他";
  else if(n==3)
  return "群众";
}
//转换学历
function transDegree(n)
{
  if(n==2)
  return "本科";
  else if(n==3)
  return "硕士";
  else if(n==1)
  return "大专";
  else if(n==0)
  return "其他";
  else if(n==4)
  return "博士";
}
//转换户口
function transHukou(n)
{
  if(n==0)
  return "城镇户口";
  else if(n==1)
  return "农村户口";
  else if(n==2)
  return "集体户口";
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//时间转成时间戳
function getDateTimeStamp(dateStr){
 return Date.parse(new Date(dateStr));
}
//时间转换成str
function getDateDiff(dateTimeStamp){
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if(diffValue < 0){return;}
  var monthC =diffValue/month;
  var weekC =diffValue/(7*day);
  var dayC =diffValue/day;
  var hourC =diffValue/hour;
  var minC =diffValue/minute;
  if(monthC>=1){
    result="" + parseInt(monthC) + "月前";
  }
  else if(weekC>=1){
    result="" + parseInt(weekC) + "周前";
  }
  else if(dayC>=1){
    result=""+ parseInt(dayC) +"天前";
  }
  else if(hourC>=1){
    result=""+ parseInt(hourC) +"小时前";
  }
  else if(minC>=1){
    result=""+ parseInt(minC) +"分钟前";
  }else
  result="刚刚";
  return result;
}
//薪资
function salary2Str(start,end,type){
  var str = '';
  if ( start > 0 ) {
    if ( end > 0 ){
      str = start+'-'+end;
    }else{
      str = start;
    }
    if ( type == 0 ){
      str += '元/天';
    }else{
      str += '元/月';
    }
  }else{
    str  = "面议";
  }
  return str;
}
//json转form
function json2Form(json) {  
    var str = [];  
    for(var p in json){  
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));  
    }  
    return str.join("&");  
}  
module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  transLocalTime: transLocalTime,
  json2Form:json2Form,
  transPolitics:transPolitics,
  transDegree:transDegree,
  formatShortDate:formatShortDate,
  transHukou:transHukou,
  formatDate2: formatDate2,
  getDateTimeStamp:getDateTimeStamp,
  getDateDiff:getDateDiff,
  salary2Str:salary2Str,
  transWorkType:transWorkType,

}
