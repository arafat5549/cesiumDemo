! function(a) {
    "use strict";

    function b(b, d) {
        this.$el = a(b), this.opt = a.extend(!0, {}, c, d), this.init(this)
    }
    var c = {};
    b.prototype = {
        init: function(a) {
            a.initDropdown(a)
        },
        initToggle: function(b) {
            a('#sidenav-toggle').on("click", function(c) {
                var d = a(c.target);
                d.closest(b.$el.data("sidenav-toggle"))[0] ? (b.$el.toggleClass("show"), a("body").toggleClass("sidenav-no-scroll")) : d.closest(b.$el)[0] || (b.$el.removeClass("show"), a("body").removeClass("sidenav-no-scroll"))
            })
        },
        initDropdown: function(b) {
            b.$el.on("click", "[data-sidenav-dropdown-toggle]", function(b) {
                var c = a(this);
                c.next("[data-sidenav-dropdown]").slideToggle("fast"), c.find("[data-sidenav-dropdown-icon]").toggleClass("show"), b.preventDefault()
            })
        }
        
    }, a.fn.sidenav = function(c) {
        return this.each(function() {
            a.data(this, "sidenav") || a.data(this, "sidenav", new b(this, c))
        })
    }
}(window.jQuery);
  // Hamburger button

      $('.toggle-button').on('click', function() {
        $(this).toggleClass('button-open');
        $('.menu-wrap').toggleClass('menu-show');
      });


  // Hamburger button

    $('.right-button').on('click', function() {
        // $(this).toggleClass('right-button-open');
        $('.data-table .tab-bd').slideToggle();
        $('.data-table').toggleClass('nav-show');

    });


    $('.tab-hd').on('click','li',function(){

    	var index = $(this).index();
        $(this).addClass('current').siblings('li').removeClass('current');
        $('.tab-bd .tab-con').eq(index).show().siblings('.tab-con').hide()


    })



    $('.cesium-navigation-help-button').click(function(){
        $('.right-button').trigger('click')
    })

    function mapCamera () {
        $.ajax({
            url: 'http://riversm.huntingspeed.com/mapcamera',
            type: 'get', //GET
            async: false, //或false,是否异步
            timeout: 15000, //超时时间
            dataType: 'json',
            success: function(data) {
                var message = data.message;
                var tableHtml ='<div class="tab-con mapCamera-box" style="display:none; height:600px;">'+ 
                    '<div class="hd"><input type="text" class="keywords"  placeholder="关键字" /> <a href="javascript:;" class="icon-search search-btn" > </a></div>\
                    <div class="bd" >\
                    <table class="table-list camera-list" cellpadding="0" cellspacing="0">\
                        <tbody>\
                            <tr>\
                                <td>序号</td><td>名称</td><td>地址</td><td>行政区域</td><td>管理单位 </td><td>定位</td>\
                            </tr>';
                if(data.code == 1000) {
                    $.each(message, function(index , val){
                        tableHtml +='<tr ><td>'+(index+1)+'</td><td>'+val.name+'</td><td>'+val.address+'</td><td>'+val.river+' </td><td>'+val.organization+' </td><td><img src="../Source/Images/biao.png" style="    vertical-align: -5px;width: 51%;"/></td>\</tr>' 
                    })
                }   

                tableHtml +='</tbody>'+
                    '</table>'+
                    '</div>'+  
                '</div>';
                $('.tab-bd').append(tableHtml)
            }

        })

    }


    function gridMenber(){
        $.ajax({
            url: 'http://riversm.huntingspeed.com/gridmember',
            type: 'get', //GET
            async: false, //或false,是否异步
            timeout: 15000, //超时时间
            dataType: 'json',
            success: function(data) {
                var message = data.message;
                var tableHtml ='<div class="tab-con gridmenber-box" style="display:none;height:600px;">'+ 
                    '<div class="hd"><div class="search-box"><input type="text" class="keyword"  placeholder="关键字" /> <a class="button_pic  search-btn1"><i class="material-icons">search</i></a><a class="refresh-btn" href="javascript:;"><i class="material-icons refresh">refresh</i></a></div>'+
                    '</div>'+
                    '<div class="bd" data-sidenav >'+
                    '<ul class="managestatus" id="manageStatus">'+
                    '<li>乡镇河长办：14/14  </li><li>乡镇河长办：14/14  </li>'+
                    '<li><i class="material-icons online">lens</i><span>在线: 128/369</span></li> '+
                    '<li><i class="material-icons sign">lens</i> <span>签到: 81</span></li></ul><div class="sidenav-menu-box" style="max-height: 800px; min-height: 500px;">';
                    
                if(data.code == 1000) {
                    $.each(message, function(index , val){
                    	tableHtml+=' <ul class="sidenav-menu" id="membergrid" >\
                            <li><a href="javascript:;" data-sidenav-dropdown-toggle class="active"> \
                                <span class="sidenav-dropdown-icon show" data-sidenav-dropdown-icon>\
                                    <i class="material-icons">arrow_right</i></span>\
                                    <span class="sidenav-dropdown-icon " data-sidenav-dropdown-icon>\
                                    <i class="material-icons">arrow_drop_down</i> </span>\
                                    <span class="sidenav-link-title">'+val.name+'</span>'+      
                                '</a>'+
                                '<ul class="sidenav-dropdown" data-sidenav-dropdown>'+
                                	'<li> <a href="javascript:;" data-sidenav-dropdown-toggle class="active">'+  
                                            '<span class="sidenav-dropdown-icon show" data-sidenav-dropdown-icon>'+  
                                                '<i class="material-icons">arrow_right</i>'+
                                            '</span>'+
                                            '<span class="sidenav-dropdown-icon " data-sidenav-dropdown-icon>'+
                                                '<i class="material-icons">arrow_drop_down</i>'+
                                            '</span>'+
                                            '<span class="sidenav-link-title">河长</span>'+
                                        '</a>'+
                                        '<ul class="sidenav-dropdown sidenav-dropdown-level3" data-sidenav-dropdown>';
	                                $.each(val.hz, function(hzindex, hzval){
	                                	tableHtml+='<li><a href="javascript:;"><img src="../Source/Images/biao.png" /><span class="name-box">'+hzval.name+'</span>';
	                                		if(hzval.IsOnline) {
	                                			tableHtml+='<i class="material-icons online">lens</i>';
	                                		} else {
	                                			tableHtml+='<i class="material-icons online"></i>';
	                                		}
	                                		if(hzval.ischeck== 1) {
	                                			tableHtml+= '<i class="material-icons done">lens</i>';
	                                		} else if(hzval.docheck== 2){
	                                		 	tableHtml+= '<i class="material-icons doing">lens</i>';
	                                		} else {
												tableHtml+= '<i class="material-icons doing"></i>';
	                                		}
	                                		if (hzval.issign == 1) {
								              	tableHtml+= '<i class="material-icons sign">lens</i>';
								            } else {
								            	tableHtml+= '<i class="material-icons sign"></i>';
								            }
	                                    tableHtml+='</a></li>';
	                                });
                               
                                    tableHtml+='</ul>'+
                                    '</li>'+
                                		'<li> <a href="javascript:;" data-sidenav-dropdown-toggle class="active">'+  
                                            '<span class="sidenav-dropdown-icon show" data-sidenav-dropdown-icon>'+  
                                                '<i class="material-icons">arrow_right</i>'+
                                            '</span>'+
                                            '<span class="sidenav-dropdown-icon " data-sidenav-dropdown-icon>'+
                                                '<i class="material-icons">arrow_drop_down</i>'+
                                            '</span>'+
                                            '<span class="sidenav-link-title">河长办</span>'+
                                        '</a>'+
                                        '<ul class="sidenav-dropdown sidenav-dropdown-level3" data-sidenav-dropdown>';
 									$.each(val.hzb, function(hzbindex, hzbval){
	                                	tableHtml+='<li><a href="javascript:;"><img src="../Source/Images/biao.png" /><span class="name-box">'+hzbval.name+'</span>';
		                                        if(hzbval.IsOnline) {
		                                			tableHtml+='<i class="material-icons online">lens</i>';
		                                		} else {
		                                			tableHtml+='<i class="material-icons online"></i>';
		                                		}
		                                		if(hzbval.ischeck== 1) {
		                                			tableHtml+= '<i class="material-icons done">lens</i>';
		                                		} else if(hzbval.docheck== 2){
		                                		 	tableHtml+= '<i class="material-icons doing">lens</i>';
		                                		} else {
													tableHtml+= '<i class="material-icons doing"></i>';
		                                		}
		                                		if (hzbval.issign == 1) {
									              	tableHtml+= '<i class="material-icons sign">lens</i>';
									            } else {
									            	tableHtml+= '<i class="material-icons sign"></i>';
									            }
	                                    tableHtml+= '</a></li>';
	                                });

	                                tableHtml+='</ul>'+
                                    '</li>'+
                                		'<li> <a href="javascript:;" data-sidenav-dropdown-toggle class="active">'+  
                                            '<span class="sidenav-dropdown-icon show" data-sidenav-dropdown-icon>'+  
                                                '<i class="material-icons">arrow_right</i>'+
                                            '</span>'+
                                            '<span class="sidenav-dropdown-icon " data-sidenav-dropdown-icon>'+
                                                '<i class="material-icons">arrow_drop_down</i>'+
                                            '</span>'+
                                            '<span class="sidenav-link-title">专管员</span>'+
                                        '</a>'+
                                        '<ul class="sidenav-dropdown sidenav-dropdown-level3" data-sidenav-dropdown>';
 									$.each(val.zhy, function(zhyindex, zhyval){
	                                	tableHtml+='<li><a href="javascript:;"><img src="../Source/Images/biao.png" /><span class="name-box">'+zhyval.name+'</span>';
                                            if(zhyval.IsOnline) {
	                                			tableHtml+='<i class="material-icons online">lens</i>';
	                                		} else {
	                                			tableHtml+='<i class="material-icons online"></i>';
	                                		}
	                                		if(zhyval.ischeck== 1) {
	                                			tableHtml+= '<i class="material-icons done">lens</i>';
	                                		} else if(zhyval.docheck== 2){
	                                		 	tableHtml+= '<i class="material-icons doing">lens</i>';
	                                		} else {
												tableHtml+= '<i class="material-icons doing"></i>';
	                                		}
	                                		if (zhyval.issign == 1) {
								              	tableHtml+= '<i class="material-icons sign">lens</i>';
								            } else {
								            	tableHtml+= '<i class="material-icons sign"></i>';
								            }
	                                    tableHtml+= '</a></li>';
	                                });
 								tableHtml+='</ul>'+
                                    '</li>'+
                                '</ul>'+
                            '</li>'+                
                        '</ul>';
                    })
                }   
                tableHtml +='</div>'+  
                '</div>';


                $('.tab-bd').append(tableHtml)
            }

        })
    }

   	function riverInfo(){
   		$.ajax({
            url: 'http://riversm.huntingspeed.com/rivers?type=1',
            type: 'get', //GET
            async: false, //或false,是否异步
            timeout: 15000, //超时时间
            dataType: 'json',
            success: function(data) {
                var message = data.message;
                var tableHtml ='<div class="tab-con riverinfo-box" style="height:600px;" >'+ 
                    '<div class="hd"><input type="text" class="keywords"  placeholder="关键字" /> <a href="javascript:;" class="icon-search search-btn" > </a></div>\
                    <div class="bd" >\
                    <table class="table-list camera-list" cellpadding="0" cellspacing="0">\
                        <tbody>\
                            <tr>\
                                <td>序号</td><td>名称</td><td>专管员 </td><td>行政区划</td>\
                            </tr>';
                if(data.code == 1000) {
                    $.each(message, function(index , val){
                        tableHtml +='<tr ><td>'+val.id+'</td><td>'+val.name.substr(0,3)+'</td><td>'+val.member+' </td><td>'+(val.responsible?val.responsible.substr(0,3) :'无 ')+'</td>\</tr>' 
                    })
                }   

                tableHtml +='</tbody>'+
                    '</table>'+
                    '</div>'+  
                '</div>';
                $('.tab-bd').append(tableHtml)
            }

        })



   }
   riverInfo()


	$('.workinfo').click(function(){
		if($(this).is(":checked") ) {
			
			$('.menu-list ').append(' <li class="workinfo-li"><i class="icon-current"></i>工作情况</li>')
			gridMenber();
			$('[data-sidenav]').sidenav();
		} else {
			
			$('.menu-list .workinfo-li').remove()
			$('.gridmenber-box').remove()
		}


	})

	$('.camerabtn').click(function(){
		if($(this).is(":checked") ) {
			$('.menu-list ').append(' <li class="camera-li"><i class="icon-current"></i>视频监控</li>')
			mapCamera();
			
		}else{
			$('.menu-list .camera-li').remove()
			$('.mapCamera-box').remove()
		}


	})


	$('.riverinfo-btn').click(function(){
		if($(this).is(":checked") ) {
			$('.menu-list ').append(' <li class="river-li"><i class="icon-current"></i>河流信息</li>')
			riverInfo();
			
		}else{
			$('.menu-list .river-li').remove()
			$('.riverinfo-box').remove()
		}


	})

	$('.info-list label').click(function() {
		if($('.menu-list li').length == 0) {
			$('.data-table').hide()
		}  else if($('.menu-list li').length > 3){
			$('.menu-list li').width(100/$('.menu-list li').length-5 +'%')
		} else {
			$('.data-table').show();
			$('.menu-list li').trigger('click')
		}
	})

