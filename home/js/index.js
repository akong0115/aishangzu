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
  if(t>668){
    document.getElementById('search').className='search search-fixed';
  }else{
    document.getElementById('search').className='search';

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
let slideShowInterval ;
function slide(className, num) {
  slideShowInterval= setInterval(function () {
    nextImg(className, num);
  }, 5000);
};
slide('slideshow',0);
slide('slideshow',3);
for (let i = 1; i < 4; i++) {
  document.getElementById('band-house-btns').children[i].onclick = function (e) {
    e.stopPropagation();
    slide('slideshow', i-1);
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
let dotNum = 0;

function nextImg(className, i) {
  let slideShow = document.getElementsByClassName(className)[i];
  // console.log(slideShow);
  let left = parseInt(slideShow.children[0].style.left);
  let timer = null;
  let flag = 0;
  let slideDots = document.getElementsByClassName('img-dot');
  // console.log(slideDots[1].childElementCount);
  for (let j = 0; j < slideDots[i + 1].childElementCount; j++) {
    slideDots[i + 1].children[j].className = 'iconfont';
  }
  console.log(dotNum);
  if (dotNum < 2) {
    dotNum++;
  } else {
    dotNum = 0;
  }
  timer = setInterval(function () {
    if (left > -2280) {
      if (flag < 570) {
        left -= 10;
        flag += 10
        slideShow.children[0].style.left = `${left}px`;
      }
      else {
        flag = 0;
        slideDots[i + 1].children[dotNum].className = 'iconfont active-dot';
        clearInterval(timer);

      }
    } else {
      left = -570;
      slideShow.children[0].style.left = `${left}px`;
      flag = 0;
      slideDots[i + 1].children[0].className = 'iconfont active-dot';
      clearInterval(timer);

    }
  }, 10);
}
function prevImg(className, i) {
  let slideShow = document.getElementsByClassName(className)[i];
  let left = parseInt(slideShow.children[0].style.left);
  let timer = null;
  let flag = 0;
  let slideDots = document.getElementsByClassName('img-dot');
  for (let j = 0; j < slideDots[i + 1].childElementCount; j++) {
    slideDots[i + 1].children[j].className = 'iconfont';
  }
  if (dotNum >0) {
    dotNum--;
  } else {
    dotNum = 2;
  }
  timer = setInterval(function () {
    if (left < 0) {
      if (flag < 570) {
        left += 10;
        flag += 10
        slideShow.children[0].style.left = `${left}px`;
      }
      else {
        flag=0;
        slideDots[i + 1].children[dotNum].className = 'iconfont active-dot';
        clearInterval(timer);
      }
    } else {
      left = -1710;
      slideShow.children[0].style.left = `${left}px`;
      slideDots[i + 1].children[2].className = 'iconfont active-dot';
      flag = 0;
      clearInterval(timer);
    }
  }, 10);
}



let slidePrevs = document.getElementsByClassName('slide-prev');
for (let i = 0; i < slidePrevs.length; i++) {
  slidePrevs[i].onclick = function (e) {
    e.stopPropagation();
    prevImg(`slideshow`, i);
  }
}
let slideNexts = document.getElementsByClassName('slide-next');
for (let i = 0; i < slideNexts.length; i++) {
  slideNexts[i].onclick = function (e) {
    e.stopPropagation();
    nextImg(`slideshow`, i);
  }
}