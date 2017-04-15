function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}
	$(document).ready(function(){
		$("#send").click(function(event){
			event.preventDefault();
			var shareurl=myTrim($("input[name='shareurl']").val());
			if(shareurl==="" || shareurl.length<8){
				alert("小碧池!要解析的链接呢？？");
				return;
			}
			if(!shareurl.match("pan.baidu.com")){
				alert("只能解析百度网盘，你输入的是"+shareurl);
				return;
			}



			var that=$(this);
			that.disabled=true;
			$("#loading").addClass("active");
			$.ajax({
				  type: 'GET', 
				  url: "http://api.pescn.top/sharelinks?"+$("#bdpForm").serialize(),
				  dataType: 'json',
				  contentType: 'json',
				  // headers: { 'conent-type':'application/json' },
				  success: function(data){
				  	// try{
				  	// 	var resultJson=JSON.parse(data.responseText)
				  	// }catch(err){
				  	// 	console.log("服务器返回错误："+err+data)
				  	// }
				  	if(data.errno){
				  		alert(data.message)
				  	}else{
				  		resultApp.refresh(data)
				  	}
				  	$("#resultList").show();
				  	that.disabled=false;
				  	$("#loading").removeClass("active");
				  },
				  error: function(err){
				  	that.disabled=false;
				  	$("#loading").removeClass("active");
				  	alert("发送请求出错，请重试")
				  }
				});

		})
	})
	Vue.filter("nodeInfo",function(link){
			return link.match("dcdn")?"(高速)":"(普通)";
	})
	var resultApp=new Vue({
		el:"#resultList",
		data:{links:[]},
		methods:{
			refresh:function(newData){
				Object.assign(this.$data,newData)
			},
			noHttps:function(links){
				return links.filter(function(link){
					return link.indexOf("https")===-1;
				})
			}
		},

	})