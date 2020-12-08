
import Request from '../commen/request.js'

// let strUrl = "http://192.168.4.25:8090/"
let strUrl = "http://192.168.4.195:8090/"

//登录
export function login_interface(param){
	return Request({
		url: strUrl + 'mobile/login',
		method: 'get',
		data:param
	})
}

//增加问诊人
export function addPatient(param){
	return Request({
		url: strUrl + 'mobile/savePatient',
		method: 'get',
		data: param
	})
}

//获取问诊人列表
export function getEyePatientList(param){
	return Request({
		url:strUrl+'mobile/getEyePatientList',
		method:'get',
		data:param
	})
}

//获取医生角色下的患者列表
export function getPatientsListByDoc(param){
	return Request({
		url:strUrl+'mobile/getSubmitQuestionList',
		method:'get',
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