$('[data-sidenav]').sidenav();


function eventcount() {
	$.ajax({
        url: 'http://riversm.huntingspeed.com/eventcount ',
        type: 'get', //GET
        async: false, //或false,是否异步
        timeout: 15000, //超时时间
        dataType: 'json',
        success: function(data) {
            var message = data.message;
            var tableHtml ='<div class="tab-con eventcount-box" style="display:none;height:600px;" >'+ 
                '<div class="hd"> <span class="title1">时间选择：</span><input type="text" class="data-qj"  placeholder="关键字" /> <a href="javascript:;" class="icon-search search-btn" > </a></div>\
                <div class="bd" ><p class="title2"><img src="../Source/Images/icon-loc.png" /> 三明市</p>\
                <ul class="gkinfo-list"  >';
            if(data.code == 1000) {
                $.each(message, function(index , val){
                    tableHtml +='<li ><a href="javascript:;">'+val.name+'</a></li>' ;
                })
            }
            tableHtml +='</ul>'+
            		'<table  class="table-list event-table" cellpadding="0" cellspacing="0">'+
            		'<tr><td>概况列表</td><td style="width:166px">统计数据</td></tr>';
            	$.each(message, function(index , val){
            		if(val.rownum == 1) {
            			tableHtml +='<tr><td>待处理事件</td><td ><span class="event-num">'+val.undoevents+'</span></td></tr>'+
            			'<tr><td>已处理事件</td><td><span class="event-num">'+val.doevents+'</span></td></tr>\
            			<tr><td>事件累计</td><td><span class="event-num">'+val.allevents+'</span></td></tr>\
            			<tr><td>正在巡查任务</td><td><span class="event-num">'+val.doingchecks+'</span></td></tr>\
            			<tr><td>已完成巡查任务 </td><td><span class="event-num">'+val.dochecks+'</span></td></tr>\
            			<tr><td>任务累计</td><td><span class="event-num">'+val.allchecks+'</span></td></tr>';	
            		}
            		console.log(val)
                })
            tableHtml +='</table>'
                '</div>'+  
            '</div>';
            $('.tab-bd').append(tableHtml);

            $('.gkinfo-list li').eq(0).addClass('current')
        }
    })
}



