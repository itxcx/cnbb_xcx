function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function transLocalTime(t) {
  return new Date(t * 1000);
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
  transLocalTime: transLocalTime,
  json2Form:json2Form
}
