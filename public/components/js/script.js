/*global log:false*/// Tell IE9 to use its built-in console
Function.prototype.bind&&(typeof console=="object"||typeof console=="function")&&typeof console.log=="object"&&["log","info","warn","error","assert","dir","clear","profile","profileEnd"].forEach(function(method){console[method]=this.call(console[method],console)},Function.prototype.bind);window.log||(window.log=function(){var ua,winRegexp,script,i,args=arguments,isReallyIE8=!1,isReallyIE8Plus=!1;log.history=log.history||[];log.history.push(arguments);if(log.detailPrint&&log.needDetailPrint){ua=navigator.userAgent;winRegexp=/Windows\sNT\s(\d+\.\d+)/;console&&console.log&&/MSIE\s(\d+)/.test(ua)&&winRegexp.test(ua)&&parseFloat(winRegexp.exec(ua)[1])>=6.1&&(isReallyIE8Plus=!0)}if(isReallyIE8Plus||typeof console!="undefined"&&typeof console.log=="function")if(log.detailPrint&&log.needDetailPrint&&log.needDetailPrint()){console.log("-----------------");args=log.detailPrint(args);i=0;while(i<args.length){console.log(args[i]);i++}}else Array.prototype.slice.call(args).length===1&&typeof Array.prototype.slice.call(args)[0]=="string"?console.log(Array.prototype.slice.call(args).toString()):console.log(Array.prototype.slice.call(args));else if(!Function.prototype.bind&&typeof console!="undefined"&&typeof console.log=="object")if(log.detailPrint){Function.prototype.call.call(console.log,console,Array.prototype.slice.call(["-----------------"]));args=log.detailPrint(args);i=0;while(i<args.length){Function.prototype.call.call(console.log,console,Array.prototype.slice.call([args[i]]));i++}}else Function.prototype.call.call(console.log,console,Array.prototype.slice.call(args));else if(!document.getElementById("firebug-lite")){script=document.createElement("script");script.type="text/javascript";script.id="firebug-lite";script.src="https://getfirebug.com/firebug-lite.js";document.getElementsByTagName("HEAD")[0].appendChild(script);setTimeout(function(){window.log.apply(window,args)},2e3)}else setTimeout(function(){window.log.apply(window,args)},500)});

/*********************************
Date: 02/09/2014
Developer: Gabriel Ferraz
Company: Purple Rock Scissors
Project: Florida Hospital
**********************************/

