document.getElementById('drop-down-select').onclick = function (event) {
  event.stopPropagation();
  // console.log(this.children[1]);
  if (this.children[1].className === "iconfont icon-arrow-down") {
    this.children[1].className = "iconfont icon-arrow-up";
    document.getElementById('city-select').className = 'show drop-select';
  } else {
    this.children[1].className = "iconfont icon-arrow-down";
    document.getElementById('city-select').className = 'drop-select';

  }
}
console.log(document.getElementsByClassName('search'));
function areaSeltctShow(event) {
  event.stopPropagation();
  if (this.parentElement.children[1].className === 'drop-select') {
    this.parentElement.children[1].className = 'drop-select show';
  } else {
    this.parentElement.children[1].className = 'drop-select';
  }
}
document.getElementById('area-input').onmouseover = areaSeltctShow;
document.getElementById('area-input').onmouseout = areaSeltctShow;
document.getElementById('area-select').onmouseover=function (e) {
  this.parentElement.children[1].className = 'drop-select show';
  }
  document.getElementById('area-select').onmouseout=function (e) {
    this.parentElement.children[1].className = 'drop-select';
    }