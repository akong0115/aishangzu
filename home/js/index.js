'use strict';

window.onload = function (e) {
    // 兼容ie10以下对requestAnimation
    window.requestAnimationFrame = window.requestAnimationFrame || function (fn) {
        return setTimeout(fn, 1000 / 60);
    };
    window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
    //兼容bind函数
    if (!Function.prototype.bind) {
        Function.prototype.bind = function () {
            if (typeof this !== 'function') {
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }
            var _this = this;
            var obj = arguments[0];
            var ags = Array.prototype.slice.call(arguments, 1);
            return function () {
                _this.apply(obj, ags);
            };
        };
    }

    //兼容addEventListener函数
    function addEventListener(ele, event, fn) {
        if (ele.addEventListener) {
            ele.addEventListener(event, fn, false);
        } else {
            ele.attachEvent('on' + event, fn.bind(ele));
        }
    }

    //兼容removeEventListener函数
    function removeEventListener(ele, event, fn) {
        if (ele.removeEventListener) {
            ele.removeEventListener(event, fn, false);
        } else {
            ele.detachEvent('on' + event, fn.bind(ele));
        }
    }
    // 点击body收回下拉列表
    document.body.onclick = function (e) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        document.getElementById('city-select').className = 'drop-select';
        document.getElementById('drop-down-select').children[1].className = "iconfont icon-arrow-down";
        document.getElementById('area-select').className = 'drop-select search-drop-select';
    };
    // 城市选择
    document.getElementById('drop-down-select').onclick = function (event) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        if (this.children[1].className === "iconfont icon-arrow-down") {
            this.children[1].className = "iconfont icon-arrow-up";
            document.getElementById('city-select').className = 'show drop-select';
            for (var i = 0; i < 4; i++) {
                document.getElementById('city-select').children[i].onclick = function (e) {
                    this.parentElement.parentElement.children[0].children[0].innerHTML = this.innerHTML;
                    for (var _i = 0; _i < this.parentElement.childNodes.length; _i++) {
                        // console.log(this.parentElement.children[_i].className);
                        this.parentElement.children[_i].className = '';
                    }
                    this.className = 'active-selected';
                };
            }
        } else {
            this.children[1].className = "iconfont icon-arrow-down";
            document.getElementById('city-select').className = 'drop-select';
        }
    };
    // lazyload

    // 搜索
    function areaSeltctShow(event) {
        var dropSelect = this.parentElement.children[1];
        var place = this.children[1];
        var input = this.children[0];
        input.focus();
        if (dropSelect.className === 'drop-select search-drop-select') {
            place.className = 'placeholder hide';
            dropSelect.className = 'drop-select search-drop-select show';
            var length;
            dropSelect.childElementCount ? length = dropSelect.childElementCount : length = dropSelect.childNodes.length;
            // console.log(length);

            for (var i = 0; i < length; i++) {
                dropSelect.children[i].onclick = function (e) {
                    for (var _i2 = 1; _i2 < length; _i2++) {
                        dropSelect.children[_i2].className = '';
                    }
                    this.className = 'active-selected';
                    input.value = this.innerHTML;
                    place.className = 'placeholder hide';
                };
            }
        } else {
            dropSelect.className = 'drop-select search-drop-select';
            if (input.value === '') {
                place.className = 'placeholder show';
            }
        }
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
    }
    document.getElementById('area-input-con').onclick = areaSeltctShow;
    document.getElementById('area-select').onmouseover = function (e) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        this.className = 'drop-select search-drop-select show';
    };
    document.getElementsByClassName('icon-location')[0].onclick = function () {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        document.getElementById('area-input').value = '杭州';
        document.getElementsByClassName('placeholder')[0].className = 'placeholder hide';
    };

    // 侧边栏
    document.getElementById('entrust').onmousemove = function (e) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        this.children[0].className = 'sidebar-show';
    };
    document.getElementById('entrust').onmouseout = function (e) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        this.children[0].className = 'sidebar-show hide';
    };
    document.getElementById('qr-code').onmouseover = function (e) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        this.children[0].className = 'sidebar-show  sidebar-qr';
    };
    document.getElementById('qr-code').onmouseout = function (e) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        this.children[0].className = 'sidebar-show hide  sidebar-qr';
    };
    // 滚动
    window.onscroll = throttle(20, windowOnScroll);
    // 防抖
    function throttle(delay, action) {
        var last = 0;
        return function () {
            var curr = +new Date()
            if (curr - last > delay) {
                action.apply(this, arguments)
                last = curr
            }
        }
    }

    function windowOnScroll() {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(t);
        if (t > 668) {
            document.getElementById('search').className = 'search search-fixed';
        } else {
            document.getElementById('search').className = 'search';
        }
        if (t > 150) {
            document.getElementById('up-to-head').className = 'trans-hide slow-show iconfont icon-arrow-up';
        } else {
            document.getElementById('up-to-head').className = 'iconfont icon-arrow-up trans-hide';
        }
        lazyLoad();
    }
    lazyLoad();
    // 获取相对于body的距离
    function getOffsetTopByBody(el) {
        let offsetTop = 0
        while (el && el.tagName !== 'BODY') {
            offsetTop += el.offsetTop
            el = el.offsetParent
        }
        return offsetTop
    }

    function lazyLoad() {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight = window.innerHeight; // 视窗高度
        var imgs = document.getElementsByClassName('lazyloadimg');
        for (var i = 0; i < imgs.length; i++) {
            var imgHeight = getOffsetTopByBody(imgs[i]);
            // console.log(imgs[i],imgHeight);
            if (imgHeight < windowHeight + t) {
                imgs[i].src = imgs[i].getAttribute(':data-src');
                imgs[i].className = imgs[i].className.replace('lazyloadimg', '');
                i--;
            }
        }
    }
    document.getElementById('up-to-head').onmouseover = function (e) {
        if (document.getElementById('up-to-head').className === 'trans-hide slow-show iconfont icon-arrow-up')
            // console.log(document.getElementById('up-to-head').style.visibility);
            document.getElementById('up-top-show').className = 'sidebar-show';
    };
    document.getElementById('up-to-head').onmouseout = function (e) {
        document.getElementById('up-top-show').className = 'sidebar-show hide';
    };

    document.getElementById('up-to-head').onclick = function (e) {
        // document.documentElement.scrollTop=0;
        var timer = null;
        window.cancelAnimationFrame(timer);
        timer = window.requestAnimationFrame(function fn() {
            var top = document.documentElement.scrollTop || document.documentElement.scrollTop;
            if (top > 0) {
                document.body.scrollTop = document.documentElement.scrollTop = top - 100;
                timer = window.requestAnimationFrame(fn);
            } else {
                window.cancelAnimationFrame(timer);
            }
        });
        document.getElementById('up-top-show').className = 'sidebar-show hide';
    };
    // 品牌按钮

    var _loop = function _loop(i) {
        document.getElementById('band-house-btns').children[i].onclick = function (e) {
            window.event ? window.event.cancelBubble = true : e.stopPropagation();

            for (var j = 1; j < 4; j++) {
                this.parentElement.children[j].className = 'band-house-btn';
            }
            this.className = 'band-house-btn active-btn';
            for (var _j = 1; _j < 4; _j++) {
                this.parentElement.parentElement.children[_j].className = 'band-house-show show-list display-none';
            }
            this.parentElement.parentElement.children[i].className = 'band-house-show show-list display-show';
            mySlide('slide-show' + i);
        };
    };

    for (var i = 1; i < 4; i++) {
        _loop(i);
    }
    //顶部轮播图
    var imgs = document.getElementById('carousel-img').children;
    var dots = document.getElementById('img-dot').children;

    document.getElementById('top-prev-btn').onclick = function (e) {
        for (var i = 0; i < imgs.length; i++) {
            if (imgs[i].className === 'display-show') {
                if (i == 0) {
                    imgs[3].className = 'display-show';
                    imgs[i].className = 'display-none';
                    dots[3].className = 'iconfont active-dot icon-dot';
                    dots[i].className = 'iconfont icon-dot';
                    return false;
                } else {
                    imgs[i].className = 'display-none';
                    imgs[i - 1].className = 'display-show';
                    dots[i].className = 'iconfont  icon-dot';
                    dots[i - 1].className = 'iconfont active-dot icon-dot';
                    return false;
                }
            }
        }
    };
    document.getElementById('top-next-btn').onclick = function (e) {
        for (var i = 0; i < imgs.length; i++) {
            if (imgs[i].className === 'display-show') {
                if (i == 3) {
                    imgs[0].className = 'display-show';
                    imgs[i].className = 'display-none';
                    dots[0].className = 'iconfont active-dot icon-dot';
                    dots[3].className = 'iconfont icon-dot';
                    return false;
                } else {
                    imgs[i].className = 'display-none';
                    imgs[i + 1].className = 'display-show';
                    dots[i].className = 'iconfont icon-dot';
                    dots[i + 1].className = 'iconfont active-dot icon-dot';
                    return false;
                }
            }
        }
    };
    // 定时轮播图
    var carouselTimer = setTimeout(function fn() {
        for (var i = 0; i < imgs.length; i++) {
            if (imgs[i].className === 'display-show') {
                if (i == 3) {
                    imgs[0].className = 'display-show';
                    imgs[i].className = 'display-none';
                    dots[0].className = 'iconfont active-dot icon-dot';
                    dots[3].className = 'iconfont icon-dot';
                    setTimeout(fn, 5000);
                    return false;
                } else {
                    imgs[i].className = 'display-none';
                    imgs[i + 1].className = 'display-show';
                    dots[i].className = 'iconfont icon-dot';
                    dots[i + 1].className = 'iconfont active-dot icon-dot';
                    setTimeout(fn, 5000);
                    return false;
                }
            }
        }
    }, 5000);
    // 头部轮播点

    var _loop2 = function _loop2(i) {
        dots[i].onclick = function (e) {
            for (var j = 0; j < 4; j++) {
                imgs[j].className = 'display-none';
                dots[j].className = 'iconfont icon-dot';
            }
            window.event ? window.event.cancelBubble = true : e.stopPropagation();
            imgs[i].className = 'display-show';
            dots[i].className = 'iconfont active-dot icon-dot';
        };
    };

    for (var i = 0; i < dots.length; i++) {
        _loop2(i);
    }
    //页面轮播图
    //动画函数
    function animate(el, target) {
        if (el.timer) {
            clearTimeout(el.timer);
        }
        el.timer = setTimeout(function fn() {
            //leader = leader + step
            var leader = el.offsetLeft;
            var step = 30;
            if (target < leader) {
                step = -step;
            }
            //如果到达终点的距离已经小于一步了，就直接跨到终点。
            if (Math.abs(target - leader) >= Math.abs(step)) {
                leader = leader + step;
                el.style.left = leader + "px";
            } else {
                clearTimeout(el.timer);
                el.style.left = target + "px";
            }
            el.timer = setTimeout(fn, 15);
        }, 15);
    }

    function mySlide(id) {
        //1. 找对象
        var imgwidth = document.getElementById(id).offsetWidth;
        // console.log(imgwidth);
        var slideshow = document.getElementById(id);
        var box = slideshow.parentElement;
        var ul = slideshow.children[0];
        var ullis = ul.children;
        var ol = slideshow.children[1];
        var ollis = void 0;
        var arr = slideshow.children[2];
        var leftArr = arr.children[0];
        var rightArr = arr.children[1];
        var pic = 0;
        var timer = null;

        function init() {
            // ol.childElementCount == 0| ie8 没有
            if (ol.childElementCount == 0 || ol.childNodes.length == 0) {
                //2.2 创建假图片
                //2.2.1 克隆ul下的第一个li
                var cloneli = ullis[0].cloneNode(true);
                ul.appendChild(cloneli);
                ullis = ul.children;
            }
            ol.innerHTML = '';
            for (var i = 0; i < ullis.length - 1; i++) {
                var li = document.createElement("li");
                ol.appendChild(li);
                li.className = 'iconfont icon-dot';
            }
            ollis = ol.children;
            ollis[0].className = "iconfont active-dot icon-dot";

            //3. 简单轮播功能
            //3.1 给小方块注册点击事件
            for (var i = 0; i < ollis.length; i++) {
                ollis[i].index = i; //存索引
                addEventListener(ollis[i], "click", function () {
                    //3.2 小方块高亮排他
                    for (var i = 0; i < ollis.length; i++) {
                        ollis[i].className = "iconfont icon-dot";
                    }
                    this.className = "iconfont active-dot icon-dot";
                    //3.3. 移动ul
                    var target = -this.index * imgwidth;
                    animate(ul, target);
                    pic = this.index;
                });
            }
        };
        init();
        box.onmouseover = function () {
            arr.style.display = "block";
            //清除定时器
            clearTimeout(timer);
        };
        box.onmouseleave = function () {
            arr.style.display = "none";
            timer = setTimeout(function fn() {
                rightArr.onclick();
                timer = setTimeout(fn, 5000);
            }, 5000);
        };
        //4.3 点击右箭头
        rightArr.onclick = function () {
            //如果已经到了最后一张假图片，让ul瞬移到第一张真图片
            // console.log(ollis.length);
            if (pic === ollis.length) {
                ul.style.left = 0;
                pic = 0;
            }
            pic++; //记录出去的图片张数
            for (var i = 0; i < ollis.length; i++) {
                ollis[i].className = "iconfont icon-dot";
            }
            if (pic !== ollis.length) {
                ollis[pic].className = "iconfont active-dot icon-dot";
            } else {
                ollis[0].className = 'iconfont active-dot icon-dot';
            }
            var target = -pic * imgwidth;
            animate(ul, target);
        };
        //4.4 点击左箭头
        leftArr.onclick = function () {
            if (pic === 0) {
                ul.style.left = -(ullis.length - 1) * imgwidth + "px";
                pic = ullis.length - 1;
            }
            pic--;
            for (var i = 0; i < ollis.length; i++) {
                ollis[i].className = "iconfont icon-dot";
            }
            if (pic === -1) {
                ollis[ollis.length].className = 'iconfont active-dot icon-dot';
            } else {
                ollis[pic].className = "iconfont active-dot icon-dot";
            }
            var target = -pic * imgwidth;
            animate(ul, target);
        };

        timer = setTimeout(function fn() {
            rightArr.onclick();
            timer = setTimeout(fn, 5000);
        }, 5000);
    }
    mySlide('slide-show1');
    mySlide('slide-show4');
};