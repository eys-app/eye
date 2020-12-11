
<template>  
    <view class="content">  
        <view class="nav-top">1.让朋友的手机扫描下面的二维码即可安装</view>  
        <view class="main">  
            <view class="lay1"><view class="line"></view></view>  
            <view class="lay2">  
                <view class="qr">  
                    <view class="qr-img">  
                        <image  
                            src="../../../static/image-doctor.jpg"  
                            style="height: 200upx;width: 200upx;"  
                        ></image>  
                    </view>  
                    <view class="qr-txt">扫描二维码下载安装包</view>  
                </view>  
            </view>  
            <view class="lay3"><view class="line"></view></view>  
        </view>  
        <view class="code-btn">  
            <view class="line-btn"><view class="btn" @tap="capture()">点击保存至手机相册</view></view>  
        </view>  
    </view>  
</template>  
 
<script>  
    export default{  
        methods: {  
            capture() {  
                var pages = getCurrentPages();  
                var page = pages[pages.length - 1];  
				console.log("当前页"+pages.length-1);
                var bitmap=null;  
                var currentWebview = page.$getAppWebview();
                bitmap = new plus.nativeObj.Bitmap('content');  
                // 将webview内容绘制到Bitmap对象中  
                currentWebview.draw(bitmap,function(){  
                    console.log('截屏绘制图片成功');  
                    bitmap.save( "_doc/a.jpg"  
                    ,{}  
                    ,function(i){  
                        console.log('保存图片成功：'+JSON.stringify(i));  
                        uni.saveImageToPhotosAlbum({  
                            filePath: i.target,  
                            success: function () {  
                                bitmap.clear(); //销毁Bitmap图片  
                                uni.showToast({  
                                    title: '保存图片成功',  
                                    mask: false,  
                                    duration: 1500  
                                });  
                            }  
                        });  
                    }  
                    ,function(e){  
                        console.log('保存图片失败：'+JSON.stringify(e));  
                    });  
                },function(e){  
                    console.log('截屏绘制图片失败：'+JSON.stringify(e));  
                });  
                //currentWebview.append(amway_bit);    
            }  
        },  
    }  
 
</script>  
 
<style>  
page {  
    background-color: #2d355c;  
}  
.content {  
}  
.nav-top {  
    color: #ffffff;  
    font-size: 35upx;  
    text-align: center;  
    margin: 20upx 0;  
}  
.main {  
    position: relative;  
    width: 100%;  
    margin-top: 50upx;  
}  
.main .lay1 {  
    position: absolute;  
    top: 0;  
    bottom: 0;  
    right: 0;  
    left: 0;  
    z-index: 3000;  
}  
.main .lay1 .line {  
    height: 100upx;  
    width: 100%;  
    border-radius: 50px;  
    background-color: #e28f0b;  
    margin-top: 100upx;  
}  
.lay2 {  
    position: absolute;  
    top: 0;  
    bottom: 0;  
    right: 0;  
    left: 0;  
    z-index: 4000;  
}  
.lay2 .qr {  
    width: 70%;  
    margin: 0 auto;  
    height: 700upx;  
    background-color: #3958ab;  
}  
.qr-img {  
    text-align: center;  
    padding-top: 50%;  
}  
.qr-txt {  
    color: #ffffff;  
    text-align: center;  
    margin-top: 50upx;  
}  
.lay3 {  
    position: absolute;  
    top: 0;  
    bottom: 0;  
    right: 0;  
    left: 0;  
    z-index: 4000;  
    text-align: center;  
}  
.lay3 .line {  
    height: 100upx;  
    width: 85%;  
    border-radius: 50px;  
    background-color: #e28f0b;  
    margin: 40upx auto;  
    box-shadow: #cccccc 0px 3px 10px;  
}  
.code-btn {  
    width: 100%;  
    color: #ffffff;  
    height: 100%;  
    text-align: center;  
}  
.line-btn {  
    position: absolute;  
    bottom: 200upx;  
    left: 0upx;  
    right: 0upx;  
    width: 100%;  
    display: flex;  
    justify-content: center;  
}  
.btn {  
    width: 400upx;  
    padding: 35upx;  
    background-color: #e28f0b;  
    border-radius: 50px;  
}  
.btn:active{  
    background-color: #FEC607;  
}  
</style>