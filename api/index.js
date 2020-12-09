
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
		method: 'get',
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
		method: 'post',
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