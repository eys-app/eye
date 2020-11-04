
import Request from '../commen/request.js'


export function getTestRequest(){
	 return Request({
		 url: "http://39.106.180.1:1111/app/commen_gain_instructions",
		 method: 'get',
		 data:{},
		 header:{}
	 })
}