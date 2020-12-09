
import Request from '../commen/request.js'

let strUrl = ""

//登录
export function login_interface(param){
	return Request({
		url: 'mobile/login',
		method: 'get',
		
		data:param
	})
}

//增加问诊人
export function addPatient(param){
	return Request({
		url: 'mobile/savePatient',
		method: 'POST',
		header: {'content-type': 'application/json'},
		data: param
	})
}
//获取问诊人列表
export function gainPatientList_interface(param){
	return Request({
		url: 'mobile/getEyePatientList',
		method: 'get',
		data: param
	})
}

//获取问卷题目
export function gainDianosisList_interface(param){
	return Request({
		url: 'mobile/getNewTestPaper',
		method: 'get',
		data: param
	})
}

//提交问卷答案
export function postDianosisList_interface(param){
	return Request({
		url: 'mobile/submitQuestionnaire',
		method: 'post',
		data: param
	})
}

//获取医生列表
export function gainDoctorList_interface(param){
	return Request({
		url: 'mobile/findLessPopularDoctors',
		method: 'get',
		data: param
	})
}

//获取医生列表
export function gainDoctorListWithScan_interface(param){
	return Request({
		url: 'mobile/getDoctorDetail',
		method: 'get',
		data: param
	})
}

//提交问卷结果
export function submitQuestionnaire_interface(param){
	return Request({
		url: 'mobile/submitQuestionnaire',
		method: 'POST',
		data: param,
		header: {'content-type': 'application/json'}
	})
}

//获取医生小讲堂列表
export function getForumList_interface(param){
	return Request({
		url: 'mobile/getForumList',
		method: 'GET',
		data: param
	})
}

//患获取问卷提交记录
export function getSubmitQuestionList_interface(param){
	return Request({
		url: 'mobile/getSubmitQuestionList',
		method: 'POST',
		header: {'content-type': 'application/json'},
		data: param
	})
}

//患获取问卷详情--报告详情
export function getSubmitQuestion_interface(param){
	return Request({
		url: 'mobile/getSubmitQuestion',
		method: 'GET',
		data: param
	})
}

//获取短信验证码
export function codeGenerate_interface(param){
	return Request({
		url: 'mobile/codeGenerate',
		method: 'POST',
		data: param,
		header: {'content-type': 'application/json'}
	})
}

//注册接口
export function logon_interface(param){
	return Request({
		url: 'mobile/logon',
		method: 'POST',
		data: param,
		header: {'content-type': 'application/json'}
	})
}
//修改密码
export function changePassword_interface(param){
	return Request({
		url: 'mobile/changePassword',
		method: 'POST',
		data: param,
		header: {'content-type': 'application/json'}
	})
}
//获取广告列表
export function getAdvertisementList_interface(param){
	return Request({
		url: 'mobile/getAdvertisementList',
		method: 'GET',
		data: param
	})
}



//获取问诊人列表
export function getEyePatientList(param){
	return Request({
		url:'mobile/getEyePatientList',
		method:'get',
		data:param
	})
}

//获取医生角色下的患者列表
export function getPatientsListByDoc(param){
	return Request({
		url:'mobile/getSubmitQuestionList',
		method:'post',
		data:param
	})
	
}


export function getTestRequest(){
	 return Request({
		 url: "http://39.106.180.14:1111/app/commen_gain_instructions",
		 method: 'get',
		 data:{},
		 header:{}
	 })
}