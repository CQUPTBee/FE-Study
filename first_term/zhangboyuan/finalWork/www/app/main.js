/**
 *  Created by boyuan on 8/29/16.
 */

define(['jquery', 'funcTpl', 'api/api.config', 'js.cookie', 'juicer'], function($, funtpl, API, Cookies) {
    var index = {
        init: function() {
            index.toptipsControl();
            index.loginControl();
            index.carousel();
            index.courseTabSwitch();
            index.pagination();
            index.getHottestCourse();
            index.getIntroVideo();
        },
        //顶栏"不再提示"功能
        toptipsControl: function() {
            // Cookies.remove('toptipDismissed', {path: '/'});  //测试用
            var $toptips = $('#J_top-tips');

            if (Cookies.get('toptipDismissed', { path: '/' }) !== 'true') {
                $toptips.fadeIn();
            }
            $('#J_top-tips-dismiss').on('click', function() {
                Cookies.set('toptipDismissed', 'true', { expires: 7, path: '/' });
                $toptips.fadeOut();
            });
        },

        //登录
        loginControl: function() {
            var $followBtn = $('#J_header-left-follow-btn'),
                $login = $('#J_popup-login'),
                $submit = $('#J_submit'),
                $popupWrap = $('#J_popup-wrap'),
                param = {
                    userName: '',
                    password: ''
                };

            //点击关注,如果未登录,则显示登录窗口
            $followBtn.on('click', function() {
                Cookies.remove('loginSuc', { path: '/' }); //测试用
                if (Cookies.get('loginSuc', { path: '/' }) !== 'true') {
                    $popupWrap.show();
                    $login.show().css('top', '+=30').animate({ top: '-=30px', opacity: '1' }, 500);
                }
            });

            //登录
            function login() {
                param.userName = $('#J_uid').val().trim();
                param.password = $('#J_pwd').val();
                if (param.userName && param.password) {
                    $submit.html('正在登录..').attr('disabled', 'true');
                    $.get(API.login, param, function(rsp) {
                        if (rsp == 0) {
                            Cookies.set('loginSuc', 'true', { path: '/' }); //设置登录成功 cookie,
                            $submit.html('登录成功');

                            //关注
                            var dtd = $.Deferred();
                            $.when(index._follow($followBtn, dtd)).done(function() {
                                $login.hide();
                                $popupWrap.hide();
                            });
                        } else {
                            alert('用户密码错误,请重新输入');
                            $submit.html('登录').removeAttr('disabled');
                        }
                    });
                }
            }

            //绑定登录
            $submit.on('click', login);
            document.onkeydown = function(keyEvent) {
                keyEvent = keyEvent ? keyEvent : window.event;
                var keyvalue = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
                if (keyvalue == 13)
                    login();
            };

            //登录窗口关闭
            $('#J_close-popup-login').on('click', function() {
                $popupWrap.hide();
                $login.hide();
            });
        },

        //关注
        _follow: function($followBtn, dtd) {
            var $fans_count = $('#J_fans');
            $.get(API.changeFollowState, function(rsp) {
                if (rsp == 1) {
                    Cookies.set('followSuc', 'true', { path: '/' }); //设置关注成功的 cookie(followSuc),
                    //关注”按钮变成不可点的“已关注”状态。
                    $followBtn.hide();
                    $followBtn.next().show();
                    var fans = $fans_count.html();
                    fans++;
                    $fans_count.html(fans);
                    dtd.resolve();
                }
            });
            return dtd;
        },

        //轮播
        carousel: function() {
            var $banner = $('#J_banner'),
                $imgs = $('.J_carousel-imgs'),
                $dots = $('#J_banner-dots span'),
                bindex = 1,
                timer = null;

            $banner.on('mouseover', function() {
                clearInterval(timer);
            });
            $banner.on('mouseout', function() {
                autoPlay();
            });
            $dots.on('click', function() {
                var _index = $(this).attr('data-id');
                _turnToBanner(_index);
            });

            function autoPlay() {
                timer = setInterval(function() {
                    _turnToBanner(bindex);
                    bindex++;
                    if (bindex > 2) {
                        bindex = 0;
                    }
                }, 5000);
            }

            function _turnToBanner(index) {
                $imgs.fadeOut();
                $imgs.eq(index).fadeIn();
                $dots.removeClass('on');
                $dots.eq(index).addClass('on');
            }

            autoPlay();
        },

        //课程tab切换
        courseTabSwitch: function() {
            var $btn1 = $('#J_course-selectTab a:first'),
                $btn2 = $btn1.next();

            $btn1.on('click', function() {
                var dtd = $.Deferred(); //新建异步对象dtd
                $.when(index._getCourseCard(0, 20, $btn1.attr('data-type'), dtd)).done(function() {
                    $btn2.removeClass('selected');
                    $btn1.addClass('selected');
                });
            });
            $btn2.on('click', function() {
                var dtd = $.Deferred(); //新建异步对象dtd
                $.when(index._getCourseCard(0, 20, $btn2.attr('data-type'), dtd)).done(function() {
                    $btn1.removeClass('selected');
                    $btn2.addClass('selected');
                });
            });

            $btn1.trigger('click');
        },

        /**
         * 获取课程卡片
         * @param pageNo    页码
         * @param psize     每页个数
         * @param type      分类
         * @param dtd       jquery异步对象
         */
        _getCourseCard: function(pageNo, psize, type, dtd) {
            if ($(window).width() < 1206) psize = 15;
            var param = {
                    pageNo: pageNo,
                    psize: psize,
                    type: type
                },
                $showWrap = $('#J_course-list');

            $showWrap.html('课程列表加载中...');
            $.get(API.getCoures, param, function(rsp) {
                var tpldata = {};

                rsp = JSON.parse(rsp);
                tpldata.list = rsp.list;
                $showWrap.html('');
                //坑：用functpl处理注释的模板代码在发布压缩代码时会出问题
                // var tpl = juicer(funtpl(index._courseTpl), tpldata);  
                var tpl = juicer($('#courseTpl').html(), tpldata);
                $showWrap.html(tpl);

                $('#J_paging-next').data('rsp', rsp); //缓存返回的数据
                // console.log($('#J_paging-next').data('rsp').pagination);
                dtd.resolve();
            });
            return dtd;
        },

        //分页
        pagination: function() {
            var $numBtn = $('.course-paging-num'),
                $next = $('#J_paging-next'),
                $prev = $('#J_paging-prev');

            $numBtn.on('click', function() {
                turnToPage($(this).html());
            });
            $next.on('click', function() {
                $('.course-paging-num.on').next().trigger('click');
            });
            $prev.on('click', function() {
                $('.course-paging-num.on').prev().trigger('click');
            });

            function turnToPage(_index) {
                var type = $('#J_course-selectTab a.selected').attr('data-type');

                var dtd = $.Deferred();
                $.when(index._getCourseCard(_index, 20, type, dtd)).done(function() {
                    $numBtn.removeClass('on');
                    $numBtn.eq(_index - 1).addClass('on');
                });
            }

        },

        //侧栏
        getHottestCourse: function() {
            $.get(API.getHotcoures, function(rsp) {
                var tpldata = {},
                    $showWrap = $('#juicer-hottest-wrapper');

                rsp = JSON.parse(rsp);
                tpldata.list = rsp;
                $showWrap.html('');
                // var tpl = juicer(funtpl(index._sidebarTpl), tpldata);
                var tpl = juicer($('#sidebarTpl').html(), tpldata);
                $showWrap.html(tpl);

                //循环轮播
                var originTop = $showWrap.offset().top,
                    offsetTop = originTop;

                var timer = setInterval(function() {
                    $showWrap.animate({ top: '-=71px' }, 500);
                    offsetTop = offsetTop - 71;

                    if (originTop - offsetTop > 639) {
                        $showWrap.animate({ top: 0 }, 1500);
                        offsetTop = originTop;
                    }


                }, 5000);


                $showWrap.on('mouseover', function() {
                    clearInterval(timer);
                });
                $showWrap.on('mouseout', function() {
                    timer = setInterval(function() {
                        $showWrap.animate({ top: '-=71px' }, 500);
                        offsetTop = offsetTop - 71;

                        if (originTop - offsetTop > 639) {
                            $showWrap.animate({ top: 0 }, 1500);
                            offsetTop = originTop;
                        }
                    }, 5000);
                });
            });
        },

        //视频
        getIntroVideo: function() {
            var $preview = $('#J_sidebar-org-video'),
                $popupVideo = $('#J_popup-video'),
                $video = $popupVideo.find('video'),
                $popupWrap = $('#J_popup-wrap');

            $preview.on('click', function() {
                $popupVideo.fadeIn(1000);
                $video.attr('src', 'http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4');
                $popupWrap.show();

            });

            $('#J_close-popup-video').on('click', function() {
                $video.attr('src', '');
                $popupVideo.hide();
                $popupWrap.hide();
            });
        }

        // //课程模板
        // _courseTpl: function() {
            
        //      {@each list as item}
        //      <section class="course-list-item">
        //      <img src="${item.middlePhotoUrl}" alt="" width="223" height="124">
        //      <h2 class="course-list-item-title">${item.name}</h2>
        //      <a href="" class="course-list-item-author">极客公园</a>
        //      <span class="course-list-item-people">465</span>
        //      <h3 class="course-list-item-price">¥59</h3>
        //      <!--详情-->
        //      <section class="course-list-item-details">
        //      <div class="course-list-item-details-header">
        //      <img src="${item.middlePhotoUrl}" alt="" width="223" height="124">
        //      <div class="course-list-item-details-header-info">
        //      <h3 class="course-list-item-details-header-info-title">${item.name}</h3>
        //      <div class="course-list-item-details-header-info-leaner">
        //      ${item.learnerCount} 人在学
        //      </div>
        //      <div class="course-list-item-details-header-info-distor">
        //      发布者: <a href="${item.providerLink}" target="_blank">${item.provider}</a>
        //      </div>
        //      {@if item.categoryName == null}
        //         <div class="course-list-item-details-header-info-category">分类: 暂无</div> 
        //      {@else}
        //         <div class="course-list-item-details-header-info-category">分类: ${item.item.categoryName}</div> 
        //      {@/if}
        //      </div>
        //      </div>
        //      <div class="course-list-item-details-content">
        //      <p>${item.providerDesc}</p>
        //      </div>
        //      </section>
        //      </section>
        //      {@/each}
             
        // },

        // //侧边栏内容模板
        // _sidebarTpl: function() {
            
        //      {@each list as item}
        //      <div class="sidebar-hottest-item">
        //      <img src="${item.smallPhotoUrl}" alt="${item.name}">
        //      <h3>${item.name}</h3>
        //      <span>${item.learnerCount}</span>
        //      </div>
        //      {@/each}
             
        // }
    };

    index.init();
});
