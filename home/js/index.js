window.onload = function (e) {
    // 点击body收回下拉列表
    document.body.onclick = function (e) {
        event.stopPropagation();
        document.getElementById('city-select').className = 'drop-select';
        document.getElementById('drop-down-select').children[1].className = "iconfont icon-arrow-down";
    }
    // 城市选择
    document.getElementById('drop-down-select').onclick = function (event) {
        event.stopPropagation();
        if (this.children[1].className === "iconfont icon-arrow-down") {
            this.children[1].className = "iconfont icon-arrow-up";
            document.getElementById('city-select').className = 'show drop-select';
            for (let i = 0; i < 4; i++) {
                document.getElementById('city-select').children[i].onclick = function (e) {
                    this.parentElement.parentElement.children[0].children[0].innerHTML = this.innerHTML;
                    for (let i = 0; i < this.parentElement.childElementCount; i++) {
                        this.parentElement.children[i].className = '';
                    }
                    this.className = 'active-selected';
                }
            }
        } else {
            this.children[1].className = "iconfont icon-arrow-down";
            document.getElementById('city-select').className = 'drop-select';
        }
    }

    // 搜索
    function areaSeltctShow(event) {
        event.stopPropagation();
        if (this.parentElement.children[1].className === 'drop-select search-drop-select') {
            this.parentElement.children[1].className = 'drop-select search-drop-select show';
            for (let i = 0; i < this.parentElement.children[1].childElementCount; i++) {
                this.parentElement.children[1].children[i].onclick = function (e) {
                    // console.log(this.parentElement.parentElement.children[0]);
                    this.parentElement.parentElement.children[0].value = this.innerHTML;
                }
            }
        } else {
            this.parentElement.children[1].className = 'drop-select search-drop-select';
        }
    }
    document.getElementById('area-input').onmouseover = areaSeltctShow;
    document.getElementById('area-input').onmouseout = areaSeltctShow;
    document.getElementById('area-select').onmouseover = function (e) {
        event.stopPropagation();
        this.parentElement.children[1].className = 'drop-select search-drop-select show';
    }
    document.getElementById('area-select').onmouseout = function (e) {
        event.stopPropagation();
        this.parentElement.children[1].className = 'drop-select search-drop-select';
    }

    // 侧边栏
    document.getElementById('entrust').onmousemove = function (e) {
        e.stopPropagation();
        this.children[0].className = 'sidebar-show';
    }
    document.getElementById('entrust').onmouseout = function (e) {
        e.stopPropagation();
        this.children[0].className = 'sidebar-show hide';

    }
    document.getElementById('qr-code').onmouseover = function (e) {
        e.stopPropagation();
        this.children[0].className = 'sidebar-show';

    }
    document.getElementById('qr-code').onmouseout = function (e) {
        e.stopPropagation();
        this.children[0].className = 'sidebar-show hide';

    }
    // 滚动
    window.onscroll = function (e) {
        let t = document.documentElement.scrollTop || document.body.scrollTop;
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
    }
    document.getElementById('up-to-head').onmouseover = function (e) {
        if (document.getElementById('up-to-head').className === 'trans-hide slow-show iconfont icon-arrow-up')
            // console.log(document.getElementById('up-to-head').style.visibility);
            document.getElementById('up-top-show').className = 'sidebar-show';
    }
    document.getElementById('up-to-head').onmouseout = function (e) {
        document.getElementById('up-top-show').className = 'sidebar-show hide';
    }

    document.getElementById('up-to-head').onclick = function (e) {
        // document.documentElement.scrollTop=0;
        let timer = null;
        window.cancelAnimationFrame(timer);
        timer = window.requestAnimationFrame(function fn() {
            let top = document.documentElement.scrollTop || document.documentElement.scrollTop;
            if (top > 0) {
                document.body.scrollTop = document.documentElement.scrollTop = top - 100;
                timer = window.requestAnimationFrame(fn);
            } else {
                window.cancelAnimationFrame(timer);
            }
        });
        document.getElementById('up-top-show').className = 'sidebar-show hide';
    }
    // 品牌按钮
    for (let i = 1; i < 4; i++) {
        document.getElementById('band-house-btns').children[i].onclick = function (e) {
            e.stopPropagation();
            // getEl(i - 1)[i-1];
            clearInterval(timer);
            pic = fk = 0;
            timer = setInterval(function () {
                getEl(i - 1)[i - 1];
            }, 1000);
            console.log(this.parentElement);
            for (let j = 1; j < 4; j++) {
                this.parentElement.children[j].className = 'band-house-btn';
            }
            this.className = 'band-house-btn active-btn';
            for (let j = 1; j < 4; j++) {
                this.parentElement.parentElement.children[j].className = 'band-house-show show-list display-none';
            }
            this.parentElement.parentElement.children[i].className = 'band-house-show show-list display-show';
        }
    }
    //顶部轮播图
    let imgs = document.getElementById('carousel-img').children;
    let dots = document.getElementById('img-dot').children;

    document.getElementById('top-prev-btn').onclick = function (e) {
        for (let i = 0; i < imgs.length; i++) {
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
    }
    document.getElementById('top-next-btn').onclick = function (e) {
        for (let i = 0; i < imgs.length; i++) {
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
    }
    // 定时轮播图
    let carouselTimer = setInterval(function () {
        for (let i = 0; i < imgs.length; i++) {
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
    }, 5000);
    // 头部轮播点
    for (let i = 0; i < dots.length; i++) {
        dots[i].onclick = function (e) {
            for (let j = 0; j < 4; j++) {
                imgs[j].className = 'display-none';
                dots[j].className = 'iconfont';
            }
            e.stopPropagation();
            imgs[i].className = 'display-show';
            dots[i].className = 'iconfont active-dot';
        }
    }
    //页面轮播图
    //动画函数
    function animate(el, target) {
        if (el.timer) {
            clearInterval(el.timer);
        }
        el.timer = setInterval(function () {
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
                clearInterval(el.timer);
                el.style.left = target + "px";
            }
        }, 15);
    }
    //1. 找对象
    let imgwidth = document.getElementsByClassName("slideshow")[0].offsetWidth;
    let pic = fk = 0;

    function getEl(num) {
        let box = document.getElementsByClassName("all")[num];
        let slideshow = document.getElementsByClassName("slideshow")[num];
        let ul = slideshow.children[0];
        let ullis = ul.children;
        let ol = slideshow.children[1];
        let arr = document.getElementsByClassName('slide-arr')[num];
        let leftArr = document.getElementsByClassName("slide-prev")[num];
        let rightArr = document.getElementsByClassName("slide-next")[num];
        let timer = null;
        //2. 动态创建结构
        //2.1 创建小方块,ulLis
        //根据ul中li的个数创建小方块
        if (ol.childElementCount == 0)
            for (var i = 0; i < ullis.length; i++) {
                var li = document.createElement("li");
                ol.appendChild(li);
                li.innerHTML = '&#xe608';
                li.className = 'iconfont';
            }
        let ollis = ol.children;
        ollis[0].className = "iconfont active-dot";
        //2.2 创建假图片
        //2.2.1 克隆ul下的第一个li
        var cloneli = ullis[0].cloneNode(true);
        ul.appendChild(cloneli);
        //3. 简单轮播功能
        //3.1 给小方块注册点击事件
        for (var i = 0; i < ollis.length; i++) {
            ollis[i].index = i; //存索引
            ollis[i].addEventListener("click", function () {
                //3.2 小方块高亮排他
                for (var i = 0; i < ollis.length; i++) {
                    ollis[i].className = "iconfont";
                }
                this.className = "iconfont active-dot";
                //3.3. 移动ul
                var target = -this.index * imgwidth;
                animate(ul, target);
                pic = fk = this.index;
            })
        }
        //4. 左右焦点功能（无缝）
        //4.1 鼠标经过盒子，显示箭头
        box.onmouseover = function () {
            arr.style.display = "block";
            //清除定时器
            clearInterval(timer);
        }
        //4.2 鼠标离开盒子，隐藏箭头
        box.onmouseleave = function () {
            arr.style.display = "none";
            timer = setInterval(function () {
                rightClick();
            }, 1000)
        }
        //4.3 点击右箭头
        function rightClick() {
            //如果已经到了最后一张假图片，让ul瞬移到第一张真图片
            if (pic === ollis.length) {
                ul.style.left = 0;
                pic = 0;
            }
            pic++; //记录出去的图片张数
            fk++;
            if (fk === ollis.length) {
                fk = 0;
            }
            for (var i = 0; i < ollis.length; i++) {
                ollis[i].className = "iconfont";
            }
            ollis[fk].className = "iconfont active-dot";
            var target = -pic * imgwidth;
            animate(ul, target);
        }
        rightArr.onclick = rightClick;

        //4.4 点击左箭头
        function leftClick() {
            if (pic === 0) {
                ul.style.left = -(ullis.length - 1) * imgwidth + "px";
                pic = ullis.length - 1;
            }
            pic--;
            //同步小方块
            fk--;
            if (fk === -1) {
                fk = ollis.length - 1;
            }
            for (var i = 0; i < ollis.length; i++) {
                ollis[i].className = "iconfont";
            }
            ollis[fk].className = "iconfont active-dot";
            var target = -pic * imgwidth;
            animate(ul, target);
        }
        leftArr.onclick = leftClick;
        return [rightClick, leftClick];
    }
    // console.log(getEl(0)[0]);
    //5. 自动播放的功能
    timer = setInterval(function () {
        getEl(0)[0]();
    }, 5000);
    // let timer2 = setInterval(function () {
    //   getEl(3)[0]();
    // }, 4000);
    //6. 同步问题
    //6.1 点击右箭头,同步
    //6.2 点击左箭头，同步
    //6.3 点击小方块，同步
}