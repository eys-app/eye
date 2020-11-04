
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/doctor/apply","pages/patient/add","pages/patient/home","pages/patient/docclass","pages/patient/mine","pages/index/index"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#007AFF","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#7A7E83","selectedColor":"#007AFF","borderStyle":"black","backgroundColor":"#F8F8F8","list":[{"pagePath":"pages/patient/home","text":"首页","iconPath":"static/component.png","selectedIconPath":"static/componentHL.png"},{"pagePath":"pages/patient/docclass","text":"医生小课堂","iconPath":"static/api.png","selectedIconPath":"static/apiHL.png"},{"pagePath":"pages/patient/mine","text":"我的","iconPath":"static/extui.png","selectedIconPath":"static/extuiHL.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"eyeSystemApp","compilerVersion":"2.9.3","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/doctor/apply","meta":{"isNVue":true},"window":{"navigationBarTitleText":"医生认证页面"}},{"path":"/pages/patient/add","meta":{},"window":{"navigationBarTitleText":"患者申请页面"}},{"path":"/pages/patient/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"患者home页面"}},{"path":"/pages/patient/docclass","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"患者class页面"}},{"path":"/pages/patient/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"患者mine页面"}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarTitleText":"uni-ui基础项目"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
