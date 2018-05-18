(function ($) {
    $.fn.slideBox = function (options) {
        //默认参数
        var defaults = {
            direction: 'left', //left,top
            duration: 0.6, //unit:seconds
            easing: 'swing', //swing,linear
            delay: 3, //unit:seconds
            startIndex: 0,
            hideClickBar: true,
            clickBarRadius: 5, //unit:px
            hideBottomBar: false
        };
        var settings = $.extend(defaults, options || {});
        //计算相关数据
        var wrapper = $(this),
            ul = wrapper.children('ul.items'),
            lis = ul.find('li'),
            firstPic = lis.first().find('img');
        var li_num = lis.size(),
            li_height = 0,
            li_width = 0;
        //初始化
        var init = function () {

            if (!wrapper.size()) return false;
            wrapper.data('over', 0);

            // console.log(typeof wrapper, wrapper);
            //获取图片宽高
            li_height = lis.first().height();
            li_width = lis.first().width();
            //设置容器宽高
            wrapper.css({ width: li_width + 'px', height: li_height + 'px' });
            lis.css({ width: li_width + 'px', height: li_height + 'px' }); //ADD.JENA.201207051027
            //加上假图片
            ul.append(ul.find('li:first').clone());
            li_num += 1;
            //设置左右滑动
            if (settings.direction == 'left') {
                ul.css('width', li_num * li_width + 'px');
            } else {
                ul.css('height', li_num * li_height + 'px');
            }
            //起始图片设置
            ul.find('li:eq(' + settings.startIndex + ')').addClass('active');
            //是否隐藏底部按钮
            if (!settings.hideBottomBar) { //ADD.JENA.201208090859
                var tips = $('<div class="tips"></div>').css('opacity', 0.6).appendTo(wrapper);
                var title = $('<div class="title"></div>').html(function () {
                    var active = ul.find('li.active').find('a'),
                        text = active.attr('title'),
                        href = active.attr('href');
                    return $('<a>').attr('href', href).text(text);
                }).appendTo(tips);
                var nums = $('<div class="nums"></div>').hide().appendTo(tips);
                lis.each(function (i, n) {
                    var a = $(n).find('a'),
                        text = a.attr('title'),
                        href = a.attr('href'),
                        css = '';
                    i == settings.startIndex && (css = 'active');
                    //按钮事件
                    $('<a>').attr('href', href).text(text).addClass(css).css('borderRadius', settings.clickBarRadius + 'px').mouseover(function () {
                        wrapper.data('over', 1);
                        $(this).addClass('active').siblings().removeClass('active');
                        ul.find('li:eq(' + $(this).index() + ')').addClass('active').siblings().removeClass('active');
                        start();
                    }).appendTo(nums);
                });
                //hover出现底部按钮
                if (settings.hideClickBar) { //ADD.JENA.201206300847
                    tips.hover(function () {
                        nums.animate({ top: '0px' }, 'fast');
                    }, function () {
                        nums.animate({ top: tips.height() + 'px' }, 'fast');
                    });
                    nums.show().delay(2000).animate({ top: tips.height() + 'px' }, 'fast');
                } else {
                    nums.show();
                }
            }

            lis.size() > 1 && start();
            // console.log(wrapper.data('over'), wrapper.data('timeid'));

        };
        //开始轮播
        var start = function () {
            var active = ul.find('li.active'),
                active_a = active.find('a');
            var index = active.index();
            // console.log(active_a);
            if (settings.direction == 'left') {
                offset = index * li_width * -1;
                param = { 'left': offset + 'px' };
            } else {
                offset = index * li_height * -1;
                param = { 'top': offset + 'px' };
            }

            wrapper.find('.nums').find('a:eq(' + index + ')').addClass('active').siblings().removeClass('active');
            wrapper.find('.title').find('a').attr('href', active_a.attr('href')).text(active_a.attr('title'));


            // stop可以避免动画的累积效果
            ul.stop().animate(param, settings.duration * 1000, settings.easing, function () { //calback
                active.removeClass('active');
                //最后一张图片了
                if (active.next().size() == 0) {
                    ul.css({ top: 0, left: 0 }).find('li:eq(1)').addClass('active');
                    wrapper.find('.nums').find('a:first').addClass('active').siblings().removeClass('active');
                } else {
                    active.next().addClass('active');
                }
                // console.log(wrapper.data('over'), wrapper.data('timeid'));
                //每一秒strat一次 timeid记录timer用来clear
                wrapper.data('over') == 0 && wrapper.data('timeid', window.setTimeout(start, settings.delay * 1000));
                // console.log(wrapper.data('over'), wrapper.data('timeid'));

            });
        };
        //停止轮播
        var stop = function () {
            window.clearTimeout(wrapper.data('timeid'));
        };
        //鼠标经过事件
        wrapper.hover(function () {
            wrapper.data('over', 1);
            stop();
        }, function () {
            wrapper.data('over', 0);
            start();
        });
        //首张图片加载完毕后执行初始化
        var imgLoader = new Image();
        imgLoader.onload = function () {
            imgLoader.onload = null;
            init();
        };
        imgLoader.src = firstPic.attr('src');
    };
})(jQuery);