/*main.js  青苗助学计划
   有 5 个功能：移动端菜单、年份、回到顶部、演示表单、评价轮播*/

// 1. 移动端汉堡菜单开合
var menuBtn = document.querySelector('.menu-btn');
var nav = document.querySelector('.nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', function () {
    nav.classList.toggle('open');   // 加上/去掉 open 类，CSS 里控制显示
  });
}

// 2. 页脚年份自动更新（不用每年手动改）
var yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// 3. 回到顶部按钮：滚动超过 300px 才出现
var toTop = document.getElementById('toTop');
if (toTop) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      toTop.classList.add('show');
    } else {
      toTop.classList.remove('show');
    }
  });
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });   // 平滑滚回顶部
  });
}

// 4. 演示表单：提交时只弹提示，不真的发送
var demoForms = document.querySelectorAll('form[data-demo]');
for (var i = 0; i < demoForms.length; i++) {
  demoForms[i].addEventListener('submit', function (e) {
    e.preventDefault();   // 阻止页面刷新
    alert('提示：这是演示站点，表单不会真的发送。正式上线后请对接后端接口。');
  });
}

/* 5. 评价轮播：左右箭头 + 圆点切换 + 自动播放 */
(function () {
  var slides = document.querySelectorAll('#quotesSlider .slide');
  var dotsWrap = document.getElementById('quotesDots');
  if (!slides.length || !dotsWrap) return;
  var current = 0;
  /* 按评论条数自动生成圆点 */
  for (var i = 0; i < slides.length; i++) {
    (function (idx) {
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', '第' + (idx + 1) + '条');
      dot.addEventListener('click', function () { go(idx); });
      dotsWrap.appendChild(dot);
    })(i);
  }
  var dots = dotsWrap.querySelectorAll('button');
  function go(n) {
    current = (n + slides.length) % slides.length;   /* 循环：到头自动回第一张 */
    for (var i = 0; i < slides.length; i++) {
      slides[i].classList.toggle('active', i === current);
      dots[i].classList.toggle('active', i === current);
    }
  }
  document.querySelector('#quotesSlider .prev').addEventListener('click', function () { go(current - 1); });
  document.querySelector('#quotesSlider .next').addEventListener('click', function () { go(current + 1); });
  go(0);   /* 默认显示第一条 */
  /* 每 5 秒自动切到下一条 */
  setInterval(function () { go(current + 1); }, 3000);
})();