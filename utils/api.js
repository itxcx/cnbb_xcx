'use strict';
var API_URI = 'http://192.168.0.145/api/';
var POST_URI = 'http://183.195.157.158:7777/v1/post/';
var RESUME_URI='http://183.195.157.158:5555/v1/resume/';
var FILE_URI='http://183.195.157.158:8081/v1/file/';
var INFRA_URL="http://183.195.157.158:8182/v1/infrastructure/";
var PASSPORT_URL="http://183.195.157.158:8181/v1/passport/";
var access_token="L0RsWlh2S0xpeVFPU2tubDhNRldMZz09_A_09388f9a02";
//access_token="ZEY2NUdQUWFtTkNONkFxNVFDbGdHQT09_A_0d9d029f49";
// 获取节点
// 所有的节点
var ALL_NODE = 'nodes/all.json';
// 获取节点信息 
// 节点id :id 节点名 :name
var NODE_INFO = 'nodes/show.json';

// 获取主题
// 取最新的主题
var LATEST_TOPIC = 'topics/latest.json';
// 获取热议主题
var HOT_TOPIC = 'topics/hot.json';
// 获取主题信息  :id | (:username | :node_id | :node_name)
var GET_TOPICS = 'topics/show.json';

// 获取回复 :topic_id (:page , :page_size)?
var GET_REPLIES = 'replies/show.json';


// 获取用户信息
var GET_USERINFO = 'members/show.json';
//获取岗位列表
var GET_JOBLIST = 'joblist';
//获取岗位详情
var GET_JOBDESC = 'jobdetail';
//收藏岗位
var POST_FAV = ''


function _obj2uri(obj){
	return Object.keys(obj).map(function(k) {
		return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
	}).join('&');
}


function _getAllNode(){
	return HOST_URI+ALL_NODE;
}

function _getNodeInfo(o){
	return HOST_URI+NODE_INFO+'?'+_obj2uri(o);
}

function _getTopicInfo(o) {
	return HOST_URI+GET_TOPICS+'?'+_obj2uri(o);
} 
//岗位列表
function _getPostList(o){
	//return 'http://www.cainiaobangbang.com/api/' + GET_JOBLIST+'?'+_obj2uri(o);
	//return API_URI+GET_JOBLIST+'?'+_obj2uri(o);
	return POST_URI+"search"+'?'+_obj2uri(o);
}

function _getHotestTopic(o) {
	return HOST_URI+HOT_TOPIC+'?'+_obj2uri(o);
}

function _getReplies(o){
	return HOST_URI+GET_REPLIES+'?'+_obj2uri(o);
}
//获取简历列表
function _getResumeList(){
return RESUME_URI+"list/my?access_token="+access_token;
}
//上传文件
function _uploadFile(){
	return FILE_URI+"upload";
}
//投递
function _deliver(o){
	return POST_URI+"deliver";
}
//岗位详情
function _getPostDetail(o)
{
	//return 'http://www.cainiaobangbang.com/weiapp/job/Jobdetail'+'?'+_obj2uri(o);
	//return POST_URI+"/"+id;
	return API_URI+GET_JOBDESC+'?'+_obj2uri(o);
}
//学校区域
function _getSchoolAreas()
{
	return INFRA_URL+"areas";
}
//学校
function _getSchool(code)
{
	return RESUME_URI+"school/list_by_province?province_id="+code;
}
//省
function _getProvinces()
{
return INFRA_URL+"areas?nohw=true";
}
//居住区域
function _getResideAreas(code)
{
	console.log(code);
return INFRA_URL+"areas?nohw=true&code="+code;
}
//创建简历
function _createResume()
{
	return RESUME_URI+"create";
}
//简历基本信息
function _getResumeBase(uid,resume_id)
{
	return RESUME_URI+"base/get?access_token="+access_token+"&uid="+uid+"&resume_id="+resume_id;
}
//创建简历基本信息
function _createResumeBase()
{
	return RESUME_URI+"base/createorupdate_info";
}
//编辑简历基本信息
function _updateResumeBase()
{
	return RESUME_URI+"base/update";
}
//更新头像
function _updateAvatar()
{
	return RESUME_URI+"base/createorupdate_avatar"
}
//获取单个教育经历
function _getEdu(id)
{
return RESUME_URI+"edu/"+id+"?access_token="+access_token;
}
//创建教育经历
function _createEdu(edu_id)
{
	return RESUME_URI+"edu/create_update_default_edu";
}
//更新教育经历
function _updateEdu()
{
return RESUME_URI+"edu/update";
}
//默认简历的详情
function _getUserDefaultResumeDetail()
{
	return RESUME_URI+"user_default_resume?access_token="+access_token;
}
//专业分类
function _getMajorCategories()
{
	return RESUME_URI+"edu/major_categories?access_token="+access_token;
}
//返回token
function _getAccessToken()
{
	return access_token;
}
module.exports = {
	getAllNode: _getAllNode,
	getNodeInfo: _getNodeInfo,
	getPostList: _getPostList,
	getPostDetail: _getPostDetail,
	getHotestTopic: _getHotestTopic,
	getTopicInfo: _getTopicInfo,
	getReplies: _getReplies,
	getResumeList:_getResumeList,
	uploadFile: _uploadFile,
	getSchoolAreas: _getSchoolAreas,
	getResideAreas: _getResideAreas,
	getResumeBase: _getResumeBase,
	createResumeBase: _createResumeBase,
	updateResumeBase: _updateResumeBase,
	getEdu: _getEdu,
	createEdu: _createEdu,
	updateEdu: _updateEdu,
	getUserDefaultResumeDetail: _getUserDefaultResumeDetail,
	getAccessToken: _getAccessToken,
	updateAvatar:_updateAvatar,
	 getProvinces:_getProvinces,
	 getSchool:_getSchool,
	 getMajorCategories:_getMajorCategories,
	deliver:_deliver
};