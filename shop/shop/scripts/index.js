$(function(){
	//search
    $("input[type=search]").focus(function(){
        $(this).addClass("focus");
        if($(this).val() == this.defaultValue){
        	$(this).val("");
        }
    }).blur(function(){
    	$(this).removeClass("focus");
    	$(this).val(this.defaultValue);
    }).keyup(function(){
    	if($(this).val().length == 0){
    		return false;
    	}else{
    		alert("嘿嘿，没找到");
    	}
    });
    //nav
    $("#nav-ul li").mouseover(function(){
    	$(this).addClass('active').siblings().not(".shouye").removeClass('active');
        var index = $(this).index();	 
    	$(".tui-dl").eq(index-1).show();
    }).mouseout(function(){
    	var index = $(this).index();
    	$(this).removeClass('active').siblings().not(".shouye").removeClass('active');
    	$(".tui-dl").eq(index-1).hide();
    });
    //
    var $big_div_a = $(".big div a");
    var len = $big_div_a.length;
    var index = 0;
    var adTimer = null;
    $big_div_a.css("opacity","0.5");
    
    $big_div_a.mouseover(function(){
    	index = $big_div_a.index(this);
    	showImg(index);
    }).eq(0).mouseover();
    
    $(".big").hover(function(){
    	if(adTimer){
    		clearInterval(adTimer);
    	}
    },function(){
    	adTimer = setInterval(function(){
    		showImg(index);
    		index++;
    		if(index == len){index=0;}
    	},3000);
    }).trigger("mouseleave");
    function showImg(index){
	    var $big_div_a = $(".big div a");
	    var newhref = $big_div_a.attr("href");
	    $("#showimg").attr("href",newhref).find('img').eq(index).stop(true,true).fadeIn().siblings().fadeOut();
	    $big_div_a.css("opacity","0.5").removeClass("aem").eq(index).css("opacity","1").addClass("aem");
	}
    //title
    
    var title = 0;
    var $zuixin_ul_li = $(".zuixin > ul > li > a");
    $zuixin_ul_li.mouseover(function(e){
    	this.Title = this.title;
    	title = $(this).attr("title");
    	this.title = "";
//  	var tooltip = "<div id='tooltip'>"+this.Title+"</div>";//js
    	var $tooltip = $("<div id='tooltip'>"+title+"</div>");jQuery
//  	$("body").append(tooltip);//js
    	$("body").append($tooltip);//jQuery
    	$("#tooltip").css({
    		"position":"absolute",
    		"top":e.pageY + "px",
    		"left":e.pageX + "px"
    	}).show("fast");
    }).mouseout(function(e){
//  	this.title = this.Title;//js
        $(this).attr("title",title);//jQuery
    	$("#tooltip").remove();
    }).mousemove(function(e){
    	$("#tooltip").css({
    		"position":"absolute",
    		"top":e.pageY + "px",
    		"left":e.pageX + "px"
    	});
    });
    
    //cursor
    //品牌活动
    $("#checkli li").mouseover(function(e){	
    	$(this).addClass("cursor").siblings().removeClass("cursor");
        var index = $(this).index();
        var outwidth = $(".jnBrandContent").outerWidth();
        moveImg(index,outwidth);
    }).eq(0).mouseover();
});

function moveImg(index,outwidth){
	$(".jnBrandList").stop(true,false).animate({left:-(index)*outwidth},"fast");	
}
function addEventLoad(func){
	var oldonload = window.onload;
	if(typeof window.onload != "function"){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}
var EventUtil = {
	addHander: function(element,type,hander){
		if(element.addEventListener){
			element.addEventListener(type,hander,false);
		}else if(element.attachEvent){
			element.attachEvent('on' + type,hander);
		}else{
			element['on' + type].hander;
		}
	}
}
hander = function(){
	var TOTOP = document.getElementById('totop');
	var CH = document.documentElement.clientHeight;
	var timer = 0;
	var scrollTop;
	window.onscroll = function(){
		scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollTop >= CH){ TOTOP.style.display = 'block';}else{ TOTOP.style.display = 'none';}
		return scrollTop;
	}
	TOTOP.onclick = function(){
		clearInterval(timer);
		timer = setInterval(function(){
			if(scrollTop == 0){
				clearInterval(timer);
			}
			document.documentElement.scrollTop = scrollTop - scrollTop/10;
			document.body.scrollTop = scrollTop - scrollTop/10;
		},10);	
	}
}
addEventLoad(EventUtil.addHander(window,'load',hander));










