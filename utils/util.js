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
  var year = Math.floor(date/10000)
  var month =Math.floor(date%10000/100)
  var day = date%100
  return year+"年"+month+"月"+day+"日"
}
function formatDate2(date) {
  var year = Math.floor(date/10000)
  var month =Math.floor(date%10000/100)
  var day = date%100
  //return new Date(year,month-1,day)
  return year+"-"+month+"-"+day
}
//短整数转年月
function formatShortDate(date){
 var year = Math.floor(date/100)
  var month =date%100
  return year+"-"+month
}
function transLocalTime(t) {
  return new Date(t * 1000);
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
}