$(document).ready(function(){

	// initialize polyfills for all unsupported features in legacy browsers: IE6, IE7, and IE8
	webshim.polyfill();

	//get window width onload and on resize
	var windowWidth = $(window).width();

	$(window).on("resize", function() { 
		if($(window).width()<=480){
			windowWidth = $(window).width();
		}
	});

	/*=======RESIZE HEIGHT OF INNER CONTAINERS OF SECTION IDEAS (display table-cell didn't work on absulute positioned divs); ALL CONTAINERS WILL HAVE THE HEIGHT OF THE TALLER ONE AMONG THE 3=======*/
	//get the three objects

	var cellOne = $('.grid_content:first div');
	var cellTwo = $('.grid_content:nth-child(2) div');
	var cellThree = $('.grid_content:nth-child(3) div');

	var cellOneHeight = $('.grid_content:first div').height();
	var cellTwoHeight = $('.grid_content:nth-child(2) div').height();
	var cellThreeHeight = $('.grid_content:nth-child(3) div').height();

	//compare heights and assign the size of the taller to the other 2 divs--triggers on page ready
	if($(window).width()>=768){
		if(cellOne>=cellTwo && cellOne>=cellThree){
			cellTwo.height(cellOneHeight);
			cellThree.height(cellOneHeight);
		}
		else if(cellTwo>=cellOne && cellTwo>=cellThree){
			cellOne.height(cellTwoHeight);
			cellThree.height(cellTwoHeight);
		}
		else if (cellThree>=cellOne && cellThree>=cellTwo){
			cellTwo.height(cellThreeHeight);
			cellTwo.height(cellThreeHeight);
		}
	}
	
	//apply the taller height to shorter divs on resize
	$(window).on("resize", function() {
		if($(window).width()>=768){
			//get heights
			cellOneHeight = $('.grid_content:first div').height();
			cellTwoHeight = $('.grid_content:nth-child(2) div').height();
			cellThreeHeight = $('.grid_content:nth-child(3) div').height();
			
			//compare heights and assign the taller to all
			if(cellOneHeight>=cellTwoHeight && cellOneHeight>=cellThreeHeight){
				cellTwo.height(cellOneHeight);
				cellThree.height(cellOneHeight);
				console.log('in the first if');
			}
			else if(cellTwoHeight>=cellOneHeight && cellTwoHeight>=cellThreeHeight){
				cellOne.height(cellTwoHeight);
				cellThree.height(cellTwoHeight);
			}
			else if (cellThreeHeight>=cellOneHeight && cellThreeHeight>=cellTwoHeight){
				cellOne.height(cellThreeHeight);
				cellTwo.height(cellThreeHeight);
			}
		}
		//set the height back to original when width<=768; this makes the padding bottom = 35px (given to the button), and makes the layout consistent (padding bottom 35px, border-bottom, article's margin bottom 35px; 70px total separating two articles; border in the middle)
		else if($(window).width()<768){
			// cellOne.height(cellOneHeight-50);
			// cellTwo.height(cellTwoHeight-50);
			// cellThree.height(cellThreeHeight-50);

			// console.log('less than 768');

			// cellOne.height(cellOneHeight_mq);
			// cellTwo.height(cellTwoHeight_mq);
			// cellThree.height(cellThreeHeight_mq);
			console.log(cellOne.height());
		}
	});

//=======change li.learn_more width on screen resize, change chevrons color when moving from <480 up, apply margin-left 0 to physicians div when moving from <480 up--this puts the div in its initial state, allowing users to click the right arrow=======
$(window).on("resize", function() {
	if($(window).width()>320){
		windowWidth = $(window).width();
		$('div.physicians').animate({marginLeft:0}, 10, 'swing');
		$('li.learn_more').css('width', '66.66%');
		$('li.learn_more div p').css({'paddingTop': '20%', 'padding-left': '20px'});
		$('.physicians_left').css('background', 'rgba(157, 157, 157, 0.7)');
		$('.physicians_right').css('background', '#e3e3e3');

		if($(window).width()>768){
			$('li.learn_more').css('width', '40%');
		}
	}
	else if($(window).width()<=320){
		$('li.learn_more div p').css('paddingTop', '20%');
		console.log('in the if');
	}

});

/*=======FUNCTIONALITIES: MENU, RESIZE DIV, SLIDE PHYSICIANS' DIV ON MOBILE, TABBED MENU, VIDEO=======*/
	var app = {
		openCloseMenu : function(translate) {
			translate = typeof(translate) != 'undefined' ? $('aside').css({'transform':'translate(0, 0)'}) : $('aside').css({'transform':'translate(100%, 0)'});
		}, 
		slidePhysicians : function(){
			$('.slide_physicians').each(function(){
				$(this).on('click', function(){
					var direction = $(this).data('direction');
					if(direction === "right")
					{
						$('div.physicians').animate({marginLeft:-windowWidth}, 500, 'swing');
						// console.log('windowWidth: ',  windowWidth);
						$('.physicians_left').css('background', '#e3e3e3');
						$('.physicians_right').css('background', 'rgba(157, 157, 157, 0.7)');
						$('li.learn_more').css('width', '75%');
						$('li.learn_more div p').css({'paddingTop': '15%', 'padding-left': '33%', 'width': '75%'});
					}
					else if(direction === "left")
					{
						$('div.physicians').animate({marginLeft:0}, 500, 'swing');
						$('.physicians_left').css('background', 'rgba(157, 157, 157, 0.7)');
						$('.physicians_right').css('background', '#e3e3e3');
						// $('li.learn_more div p').css({'paddingTop': '20%', 'padding-left': '10px'});
						if( $(window).width()>320 && $(window).width()<=480){
							$('li.learn_more').animate({'width': '25%'}, 500, function(){
								$('li.learn_more div p').css({'padding': '40% 0 0', 'margin':'0 auto'})
							}); 
						}
						else if($(window).width()<=320){
							$('li.learn_more').animate({'width': '25%'}, 500, function(){
								$('li.learn_more div p').css({'padding': '20% 0 0', 'margin':'0 auto'})
							});
						}
					}
				});
			});
		}
		,
		liHeight : function(){
			var img_height = $('.physicians_image.height').height();
			$('.learn_more_text').css('minHeight',img_height);
			$(window).on("resize", function() {
		       img_height = $('.physicians_image.height').css("height");
		       $('.learn_more_text').css('minHeight',img_height);
		    });
		},
		tabbedMenu : function(){
			$(".tabs_menu a").on('click',function(e) {
			    e.preventDefault();
			    $(this).parent().addClass("current");
			    $(this).parent().siblings().removeClass("current");
			    var tab = $(this).attr("href");
			    $(".tab_content").not(tab).css("display", "none");
			    $(tab).fadeIn(200);
			 });
		},
		pauseTime : 0,
		video : function(){
			$('#video')[0].currentTime = app.pauseTime;
			console.log('app.pauseTime1: ', app.pauseTime);
			$('video').play();
			$('video').attr('controls', 'true');
			$('.play_button, .video_tag').fadeOut('fast');
		},
		videoPause : function(){
			$('video').on('ended pause', function(e) {
				app.pauseTime = $('#video')[0].currentTime;
				console.log('app.pauseTime2: ', app.pauseTime);
				$('.play_button, .video_tag').fadeIn('fast');
				$('video').removeAttr('controls');
				$('video').load();
			});
		}
	}//closes var app

/*=======CLICK EVENTS AND EVENT LISTENERS=======*/
	$('.open_menu').on('click',(function() {
		app.openCloseMenu(true);
	}));
	$('.close_menu').on('click',(function() {
		app.openCloseMenu();
	}));
	$('.play_button').on('click',(function() {
	     app.video();
	}))
	app.videoPause();// video pause event listener
	app.liHeight();// li resize event
	app.tabbedMenu();// tabbed menu functionality
	app.slidePhysicians();// physicians' images mobile slider click events

	/*=======CAROUSEL PLUGIN EVENT INIT=======*/
	$('.slider').carroussel();
	
});//closes $(document).ready

