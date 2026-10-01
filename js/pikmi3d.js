/* =====================================================================
   ПИКМИ — 3D-эффекты: вращающаяся пицца в hero-блоке с параллаксом от
   курсора и лёгкий наклон карточек при наведении. Ничего не ломает,
   если элементов на странице нет — все проверки через optional chaining.
   ===================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- СПРАЙТОВЫЙ КРОЛИК (реальное видео → кадры → canvas) ----------
  // Спрайт-лист: 63 кадра в один ряд, нарезан из 8.3-секундного ролика
  // (/mnt/user-data/uploads/Запись_экрана_2026-09-30_171044_1_.mov) через
  // ffmpeg (select='not(mod(n,4))', каждый 4-й кадр) + ImageMagick (+append).
  var BUNNY_FRAME_COUNT = 63;
  var BUNNY_FRAME_W = 220;
  var BUNNY_FRAME_H = 214;
  var BUNNY_NEUTRAL_FRAME = 18; // кадр с прямой головой и открытыми глазами — поза покоя

  function buildBunnySprite() {
    var canvas = document.getElementById('bunnyCanvas');
    var stage = document.getElementById('heroStage');
    if (!canvas || !stage) return;

    var ctx = canvas.getContext('2d');
    var img = new Image();
    var ready = false;

    var currentFrame = BUNNY_NEUTRAL_FRAME;
    var targetFrame = BUNNY_NEUTRAL_FRAME;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      var rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      draw();
    }

    // Рисует кадр с сохранением пропорций и центровкой (как object-fit: contain)
    function drawFrame(index, alpha) {
      var i = Math.max(0, Math.min(BUNNY_FRAME_COUNT - 1, Math.round(index)));
      var sx = i * BUNNY_FRAME_W;
      var scale = Math.min(canvas.width / BUNNY_FRAME_W, canvas.height / BUNNY_FRAME_H);
      var dw = BUNNY_FRAME_W * scale;
      var dh = BUNNY_FRAME_H * scale;
      var dx = (canvas.width - dw) / 2;
      var dy = (canvas.height - dh) / 2;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, sx, 0, BUNNY_FRAME_W, BUNNY_FRAME_H, dx, dy, dw, dh);
      ctx.globalAlpha = 1;
    }

    function draw() {
      if (!ready) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      if (ctx.imageSmoothingQuality) ctx.imageSmoothingQuality = 'high';

      var floor = Math.floor(currentFrame);
      var frac = currentFrame - floor;
      drawFrame(floor, 1);
      if (frac > 0.01) drawFrame(floor + 1, frac);
    }

    img.onload = function () {
      ready = true;
      resize();
    };
    img.src = 'img/bunny-sprite.jpg';

    window.addEventListener('resize', resize);

    if (reduceMotion) {
      return; // статичная поза покоя, без слежения за курсором
    }

    var lastTime = performance.now();

    function animate(now) {
      var dt = Math.min(48, now - lastTime);
      lastTime = now;

      // Плавное приближение к целевому кадру с поправкой на частоту кадров экрана
      var ease = 1 - Math.pow(0.0015, dt / 1000);
      currentFrame += (targetFrame - currentFrame) * ease;

      draw();
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    function updateTarget(clientX) {
      var rect = stage.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var normX = (clientX - cx) / (rect.width / 2); // -1 .. 1, может выходить за пределы
      normX = Math.max(-1, Math.min(1, normX));

      if (normX < 0) {
        targetFrame = BUNNY_NEUTRAL_FRAME + normX * BUNNY_NEUTRAL_FRAME;
      } else {
        targetFrame = BUNNY_NEUTRAL_FRAME + normX * (BUNNY_FRAME_COUNT - 1 - BUNNY_NEUTRAL_FRAME);
      }
    }

    document.addEventListener('mousemove', function (e) {
      updateTarget(e.clientX);
    });

    document.addEventListener('mouseleave', function () {
      targetFrame = BUNNY_NEUTRAL_FRAME;
    });

    // На тач-устройствах курсора нет — аккуратно реагируем на касания
    document.addEventListener('touchmove', function (e) {
      if (e.touches && e.touches[0]) updateTarget(e.touches[0].clientX);
    }, { passive: true });
    document.addEventListener('touchend', function () {
      targetFrame = BUNNY_NEUTRAL_FRAME;
    });
  }

  // ---------- НАКЛОН КАРТОЧЕК И КНОПОК ПРИ НАВЕДЕНИИ ----------
  function enableTilt(selector, maxDeg) {
    if (reduceMotion) return;
    document.querySelectorAll(selector).forEach(function (card) {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = '1';

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          'perspective(700px) rotateX(' + (-py * maxDeg) + 'deg) rotateY(' + (px * maxDeg) + 'deg) translateZ(4px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  function bindHeroButtons() {
    var menuBtn = document.getElementById('heroMenuBtn');
    var buildBtn = document.getElementById('heroBuildBtn');
    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        var grid = document.getElementById('pizzaGrid');
        if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    if (buildBtn) {
      buildBtn.addEventListener('click', function () {
        var firstCard = document.querySelector('.pizza-card.constructor-card .add-to-cart-btn, .pizza-card.constructor-card .plus-btn');
        if (firstCard) firstCard.click();
      });
    }
  }

  function init() {
    buildBunnySprite();
    bindHeroButtons();
    enableTilt('.pizza-card', 6);
    enableTilt('.cart-link-btn, .profile-btn, .category-tab, .wheel-fab', 10);

    // Каталог перерисовывается динамически (скелетон → карточки) — довешиваем наклон на новые карточки
    var grid = document.getElementById('pizzaGrid');
    if (grid && window.MutationObserver) {
      var mo = new MutationObserver(function () { enableTilt('.pizza-card', 6); });
      mo.observe(grid, { childList: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
