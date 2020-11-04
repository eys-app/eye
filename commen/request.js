let strUrl = '';
if(process.env.NODE_ENV == "development"){
	strUrl = "";
}
else{
	strUrl = "";
}

const sendRequest = function(option){
	var promise = new Promise(function(resolve, reject){
		uni.showLoading({
			title:"loading..."
		})
		uni.request({
			url: strUrl + option.url,
			method: option.method,
			data: option.data,
			header: option.header,
			success:function(res){
				uni.hideLoading();
				if(res.statusCode == 200){
					resolve(res.data);
				}else{
					resolve(res.data);
				}
			},
			fail:function(err){
				uni.hideLoading();
				console.log('网络请求失败:', err);
				reject("网络请求失败:" + err)
				uni.showToast({
					title: "网络请求失败",
					icon: "none"
				})
			}
		})
	})
	return promise;
}
export default sendRequest