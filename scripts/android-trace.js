
/* author:bobby *day:2019-06-01 ,changed by booby *day:2020-02-21*/
'use strict'
var clazz_Log = null;

function getStackTrace(){
  console.log(clazz_Log.getStackTraceString(Java.use("java.lang.Exception").$new()));
}

Java.perform(function(){
    
  clazz_Log = Java.use("android.util.Log");
  });

Java.perform(function(){
  console.error("[***] Hooking im strating");
  
  //Toast
  var Toast=Java.use("android.widget.Toast");
    Toast.makeText.overload('android.content.Context', 'java.lang.CharSequence', 'int').implementation=function(p1,p2,p3){
      console.warn("Hooking makeText(p1,p2,p3) successful");
      getStackTrace();
      return this.makeText(p1,p2,p3);
    }
    Toast.makeText.overload('android.content.Context', 'android.os.Looper', 'java.lang.CharSequence', 'int').implementation=function(p1,p2,p3,p4){
      console.warn("Hooking android.widget.Toast.makeText(p1,p2,p3,p4) successful");
      getStackTrace();
      return this.makeText(p1,p2,p3,p4);
    }
    Toast.show.implementation=function(){
      console.warn("Hooking android.widget.Toast.show() successful");
      getStackTrace();
      return this.show();
    }
 
  // hook Dialog's show
  var Dialog=Java.use("android.app.Dialog");
    Dialog.show.implementation=function(){
      console.warn("Hooking android.app.Dialog.show() successful");
      getStackTrace();
      this.show();
    }
  
 //String
  
  var String = Java.use("java.lang.String");
    String.endsWith.implementation = function(arg_0) {
      console.warn("[***] Hook java.lang.String.endsWith() succeed ......");
      console.log("String->endsWith (argType: java.lang.String): " + arg_0);
      var retval = this.endsWith(arg_0);
      console.log("String->endsWith (retType: java.lang.String): " + retval);
      return retval;

    }
  
  String.contains.implementation = function(arg_0) {
    console.warn("[***] Hook java.lang.String.contains() succeed ......");
    console.log("String->contains (argType: java.lang.String): " + arg_0);
    var retval = this.contains(arg_0);
    console.log("String->contains (retType: java.lang.String): " + retval);
    return retval;

        }
  
  // Pattern
  var Pattern = Java.use("java.util.regex.Pattern");

    Pattern.compile.overload('java.lang.String').implementation = function(arg_0) {
        console.warn("[***] Hook java.util.regex.Pattern.compile() succeed ......");
        getStackTrace();
        console.log("Pattern->compile (argType: java.lang.String): " + arg_0);
        var retval = this.compile(arg_0);
        console.log("Pattern->compile (retType: java.lang.String): " + retval);
        return retval;
    }
  
    Pattern.compile.overload('java.lang.String', 'int').implementation = function(arg_0,arg_1) {
        console.warn("[***] Hook java.util.regex.Pattern.compile(arg_0,arg_1) succeed ......");
        getStackTrace();
        console.log("Pattern->compile (argType: java.lang.String): " + arg_0);
        var retval = this.compile(arg_0,arg_1);
        console.log("Pattern->compile (retType: java.lang.String): " + retval);
        return retval;

    }

    Pattern.matcher.overload('java.lang.CharSequence').implementation = function(arg_0) {
        console.warn("[***] Hook java.util.regex.Pattern.matcher() succeed ......");
        getStackTrace();
        console.log("Pattern->matcher (argType: java.lang.String): " + arg_0);
        var retval = this.matcher(arg_0);
        console.log("Pattern->matcher (retType: java.lang.String): " + retval);
        return retval;

    }
  
    Pattern.matcher.overload('java.lang.CharSequence').implementation = function(arg_0) {

      if(arg_0=="http://xxx.xxx.xxx/"){
        console.warn("[***] Hook java.util.regex.Pattern.matcher() succeed ......");
        // getStackTrace();
        console.log("Pattern->matcher (argType: java.lang.String): " + arg_0);
        var retval = this.matcher(arg_0);
        console.log("Pattern->matcher (retType: java.lang.String): " + retval);
        return retval;

      }else{
        return this.matcher(arg_0);
      }
     }
  
  //textView
  var TextView=Java.use("android.widget.TextView");
    TextView.setText.overload('java.lang.CharSequence').implementation=function(p1){
      console.warn("Hooking setText() successful");
      console.warn(p1);
      getStackTrace();
      return this.setText(p1);
    }
    TextView.setText.overload('int').implementation=function(p1){
      console.warn("Hooking setText('int') successful");
      console.warn(p1);
      getStackTrace();
      return this.setText(p1);
    }
  
  //hook WebView methods
  
  var WebView_name="android.webkit.WebView";
  // var WebView_name="com.tencent.smtt.sdk.WebView";
  // var WebView_name="com.uc.webview.export.WebView";
  // var WebView_name="com.miui.webkit.WebView";
  // var WebView_name="com.miui.webkit_api.WebView";
  
  var WebView=Java.use(WebView_name);

    WebView.getUrl.implementation=function(){
      console.warn("Hooking "+WebView_name+".getUrl(p1) successful");
      var ret=this.getUrl();
      console.log("WebView.getUrl() ,ret="+ret);
      return ret;
    }


    WebView.loadUrl.overload('java.lang.String').implementation=function(p1){
      console.warn("Hooking "+WebView_name+".loadUrl(p1) successful,url = "+p1);
      getStackTrace();
      this.loadUrl(p1);
    }


    WebView.loadUrl.overload('java.lang.String','java.util.Map').implementation=function(p1,p2){
      console.warn("Hooking "+WebView_name+".loadUrl(p1,p2) successful,url = "+p1+", map.size() ="+p2.size());
      getStackTrace();

      if(p2!=null&p2.size()!=0){
        var iterator = p2.entrySet().iterator();
        while(iterator.hasNext()){
            var entry = Java.cast(iterator.next(),Java.use('java.util.HashMap$Node'));
            console.log(entry.getKey()+": "+entry.getValue());   
        }
      }
      this.loadUrl(p1,p2);
    }

    WebView.addJavascriptInterface.implementation=function(p1,p2){
      console.warn("Hooking "+WebView_name+".addJavascriptInterface() successful, "+p1+":"+p2);
      // getStackTrace();
      this.addJavascriptInterface(p1,p2);
    }

    WebView.removeJavascriptInterface.implementation=function(p1){
      console.warn("Hooking "+WebView_name+".removeJavascriptInterface() successful, "+p1);
      // getStackTrace();
      this.removeJavascriptInterface(p1);
    }


    WebView.evaluateJavascript.implementation=function(p1,p2){
      console.warn("Hooking "+WebView_name+".evaluateJavascript() successful, p1="+p1);
      getStackTrace();
      this.evaluateJavascript(p1,p2);
    }

    WebView.setWebChromeClient.implementation=function(p1){
      console.warn("Hooking "+WebView_name+".setWebChromeClient() successful, p1="+p1);
      // getStackTrace();
      this.setWebChromeClient(p1);
    }

    WebView.setWebViewClient.implementation=function(p1){
      console.warn("Hooking "+WebView_name+".setWebViewClient() successful, p1="+p1);
      // getStackTrace();
      this.setWebViewClient(p1);
    }
 
  
  // hook shouldOverrideUrlLoading and onJsPrompt 
  
  var WebViewClient=Java.use("android.webkit.WebViewClient");

    WebViewClient.shouldOverrideUrlLoading.overload('android.webkit.WebView', 'java.lang.String').implementation = function(arg_0, arg_1) {
        console.warn("[***] Hook android.webkit.WebViewClient.shouldOverrideUrlLoading('android.webkit.WebView', 'java.lang.String') succeed ......");
        console.log("WebViewClient->shouldOverrideUrlLoading (argType: android.webkit.WebView): " + arg_0);
        console.log("WebViewClient->shouldOverrideUrlLoading (argType: java.lang.String): " + arg_1);
        var retval = this.shouldOverrideUrlLoading(arg_0, arg_1);
        console.log("WebViewClient->shouldOverrideUrlLoading (retType: boolean): " + retval);
        return retval;
    }

    WebViewClient.shouldOverrideUrlLoading.overload('android.webkit.WebView', 'android.webkit.WebResourceRequest').implementation = function(arg_0, arg_1) {
        console.warn("[***] Hook android.webkit.WebViewClient.shouldOverrideUrlLoading('android.webkit.WebView', 'android.webkit.WebResourceRequest') succeed ......");
        console.log("WebViewClient->shouldOverrideUrlLoading (argType: android.webkit.WebView): " + arg_0);
        console.log("WebViewClient->shouldOverrideUrlLoading (argType: java.lang.String): " + arg_1.getUrl());
        var retval = this.shouldOverrideUrlLoading(arg_0, arg_1);
        console.log("WebViewClient->shouldOverrideUrlLoading (retType: boolean): " + retval);
        return retval;
    }

  var WebChromeClient_name="xxx";
  var WebChromeClient = Java.use(WebChromeClient_name);

    WebChromeClient.onJsPrompt.implementation = function(arg_0, arg_1, arg_2, arg_3, arg_4) {
      console.warn("Hook "+WebChromeClient_name+".onJsPrompt() succeed ......");
      console.log("WebChromeClient->onJsPrompt (argType: WebView): " + arg_0);
      console.log("WebChromeClient->onJsPrompt (argType: java.lang.String): " + arg_1);
      console.log("WebChromeClient->onJsPrompt (argType: java.lang.String): " + arg_2);
      console.log("WebChromeClient->onJsPrompt (argType: java.lang.String): " + arg_3);
      console.log("WebChromeClient->onJsPrompt (argType: JsPromptResult): " + arg_4);
      var retval = this.onJsPrompt(arg_0, arg_1, arg_2, arg_3, arg_4);
      console.log("WebChromeClient->onJsPrompt (retType: boolean): " + retval);
      return retval;
    }

    WebChromeClient.onJsConfirm.implementation = function(arg_0, arg_1, arg_2, arg_3) {
      console.warn("Hook "+WebChromeClient_name+".onJsConfirm() succeed ......");
      console.log("WebChromeClient->onJsConfirm (argType: android.webkit.WebView): " + arg_0);
      console.log("WebChromeClient->onJsConfirm (argType: java.lang.String): " + arg_1);
      console.log("WebChromeClient->onJsConfirm (argType: java.lang.String): " + arg_2);
      console.log("WebChromeClient->onJsConfirm (argType: JsConfirmResult): " + arg_3);
      var retval = this.onJsConfirm(arg_0, arg_1, arg_2, arg_3);
      console.log("WebChromeClient->onJsConfirm (retType: boolean): " + retval);
      return retval;
    }

    WebChromeClient.onConsoleMessage.implementation = function(arg_0) {
      console.warn("Hook "+WebChromeClient_name+".onConsoleMessage() succeed ......");
      console.log(arg_0.message())
      console.log(arg_0.toString())
      var retval = this.onConsoleMessage(arg_0);
      console.log("WebChromeClient->onConsoleMessage (retType: boolean): " + retval);
      return retval;
    }
  
  
  var CookieManager=Java.use("com.tencent.smtt.sdk.CookieManager");
    CookieManager.getInstance.implementation=function(){
      console.warn("Hooking com.tencent.smtt.sdk.CookieManager.getInstance() successful");
      // getStackTrace();
      return this.getInstance();
    }

    CookieManager.setCookie.overload('java.lang.String', 'java.lang.String').implementation=function(p1,p2){
      console.warn("Hooking com.tencent.smtt.sdk.CookieManager.setCookie() successful");
      console.log(p1+" :"+p2);
      getStackTrace();
      return this.setCookie(p1,p2);
    }
  


  var CookieManager=Java.use("android.webkit.CookieManager");
    CookieManager.getInstance.implementation=function(){
      console.warn("Hooking CookieManager.getInstance() successful");
      // getStackTrace();
      return this.getInstance();
    }
    CookieManager.setCookie.overload('java.lang.String', 'java.lang.String').implementation=function(p1,p2){
      console.warn("Hooking CookieManager.setCookie() successful");
      console.log(p1+" :"+p2);
      // getStackTrace();
      return this.setCookie(p1,p2);
    }
  
  //hook Activity methods
  var Activity=Java.use("android.app.Activity");
    Activity.finish.overload().implementation=function(){
      console.warn("Hooking android.app.Activity.finish() successful");
      getStackTrace();
      this.finish();
    }

    Activity.finish.overload('int').implementation=function(int){
      console.warn("Hooking android.app.Activity.finish('int') successful");
      getStackTrace();
      this.finish(int);
    } 

    Activity.startActivity.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Activity.startActivity(p1) successful, p1="+p1);
      getStackTrace();
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startActivity(p1);
    }
    Activity.startActivity.overload('android.content.Intent', 'android.os.Bundle').implementation=function(p1,p2){
      console.warn("Hooking android.app.Activity.startActivity(p1,p2) successful, p1="+p1);
      getStackTrace();
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startActivity(p1,p2);
    }

    Activity.startActivityForResult.overload('android.content.Intent', 'int').implementation=function(p1,p2){
            console.warn("Hooking android.app.Activity.startActivityForResult('android.content.Intent', 'int') successful, p1="+p1);
            getStackTrace();
            console.log(decodeURIComponent(p1.toUri(256)));
            this.startActivityForResult(p1,p2);
        }

    Activity.startActivityForResult.overload('android.content.Intent', 'int', 'android.os.Bundle').implementation=function(p1,p2,p3){
        console.warn("Hooking android.app.Activity.startActivityForResult('android.content.Intent', 'int', 'android.os.Bundle') successful, p1="+p1);
        getStackTrace();
        console.log(decodeURIComponent(p1.toUri(256)));
        this.startActivityForResult(p1,p2,p3);
    }

    Activity.startActivityForResult.overload('java.lang.String', 'android.content.Intent', 'int', 'android.os.Bundle').implementation=function(p1,p2,p3,p4){
        console.warn("Hooking android.app.Activity.startActivityForResult('java.lang.String', 'android.content.Intent', 'int', 'android.os.Bundle') successful, p1="+p2);
        getStackTrace();
        console.log(decodeURIComponent(p2.toUri(256)));
        this.startActivityForResult(p1,p2,p3,p4);
    }
  
    Activity.startService.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Activity.startService(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      return this.startService(p1);
    }

    Activity.sendBroadcast.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Activity.sendBroadcast(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1);
    }
    Activity.sendBroadcast.overload('android.content.Intent', 'java.lang.String').implementation=function(p1,p2){
      console.warn("Hooking android.app.Activity.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1,p2);
    }

    Activity.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'android.os.Bundle').implementation=function(p1,p2,p3){
      console.warn("Hooking android.app.Activity.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1,p2,3);
    }

    Activity.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'int').implementation=function(p1,p2,p3){
      console.warn("Hooking android.app.Activity.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1,p2,p3);
    }

  //hook Service methods
  var Service=Java.use("android.app.Service");
    Service.startActivity.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Service.startActivity(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startActivity(p1);
    }
    Service.startActivity.overload('android.content.Intent', 'android.os.Bundle').implementation=function(p1,p2){
      console.warn("Hooking android.app.Service.startActivity(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startActivity(p1,p2);
    }

    Service.startService.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Service.startService(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startService(p1);
    }

    Service.sendBroadcast.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Service.sendBroadcast(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1);
    }
    Service.sendBroadcast.overload('android.content.Intent', 'java.lang.String').implementation=function(p1,p2){
      console.warn("Hooking android.app.Service.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1,p2);
    }

    Service.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'android.os.Bundle').implementation=function(p1,p2,p3){
      console.warn("Hooking android.app.Service.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1,p2,3);
    }

    Service.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'int').implementation=function(p1,p2,p3){
      console.warn("Hooking android.app.Service.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1,p2,p3);
    }



  //ContextWrapper
  var ContextWrapper=Java.use("android.content.ContextWrapper");
    ContextWrapper.startActivity.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.content.ContextWrapper.startActivity(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startActivity(p1);
    }
    ContextWrapper.startActivity.overload('android.content.Intent', 'android.os.Bundle').implementation=function(p1,p2){
      console.warn("Hooking android.content.ContextWrapper.startActivity(p1,p2) successful, p1="+p1);
      getStackTrace();
      console.log(decodeURIComponent(p1.toUri(256)));
      this.startActivity(p1,p2);
    }

    ContextWrapper.startService.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.content.ContextWrapper.startService(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      return this.startService(p1);
    }

    ContextWrapper.sendBroadcast.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.app.Activity.sendBroadcast(p1) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1);
    }
    ContextWrapper.sendBroadcast.overload('android.content.Intent', 'java.lang.String').implementation=function(p1,p2){
      console.warn("Hooking android.content.ContextWrapper.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1,p2);
    }

    ContextWrapper.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'android.os.Bundle').implementation=function(p1,p2,p3){
      console.warn("Hooking android.content.ContextWrapper.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1,p2,3);
    }

    ContextWrapper.sendBroadcast.overload('android.content.Intent', 'java.lang.String', 'int').implementation=function(p1,p2,p3){
      console.warn("Hooking android.content.ContextWrapper.sendBroadcast(p1,p2) successful, p1="+p1);
      console.log(decodeURIComponent(p1.toUri(256)));
      this.sendBroadcast(p1,p2,p3);
    }

  // hook Intent methods
  var Intent=Java.use("android.content.Intent");
    Intent.putExtra.overload('java.lang.String', 'java.lang.String').implementation=function(p1,p2){
      console.warn("Hooking android.content.Intent.putExtra('java.lang.String', 'java.lang.String') successful");
      // console.log("key ="+p1+",value ="+p2);
      // getStackTrace();
      return this.putExtra(p1,p2);
    }

    Intent.putExtra.overload('java.lang.String', 'java.lang.CharSequence').implementation=function(p1,p2){
      console.warn("Hooking android.content.Intent.putExtra('java.lang.String', 'java.lang.CharSequence') successful");
      console.log(p1);
      console.log(p2);
      // getStackTrace();
      return this.putExtra(p1,p2);
    }

    Intent.$init.overload('android.os.Parcel').implementation=function(p1){
      console.warn("Hooking android.content.Intent.$init('android.os.Parcel') successful");
      // getStackTrace();
      this.$init(p1);
    }
    Intent.$init.overload('java.lang.String').implementation=function(p1){
      console.warn("Hooking android.content.Intent.$init('java.lang.String') successful");
      console.log(p1);
      // getStackTrace();
      this.$init(p1);
    }
    Intent.$init.overload('android.content.Intent').implementation=function(p1){
      console.warn("Hooking android.content.Intent.$init('android.content.Intent') successful");
      // getStackTrace();
      this.$init(p1);
    }
    Intent.$init.overload('java.lang.String', 'android.net.Uri').implementation=function(p1,p2){
      console.warn("Hooking android.content.Intent.$init('java.lang.String', 'android.net.Uri') successful");
      console.log(p1);
      console.log(p2);
      // getStackTrace();
      this.$init(p1,p2);
    }
    Intent.$init.overload('android.content.Context', 'java.lang.Class').implementation=function(p1,p2){
      console.warn("Hooking android.content.Intent.$init('android.content.Context', 'java.lang.Class') successful");
      // getStackTrace();
      this.$init(p1,p2);
    }
    Intent.$init.overload('android.content.Intent', 'int').implementation=function(p1,p2){
      console.warn("Hooking android.content.Intent.$init('android.content.Intent', 'int') successful");
      // getStackTrace();
      this.$init(p1,p2);
    }
    Intent.$init.overload('java.lang.String', 'android.net.Uri', 'android.content.Context', 'java.lang.Class').implementation=function(p1,p2,p3,p4){
      console.warn("Hooking android.content.Intent.$init('java.lang.String', 'android.net.Uri', 'android.content.Context', 'java.lang.Class') successful");
      console.log(p1);
      console.log(p2);
      // getStackTrace();
      this.$init(p1,p2,p3,p4);
    }
});