function showEvent(name){
	$.ajax({
        url: 'http://riversm.huntingspeed.com/eventcount ',
        type: 'get', //GET
        async: false, //或false,是否异步
        timeout: 15000, //超时时间
        dataType: 'json',
        success: function(data) {
        	var tableHtml  = '';
            var message = data.message;
             if(data.code == 1000) {
                $.each(message, function(index , val){
                  if(val.name == name ) {
                  	tableHtml +='<tr><td>概况列表</td><td style="width:166px">统计数据</td></tr>';
            			tableHtml +='<tr><td>待处理事件</td><td ><span class="event-num">'+val.undoevents+'</span></td></tr>'+
            			'<tr><td>已处理事件</td><td><span class="event-num">'+val.doevents+'</span></td></tr>\
            			<tr><td>事件累计</td><td><span class="event-num">'+val.allevents+'</span></td></tr>\
            			<tr><td>正在巡查任务</td><td><span class="event-num">'+val.doingchecks+'</span></td></tr>\
            			<tr><td>已完成巡查任务 </td><td><span class="event-num">'+val.dochecks+'</span></td></tr>\
            			<tr><td>任务累计</td><td><span class="event-num">'+val.allchecks+'</span></td></tr>';	
                  }
                })
                $('.event-table').html(tableHtml)
            }

        }


       })


}


$('.gkinfo').click(function(){
	if($(this).is(":checked") ) {
		$('.menu-list').append(' <li class="gkinfo-li"><i class="icon-current"></i>概况信息</li>')
		eventcount()
	}else{
		$('.menu-list .gkinfo-li').remove()
		$('.eventcount-box').remove()
	}


})


$('.data-table').on('click', '.gkinfo-list a', function(){
	$(this).parents('li').addClass('current').siblings('li').removeClass('current');
	var name = $(this).text()
	showEvent(name)


})