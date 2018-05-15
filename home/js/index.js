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
        // console.log(document.getElementById('city-select').children[i]);
        // console.log(this);
        document.getElementById('city-select').children[i].onclick = function (e) {
          // console.log(this);
          // console.log(this.parentElement.parentElement.children[0].children[0].innerHTML);
          this.parentElement.parentElement.children[0].children[0].innerHTML = this.innerHTML;
          // console.log(this.parentElement.childElementCount);
          for (let i = 0; i < this.parentElement.childElementCount; i++) {
            // console.log(this.parentElement.children[i]);
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
    if (this.parentElement.children[1].className === 'drop-select') {
      this.parentElement.children[1].className = 'drop-select show';
      for (let i = 0; i < this.parentElement.children[1].childElementCount; i++) {
        this.parentElement.children[1].children[i].onclick = function (e) {
          // console.log(this.parentElement.parentElement.children[0]);
          this.parentElement.parentElement.children[0].value = this.innerHTML;
        }
      }
    } else {
      this.parentElement.children[1].className = 'drop-select';
    }
  }
  document.getElementById('area-input').onmouseover = areaSeltctShow;
  document.getElementById('area-input').onmouseout = areaSeltctShow;
  document.getElementById('area-select').onmouseover = function (e) {
    event.stopPropagation();
    this.parentElement.children[1].className = 'drop-select show';
  }
  document.getElementById('area-select').onmouseout = function (e) {
    event.stopPropagation();
    this.parentElement.children[1].className = 'drop-select';
  }
}
// 侧边栏
document.getElementById('entrust').onmousemove = function (e) {
  e.stopPropagation();
  // console.log(this);
  this.children[0].className = 'sidebar-show';
}
document.getElementById('entrust').onmouseout = function (e) {
  e.stopPropagation();
  // console.log(this);
  this.children[0].className = 'sidebar-show hide';

}
document.getElementById('qr-code').onmouseover = function (e) {
  e.stopPropagation();
  this.children[0].className = 'sidebar-show';

}
document.getElementById('qr-code').onmouseout = function (e) {
  e.stopPropagation();
  // console.log(this);
  this.children[0].className = 'sidebar-show hide';

}
// 滚动
window.onscroll = function (e) {
  // this.console.log(document.documentElement.scrollTop);
  let t = document.documentElement.scrollTop || document.body.scrollTop;
  if (t > 668) {
    document.getElementById('search').className = 'search search-fixed';
  } else {
    document.getElementById('search').className = 'search';

  }
  if (t > 150) {
    // console.log(`66`);
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
  cancelAnimationFrame(timer);
  timer = requestAnimationFrame(function fn() {
    let top = document.documentElement.scrollTop || document.documentElement.scrollTop;
    if (top > 0) {
      document.body.scrollTop = document.documentElement.scrollTop = top - 100;
      timer = requestAnimationFrame(fn);
    } else {
      cancelAnimationFrame(timer);
    }
  });
  document.getElementById('up-top-show').className = 'sidebar-show hide';
}
// console.log(document.getElementById('band-house-btns').children);
// 品牌按钮
// let slideShowInterval ;
// function slide(className, num) {
//   slideShowInterval= setInterval(function () {
//     nextImg(className, num);
//   }, 5000);
// };
// slide('slideshow',0);
// slide('slideshow',3);
for (let i = 1; i < 4; i++) {
  document.getElementById('band-house-btns').children[i].onclick = function (e) {
    e.stopPropagation();
    // slide('slideshow', i-1);
    getEl(i - 1);
    clearInterval(timer);
    pic = fk = 0;
    timer = setInterval(function () {
      rightArrs[i - 1].onclick();
    }, 1000);
    console.log(this.parentElement);
    for (let j = 1; j < 4; j++) {
      this.parentElement.children[j].className = '';
    }
    this.className = 'active-btn';
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
        break;
      } else {
        imgs[i].className = 'display-none';
        imgs[i - 1].className = 'display-show';
        dots[i].className = 'iconfont';
        dots[i - 1].className = 'iconfont active-dot';
        break;
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
        break;
      } else {
        imgs[i].className = 'display-none';
        imgs[i + 1].className = 'display-show';
        dots[i].className = 'iconfont';
        dots[i + 1].className = 'iconfont active-dot';
        break;
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
        break;
      } else {
        imgs[i].className = 'display-none';
        imgs[i + 1].className = 'display-show';
        dots[i].className = 'iconfont';
        dots[i + 1].className = 'iconfont active-dot';
        break;
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
// let dotNum = 0;

// function nextImg(className, i) {
//   let slideShow = document.getElementsByClassName(className)[i];
//   // console.log(slideShow);
//   let left = parseInt(slideShow.children[0].style.left);
//   let timer = null;
//   let flag = 0;
//   let slideDots = document.getElementsByClassName('img-dot');
//   // console.log(slideDots[1].childElementCount);
//   for (let j = 0; j < slideDots[i + 1].childElementCount; j++) {
//     slideDots[i + 1].children[j].className = 'iconfont';
//   }
//   console.log(dotNum);
//   if (dotNum < 2) {
//     dotNum++;
//   } else {
//     dotNum = 0;
//   }
//   timer = setInterval(function () {
//     if (left > -2280) {
//       if (flag < 570) {
//         left -= 10;
//         flag += 10
//         slideShow.children[0].style.left = `${left}px`;
//       }
//       else {
//         flag = 0;
//         slideDots[i + 1].children[dotNum].className = 'iconfont active-dot';
//         clearInterval(timer);

//       }
//     } else {
//       left = -570;
//       slideShow.children[0].style.left = `${left}px`;
//       flag = 0;
//       slideDots[i + 1].children[0].className = 'iconfont active-dot';
//       clearInterval(timer);

//     }
//   }, 10);
// }
// function prevImg(className, i) {
//   let slideShow = document.getElementsByClassName(className)[i];
//   let left = parseInt(slideShow.children[0].style.left);
//   let timer = null;
//   let flag = 0;
//   let slideDots = document.getElementsByClassName('img-dot');
//   for (let j = 0; j < slideDots[i + 1].childElementCount; j++) {
//     slideDots[i + 1].children[j].className = 'iconfont';
//   }
//   if (dotNum >0) {
//     dotNum--;
//   } else {
//     dotNum = 2;
//   }
//   timer = setInterval(function () {
//     if (left < 0) {
//       if (flag < 570) {
//         left += 10;
//         flag += 10
//         slideShow.children[0].style.left = `${left}px`;
//       }
//       else {
//         flag=0;
//         slideDots[i + 1].children[dotNum].className = 'iconfont active-dot';
//         clearInterval(timer);
//       }
//     } else {
//       left = -1710;
//       slideShow.children[0].style.left = `${left}px`;
//       slideDots[i + 1].children[2].className = 'iconfont active-dot';
//       flag = 0;
//       clearInterval(timer);
//     }
//   }, 10);
// }



// let slidePrevs = document.getElementsByClassName('slide-prev');
// for (let i = 0; i < slidePrevs.length; i++) {
//   slidePrevs[i].onclick = function (e) {
//     e.stopPropagation();
//     prevImg(`slideshow`, i);
//   }
// }
// let slideNexts = document.getElementsByClassName('slide-next');
// for (let i = 0; i < slideNexts.length; i++) {
//   slideNexts[i].onclick = function (e) {
//     e.stopPropagation();
//     nextImg(`slideshow`, i);
//   }
// }
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
var box;
var slideshow=document.getElementsByClassName("slideshow")[0];
var ul;
var ullis;
var ol;
var arr;
var leftArrs = document.getElementsByClassName("slide-prev");
var rightArrs = document.getElementsByClassName("slide-next");
var imgwidth = slideshow.offsetWidth;
var pic = fk = 0;
var timer;
var ollis;
function getEl(num) {
  box = document.getElementsByClassName("all")[num];
  slideshow = document.getElementsByClassName("slideshow")[num];
  ul = slideshow.children[0];
  ullis = ul.children;
  ol = slideshow.children[1];
  arr = document.getElementsByClassName('slide-arr')[num];
  console.log(slideshow);
  console.log(imgwidth);
  pic = fk = 0;
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
    clearInterval(timer2);
  }
  //4.2 鼠标离开盒子，隐藏箭头
  box.onmouseleave = function () {
    arr.style.display = "none";
    timer = setInterval(function () {
      rightArrs[num + 1].onclick();
    }, 1000)
  }
}
//4.3 点击右箭头
for (let i = 0; i < rightArrs.length; i++) {
  rightArrs[i].onclick = function () {
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
}
//4.4 点击左箭头
for (let i = 0; i < leftArrs.length; i++) {
  leftArrs[i].onclick = function () {
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
}
//5. 自动播放的功能
getEl(0);
timer = setInterval(function () {
  rightArrs[0].onclick();
}, 1000);
getEl(3);
timer2=setInterval(function () {
  rightArrs[3].onclick();
}, 1000);;
//6. 同步问题
//6.1 点击右箭头,同步
//6.2 点击左箭头，同步
//6.3 点击小方块，同步