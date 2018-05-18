'use strict';

window.onload = function (e) {
    // 兼容ie10以下对requestAnimation
    window.requestAnimationFrame = window.requestAnimationFrame || function (fn) { return setTimeout(fn, 1000 / 60) }
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
                    for (var _i = 0; _i < this.parentElement.childElementCount; _i++) {
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

    // 搜索
    function areaSeltctShow(event) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        if (this.parentElement.children[1].className === 'drop-select search-drop-select') {
            this.parentElement.children[1].className = 'drop-select search-drop-select show';
            for (var i = 0; i < this.parentElement.children[1].childElementCount; i++) {
                this.parentElement.children[1].children[i].onclick = function (e) {
                    // console.log(this.parentElement.parentElement.children[0]);
                    this.parentElement.parentElement.children[0].value = this.innerHTML;
                };
            }
        } else {
            this.parentElement.children[1].className = 'drop-select search-drop-select';
        }
    }
    document.getElementById('area-input').onmouseover = areaSeltctShow;
    document.getElementById('area-input').onmouseout = areaSeltctShow;
    document.getElementById('area-select').onmouseover = function (e) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        this.parentElement.children[1].className = 'drop-select search-drop-select show';
    };
    document.getElementById('area-select').onmouseout = function (e) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        this.parentElement.children[1].className = 'drop-select search-drop-select';
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
        this.children[0].className = 'sidebar-show';
    };
    document.getElementById('qr-code').onmouseout = function (e) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        this.children[0].className = 'sidebar-show hide';
    };
    // 滚动
    window.onscroll = function (e) {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
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
    };
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
                    dots[3].className = 'iconfont active-dot';
                    dots[i].className = 'iconfont';
                    return false;
                } else {
                    imgs[i].className = 'display-none';
                    imgs[i - 1].className = 'display-show';
                    dots[i].className = 'iconfont';
                    dots[i - 1].className = 'iconfont active-dot';
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
                    dots[0].className = 'iconfont active-dot';
                    dots[3].className = 'iconfont';
                    return false;
                } else {
                    imgs[i].className = 'display-none';
                    imgs[i + 1].className = 'display-show';
                    dots[i].className = 'iconfont';
                    dots[i + 1].className = 'iconfont active-dot';
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
                    dots[0].className = 'iconfont active-dot';
                    dots[3].className = 'iconfont';
                    setTimeout(fn, 5000);
                    return false;
                } else {
                    imgs[i].className = 'display-none';
                    imgs[i + 1].className = 'display-show';
                    dots[i].className = 'iconfont';
                    dots[i + 1].className = 'iconfont active-dot';
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
                dots[j].className = 'iconfont';
            }
            window.event ? window.event.cancelBubble = true : e.stopPropagation();
            imgs[i].className = 'display-show';
            dots[i].className = 'iconfont active-dot';
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
            for (var i = 0; i < ullis.length; i++) {
                var li = document.createElement("li");
                ol.appendChild(li);
                li.innerHTML = '&#xe608';
                li.className = 'iconfont';
            }
            ollis = ol.children;
            ollis[0].className = "iconfont active-dot";
            //2.2 创建假图片
            //2.2.1 克隆ul下的第一个li
            var cloneli = ullis[0].cloneNode(true);
            ul.appendChild(cloneli);
            //3. 简单轮播功能
            //3.1 给小方块注册点击事件
            for (var i = 0; i < ollis.length; i++) {
                ollis[i].index = i; //存索引
                addEventListener(ollis[i],"click", function () {
                    //3.2 小方块高亮排他
                    for (var i = 0; i < ollis.length; i++) {
                        ollis[i].className = "iconfont";
                    }
                    this.className = "iconfont active-dot";
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
                ollis[i].className = "iconfont";
            }
            if (pic !== ollis.length) {
                ollis[pic].className = "iconfont active-dot";
            } else {
                ollis[0].className = 'iconfont active-dot';
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
                ollis[i].className = "iconfont";
            }
            if (pic === -1) {
                ollis[ollis.length].className = 'iconfont active-dot';
            } else {
                ollis[pic].className = "iconfont active-dot";
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