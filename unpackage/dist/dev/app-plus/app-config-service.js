
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/usernumber/register","pages/usernumber/selecttype","pages/usernumber/apply/applydoctor","pages/usernumber/apply/applypatient","pages/aidiagnosis/diagnosis","pages/doctor/apply","pages/patient/tabbar/home","pages/patient/tabbar/docclass","pages/patient/tabbar/mine","pages/index/index","pages/patient/patientmanager/listContact","pages/patient/patientmanager/userInfo","pages/patient/patientmanager/addUser","pages/patient/home/articledetail"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#007AFF","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#7A7E83","selectedColor":"#1ea0fa","borderStyle":"black","backgroundColor":"#F8F8F8","list":[{"pagePath":"pages/patient/tabbar/home","text":"首页","iconPath":"static/images/home.png","selectedIconPath":"static/images/home-ed.png"},{"pagePath":"pages/patient/tabbar/docclass","text":"医生小课堂","iconPath":"static/images/class.png","selectedIconPath":"static/images/class-ed.png"},{"pagePath":"pages/patient/tabbar/mine","text":"我的","iconPath":"static/images/mine.png","selectedIconPath":"static/images/mine-ed.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"eyeSystemApp","compilerVersion":"2.9.8","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/usernumber/register","meta":{},"window":{"navigationBarTitleText":"用户注册"}},{"path":"/pages/usernumber/selecttype","meta":{},"window":{"navigationBarTitleText":"选择身份"}},{"path":"/pages/usernumber/apply/applydoctor","meta":{},"window":{"navigationBarTitleText":"认证医生"}},{"path":"/pages/usernumber/apply/applypatient","meta":{},"window":{"navigationBarTitleText":"增加就诊人"}},{"path":"/pages/aidiagnosis/diagnosis","meta":{},"window":{"navigationBarTitleText":"AI诊断"}},{"path":"/pages/doctor/apply","meta":{"isNVue":true},"window":{"navigationBarTitleText":"医生认证页面"}},{"path":"/pages/patient/tabbar/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页"}},{"path":"/pages/patient/tabbar/docclass","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"医生小课堂"}},{"path":"/pages/patient/tabbar/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","backgroundColor":"#007AFF"}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarTitleText":"uni-ui基础项目"}},{"path":"/pages/patient/patientmanager/listContact","meta":{},"window":{"navigationBarTitleText":"问诊人管理"}},{"path":"/pages/patient/patientmanager/userInfo","meta":{},"window":{"navigationBarTitleText":"问诊人详情"}},{"path":"/pages/patient/patientmanager/addUser","meta":{},"window":{"navigationBarTitleText":"添加问诊人"}},{"path":"/pages/patient/home/articledetail","meta":{},"window":{"navigationBarTitleText":"详情"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
