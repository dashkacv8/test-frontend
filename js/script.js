(function () {
  // ---------- ДАННЫЕ ----------
  const menuData = {
    pizza: [
      { id: 0, name: 'Своя пицца', emoji: '🛠️', desc: 'Выберите размер и начинки на свой вкус', price: 350, isConstructor: true },
      { id: 1, name: 'Маргарита', emoji: '🍅', desc: 'томат, моцарелла, базилик', price: 590 },
      { id: 2, name: 'Пепперони', emoji: '🌶️', desc: 'пепперони, сыр, томатный соус', price: 720 },
      { id: 3, name: 'Гавайская', emoji: '🍍', desc: 'курица, ананас, моцарелла', price: 810 },
      { id: 4, name: 'Четыре сыра', emoji: '🧀', desc: 'моцарелла, пармезан, горгонзола', price: 940 },
      { id: 5, name: 'Мясная', emoji: '🥩', desc: 'бекон, салями, ветчина', price: 990 },
      { id: 6, name: 'Вегетарианская', emoji: '🥦', desc: 'перец, грибы, оливки', price: 670 }
    ],
    snacks: [
      { id: 7, name: 'Картофель фри', emoji: '🍟', desc: 'хрустящий картофель с солью', price: 250 },
      { id: 8, name: 'Куриные крылышки', emoji: '🍗', desc: 'острые крылышки в соусе барбекю', price: 420 },
      { id: 9, name: 'Сырные палочки', emoji: '🧀', desc: 'панированные сырные палочки', price: 380 },
      { id: 10, name: 'Картофель по-деревенски', emoji: '🥔', desc: 'запечённый картофель со специями', price: 280 },
      { id: 11, name: 'Кальмары кольца', emoji: '🦑', desc: 'жареные кольца кальмара с соусом', price: 450 }
    ],
    drinks: [
      { id: 12, name: 'Кола', emoji: '🥤', desc: 'газированный напиток 0.5л', price: 150 },
      { id: 13, name: 'Лимонад', emoji: '🍋', desc: 'освежающий лимонад 0.5л', price: 180 },
      { id: 14, name: 'Морс', emoji: '🫐', desc: 'клюквенный морс 0.5л', price: 200 },
      { id: 15, name: 'Чай', emoji: '🫖', desc: 'чёрный или зелёный чай', price: 120 },
      { id: 16, name: 'Кофе', emoji: '☕', desc: 'американо или капучино', price: 180 },
      { id: 17, name: 'Сок', emoji: '🧃', desc: 'апельсиновый или яблочный', price: 160 }
    ],
    sauces: [
      { id: 18, name: 'Сырный соус', emoji: '🧀', desc: 'нежный сливочный соус', price: 80 },
      { id: 19, name: 'Чесночный соус', emoji: '🧄', desc: 'пикантный чесночный соус', price: 80 },
      { id: 20, name: 'Барбекю', emoji: '🥩', desc: 'копчёный соус барбекю', price: 90 },
      { id: 21, name: 'Томатный соус', emoji: '🍅', desc: 'классический томатный', price: 70 },
      { id: 22, name: 'Острый соус', emoji: '🌶️', desc: 'соус чили', price: 90 }
    ],
    combo: [
      { id: 200, name: 'Комбо для одного', emoji: '🍕🥤', desc: 'Пицца 32см на выбор + напиток 0.5л', price: 690, category: 'combo' },
      { id: 201, name: 'Комбо для двоих', emoji: '🍕🍕🍟', desc: '2 пиццы 32см на выбор + картофель фри', price: 1490, category: 'combo' },
      { id: 202, name: 'Комбо для компании', emoji: '🍕🍕🍕🥤', desc: '3 пиццы 32см + 2 напитка 0.5л', price: 2290, category: 'combo' },
      { id: 203, name: 'Комбо + закуска', emoji: '🍕🍗', desc: 'Пицца 32см + куриные крылышки', price: 890, category: 'combo' }
    ]
  };

  const addToOrderItems = [
    { id: 12, name: 'Кола', emoji: '🥤', price: 150, category: 'drinks' },
    { id: 13, name: 'Лимонад', emoji: '🍋', price: 180, category: 'drinks' },
    { id: 7, name: 'Картофель фри', emoji: '🍟', price: 250, category: 'snacks' },
    { id: 9, name: 'Сырные палочки', emoji: '🧀', price: 380, category: 'snacks' },
    { id: 18, name: 'Сырный соус', emoji: '🧀', price: 80, category: 'sauces' },
    { id: 20, name: 'Барбекю', emoji: '🥩', price: 90, category: 'sauces' }
  ];

  // ---------- ТОЧКИ САМОВЫВОЗА ----------
  const pickupPoints = [
    { id: 1, name: 'ул. Ленина, 45', address: 'г. Пермь, ул. Ленина, 45', hours: '10:00–23:00', lat: 58.0105, lng: 56.2502 },
    { id: 2, name: 'Комсомольский пр-т, 68', address: 'г. Пермь, Комсомольский пр-т, 68', hours: '10:00–23:00', lat: 58.0004, lng: 56.2270 },
    { id: 3, name: 'ул. Куйбышева, 95', address: 'г. Пермь, ул. Куйбышева, 95', hours: '10:00–22:00', lat: 58.0184, lng: 56.2661 }
  ];
  let selectedPickupPointId = pickupPoints[0].id;

  const toppingPrices = { 'грибы': 30, 'оливки': 35, 'бекон': 60, 'перец': 40, 'сыр': 30 };
  function getToppingsPrice(toppings) {
    return toppings.reduce((sum, t) => sum + (toppingPrices[t] || 30), 0);
  }

  // ---------- ОТЗЫВЫ (СИДОВЫЕ ДАННЫЕ) ----------
  const seedReviews = {
    1: [
      { author: 'Мария', rating: 5, text: 'Классика, которая никогда не подводит! Тесто тонкое, базилик свежий.', date: '02.09.2026' },
      { author: 'Игорь', rating: 4, text: 'Вкусно, но хотелось бы побольше моцареллы.', date: '28.08.2026' }
    ],
    2: [
      { author: 'Дмитрий', rating: 5, text: 'Лучшая пепперони в городе, острая именно так, как надо!', date: '05.09.2026' },
      { author: 'Алина', rating: 5, text: 'Заказываю уже третий раз, всегда свежая и горячая.', date: '30.08.2026' },
      { author: 'Сергей', rating: 4, text: 'Хорошая пицца, доставили быстро.', date: '22.08.2026' }
    ],
    3: [
      { author: 'Ольга', rating: 3, text: 'Ананас на пицце — на любителя, но сделано качественно.', date: '01.09.2026' },
      { author: 'Павел', rating: 5, text: 'Обожаю гавайскую, курица очень сочная.', date: '25.08.2026' }
    ],
    4: [
      { author: 'Екатерина', rating: 5, text: 'Четыре сорта сыра реально чувствуются, невероятно вкусно.', date: '03.09.2026' }
    ],
    5: [
      { author: 'Андрей', rating: 5, text: 'Мясная — то, что нужно после тренировки. Огромная порция белка и вкуса.', date: '04.09.2026' },
      { author: 'Наталья', rating: 4, text: 'Сытно и вкусно, но немного жирновато.', date: '20.08.2026' }
    ],
    6: [
      { author: 'Виктория', rating: 4, text: 'Отличный вариант для тех, кто не ест мясо. Овощи свежие.', date: '29.08.2026' }
    ]
  };

  function getReviews(itemId) {
    const seed = seedReviews[itemId] || [];
    let userAdded = [];
    try {
      userAdded = JSON.parse(localStorage.getItem('pikmi-reviews-' + itemId)) || [];
    } catch (e) { userAdded = []; }
    return userAdded.concat(seed);
  }

  function computeRating(itemId) {
    const reviews = getReviews(itemId);
    if (reviews.length === 0) return { avg: 0, count: 0 };
    const sum = reviews.reduce((s, r) => s + r.rating, 0);
    return { avg: sum / reviews.length, count: reviews.length };
  }

  function starsString(avg) {
    const rounded = Math.round(avg);
    return '★★★★★'.slice(0, rounded) + '☆☆☆☆☆'.slice(0, 5 - rounded);
  }

  // ---------- СОСТОЯНИЕ ----------
  let cart = [];
  let currentPizza = null;
  let currentCategory = 'pizza';
  let deliveryType = 'delivery';
  let deliveryDistrict = 'center';
  let paymentMethod = 'online';
  let promoApplied = false;
  let promoDiscount = 0;
  let freePizza = false;
  let promoCode = '';
  let useBonuses = false;
  let bonusAmount = 0;

  let isLoggedIn = false;
  let userData = {
    name: 'Анна',
    phone: '+7 999 123-45-67',
    bonuses: 150,
    discount: 5,
    savedCard: '**** 4589',
    referralCode: 'АННА4521',
    referredBy: null,
    orders: []
  };

  // DOM
  const pizzaGrid = document.getElementById('pizzaGrid');
  const cartList = document.getElementById('cartList');
  const cartBadge = document.getElementById('cartBadge');
  const categoryTabs = document.getElementById('categoryTabs');
  const addToOrderGrid = document.getElementById('addToOrderGrid');

  const modalOverlay = document.getElementById('modalOverlay');
  const modalPizzaName = document.getElementById('modalPizzaName');
  const modalCancelBtn = document.getElementById('modalCancelBtn');
  const modalAddBtn = document.getElementById('modalAddBtn');
  const sizeSelector = document.getElementById('sizeSelector');
  const toppingsGroup = document.getElementById('toppingsGroup');

  const goToCartBtn = document.getElementById('goToCartBtn');
  const backToCatalogBtn = document.getElementById('backToCatalogBtn');
  const catalogPage = document.getElementById('catalogPage');
  const cartPage = document.getElementById('cartPage');
  const profilePage = document.getElementById('profilePage');
  const promoPage = document.getElementById('promoPage');
  const faqPage = document.getElementById('faqPage');
  const mapPage = document.getElementById('mapPage');
  const profileBtn = document.getElementById('profileBtn');
  const profileBtnText = document.getElementById('profileBtnText');
  const closeProfileBtn = document.getElementById('closeProfileBtn');
  const closePromoBtn = document.getElementById('closePromoBtn');

  const deliveryToggle = document.getElementById('deliveryToggle');
  const deliveryAddress = document.getElementById('deliveryAddress');
  const pickupAddress = document.getElementById('pickupAddress');
  const deliveryAddressBlock = document.getElementById('deliveryAddressBlock');
  const pickupAddressBlock = document.getElementById('pickupAddressBlock');
  const addressSuggestions = document.getElementById('addressSuggestions');
  const addressHint = document.getElementById('addressHint');

  const promoInput = document.getElementById('promoInput');
  const applyPromoBtn = document.getElementById('applyPromoBtn');
  const promoMessage = document.getElementById('promoMessage');
  const orderBtn = document.getElementById('orderBtn');
  const orderSummary = document.getElementById('orderSummary');

  const paymentOptions = document.getElementById('paymentOptions');
  const paymentDetail = document.getElementById('paymentDetail');
  const paymentModal = document.getElementById('paymentModal');
  const paymentCancelBtn = document.getElementById('paymentCancelBtn');
  const paymentConfirmBtn = document.getElementById('paymentConfirmBtn');
  const cardNumber = document.getElementById('cardNumber');
  const cardExpiry = document.getElementById('cardExpiry');
  const cardCvv = document.getElementById('cardCvv');
  const saveCard = document.getElementById('saveCard');

  const useBonusesCheckbox = document.getElementById('useBonuses');
  const bonusInfo = document.getElementById('bonusInfo');
  const bonusApplyInfo = document.getElementById('bonusApplyInfo');

  const profileAuth = document.getElementById('profileAuth');
  const profileContent = document.getElementById('profileContent');
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const profileNameDisplay = document.getElementById('profileNameDisplay');
  const profilePhoneDisplay = document.getElementById('profilePhoneDisplay');
  const bonusDisplay = document.getElementById('bonusDisplay');
  const discountDisplay = document.getElementById('discountDisplay');
  const savedCardDisplay = document.getElementById('savedCardDisplay');
  const referralCodeDisplay = document.getElementById('referralCodeDisplay');
  const ordersList = document.getElementById('ordersList');

  // Модалки
  const infoModal = document.getElementById('infoModal');
  const infoModalTitle = document.getElementById('infoModalTitle');
  const infoModalContent = document.getElementById('infoModalContent');
  const infoModalCloseBtn = document.getElementById('infoModalCloseBtn');

  const orderStatusModal = document.getElementById('orderStatusModal');
  const statusOrderId = document.getElementById('statusOrderId');
  const orderStatusTrack = document.getElementById('orderStatusTrack');
  const statusIcon2 = document.getElementById('statusIcon2');
  const statusLabel2 = document.getElementById('statusLabel2');
  const statusLine1 = document.getElementById('statusLine1');
  const statusLine2 = document.getElementById('statusLine2');
  const orderStatusMessage = document.getElementById('orderStatusMessage');
  const orderStatusCloseBtn = document.getElementById('orderStatusCloseBtn');

  const courierCard = document.getElementById('courierCard');
  const courierAvatar = document.getElementById('courierAvatar');
  const courierName = document.getElementById('courierName');
  const courierRating = document.getElementById('courierRating');
  const courierPhone = document.getElementById('courierPhone');
  const courierCallBtn = document.getElementById('courierCallBtn');
  const courierMapEl = document.getElementById('courierMap');

  const feedbackModal = document.getElementById('feedbackModal');
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackCancelBtn = document.getElementById('feedbackCancelBtn');

  // Поля для обратной связи
  const feedbackName = document.getElementById('feedbackName');
  const feedbackPhone = document.getElementById('feedbackPhone');
  const feedbackEmail = document.getElementById('feedbackEmail');
  const feedbackMessage = document.getElementById('feedbackMessage');
  const feedbackConsent = document.getElementById('feedbackConsent');

  // Элементы ошибок
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const recaptchaError = document.getElementById('recaptchaError');
  const consentError = document.getElementById('consentError');

  // Согласие при оформлении заказа + cookie-баннер
  const orderConsent = document.getElementById('orderConsent');
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');

  // Колесо удачи
  const wheelFabBtn = document.getElementById('wheelFabBtn');
  const wheelFabBadge = document.getElementById('wheelFabBadge');
  const wheelModal = document.getElementById('wheelModal');
  const wheelCloseBtn = document.getElementById('wheelCloseBtn');
  const wheelGroup = document.getElementById('wheelGroup');
  const wheelSvg = document.getElementById('wheelSvg');
  const wheelStatus = document.getElementById('wheelStatus');
  const wheelSpinBtn = document.getElementById('wheelSpinBtn');
  const wheelResult = document.getElementById('wheelResult');
  const wheelResultEmoji = document.getElementById('wheelResultEmoji');
  const wheelResultTitle = document.getElementById('wheelResultTitle');
  const wheelResultText = document.getElementById('wheelResultText');
  const wheelResultCloseBtn = document.getElementById('wheelResultCloseBtn');

  // Прогресс уровня лояльности
  const loyaltyTierIcon = document.getElementById('loyaltyTierIcon');
  const loyaltyTierName = document.getElementById('loyaltyTierName');
  const loyaltyProgressFill = document.getElementById('loyaltyProgressFill');
  const loyaltyProgressText = document.getElementById('loyaltyProgressText');

  // Достижения
  const badgesGrid = document.getElementById('badgesGrid');

  // Live-уведомления (социальное доказательство)
  const socialToast = document.getElementById('socialToast');
  const socialToastEmoji = document.getElementById('socialToastEmoji');
  const socialToastTitle = document.getElementById('socialToastTitle');
  const socialToastText = document.getElementById('socialToastText');

  // Уведомления
  const notifOverlay = document.getElementById('notificationOverlay');
  const notifIcon = document.getElementById('notifIcon');
  const notifTitle = document.getElementById('notifTitle');
  const notifMessage = document.getElementById('notifMessage');
  const notifBtn = document.getElementById('notifBtn');

  // ---------- СИСТЕМА УВЕДОМЛЕНИЙ ----------
  let notifOnClose = null;

  function showNotification(type, title, message, onClose) {
    const types = {
      success: { icon: '✅', btnClass: 'success-btn' },
      error: { icon: '❌', btnClass: 'error-btn' },
      info: { icon: 'ℹ️', btnClass: 'info-btn' },
      gold: { icon: '🎉', btnClass: 'gold-btn' }
    };

    const config = types[type] || types.info;
    notifIcon.textContent = config.icon;
    notifTitle.textContent = title;
    notifMessage.innerHTML = message;
    notifBtn.className = 'notification-btn ' + config.btnClass;
    notifOverlay.classList.add('open');
    notifOnClose = typeof onClose === 'function' ? onClose : null;
  }

  function closeNotification() {
    notifOverlay.classList.remove('open');
    if (notifOnClose) {
      const cb = notifOnClose;
      notifOnClose = null;
      cb();
    }
  }

  notifBtn.addEventListener('click', closeNotification);
  notifOverlay.addEventListener('click', function (e) {
    if (e.target === this) closeNotification();
  });

  // ---------- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ----------
  function getItemCount(item) {
    const cartItem = cart.find(ci =>
      ci.id === item.id &&
      ci.size === (item.size || null) &&
      JSON.stringify(ci.toppings || []) === JSON.stringify(item.toppings || [])
    );
    return cartItem ? cartItem.quantity : 0;
  }

  function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function getCartItems() {
    return cart.map(item => {
      let detail = item.name;
      if (item.isPizza) {
        detail += ` (${item.size} см)`;
        if (item.toppings.length) detail += ` + ${item.toppings.join(', ')}`;
      }
      return detail;
    }).join(', ');
  }

  function getDeliveryFee() {
    if (deliveryType === 'pickup') return 0;
    if (deliveryDistrict === 'remote') {
      const total = getCartTotal();
      return total >= 1500 ? 0 : 200;
    }
    return 0;
  }

  function getCartTotalWithFactors() {
    let total = getCartTotal();
    let discount = 0;
    let freeItem = null;
    let bonusDiscount = 0;
    const deliveryFee = getDeliveryFee();

    if (deliveryType === 'pickup') {
      discount += Math.round(total * 0.1);
    }

    if (promoApplied && freePizza && total >= 2500) {
      freeItem = {
        name: 'Маргарита (бесплатно)',
        price: 590,
        count: 1
      };
    }

    if (promoApplied && promoDiscount > 0) {
      discount += Math.round(total * (promoDiscount / 100));
    }

    if (useBonuses && isLoggedIn && userData.bonuses > 0 && cart.length > 0) {
      const totalAfterDiscount = total - discount + deliveryFee;
      const maxBonus = Math.min(userData.bonuses, totalAfterDiscount);
      if (maxBonus > 0) {
        bonusDiscount = maxBonus;
        bonusAmount = maxBonus;
      }
    }

    return { total, discount, freeItem, bonusDiscount, deliveryFee };
  }

  // ---------- ФУНКЦИИ ДЛЯ РАБОТЫ С ОШИБКАМИ ПОЛЕЙ ----------
  function showFieldError(input, errorElement) {
    input.classList.add('error');
    errorElement.classList.add('show');
  }

  function clearFieldError(input, errorElement) {
    input.classList.remove('error');
    errorElement.classList.remove('show');
  }

  // ---------- РЕНДЕР КАТАЛОГА ----------
  let catalogLoading = true;
  let catalogSkeletonScheduled = false;

  function renderCatalogSkeleton() {
    pizzaGrid.innerHTML = Array.from({ length: 8 }, () => `
      <div class="pizza-card skeleton-card">
        <div class="sk sk-emoji"></div>
        <div class="sk sk-line sk-title"></div>
        <div class="sk sk-line"></div>
        <div class="sk sk-line sk-short"></div>
        <div class="sk sk-btn"></div>
      </div>
    `).join('');
  }

  function renderCatalog(category = currentCategory) {
    if (catalogLoading) {
      renderCatalogSkeleton();
      if (!catalogSkeletonScheduled) {
        catalogSkeletonScheduled = true;
        setTimeout(() => {
          catalogLoading = false;
          renderCatalog(currentCategory);
        }, 650);
      }
      return;
    }
    pizzaGrid.innerHTML = '';
    const items = menuData[category] || [];

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'pizza-card';
      card.dataset.id = item.id;

      const count = getItemCount(item);
      const isInCart = count > 0;
      const rating = computeRating(item.id);
      const ratingHtml = item.isConstructor ? '' : (rating.count > 0
        ? `<div class="item-rating" data-review-id="${item.id}"><span class="stars">${starsString(rating.avg)}</span> ${rating.avg.toFixed(1)} (${rating.count})</div>`
        : `<div class="item-rating" data-review-id="${item.id}">Оставить отзыв</div>`);

      if (item.isConstructor) card.classList.add('constructor-card');

      const emojiChars = Array.from(item.emoji || '');
      const emojiHtml = emojiChars.length > 1
        ? emojiChars.map(e => `<span>${e}</span>`).join('')
        : item.emoji;
      const emojiClass = emojiChars.length > 1 ? ` multi multi-${Math.min(emojiChars.length, 4)}` : '';

      card.innerHTML = `
          <div class="pizza-emoji${emojiClass}">${emojiHtml}</div>
          <div class="pizza-name">${item.name}</div>
          <div class="pizza-desc">${item.desc}</div>
          ${ratingHtml}
          <div class="pizza-price">${item.price} ₽</div>
          ${isInCart ? `
            <div class="cart-controls">
              <button class="qty-btn minus-btn" data-id="${item.id}" data-category="${category}">−</button>
              <span class="item-count">${count}</span>
              <button class="qty-btn plus-btn" data-id="${item.id}" data-category="${category}">+</button>
            </div>
          ` : `
            <button class="add-to-cart-btn" data-id="${item.id}" data-category="${category}">➕ В корзину</button>
          `}
        `;

      const ratingEl = card.querySelector('.item-rating');
      if (ratingEl) {
        ratingEl.addEventListener('click', (e) => {
          e.stopPropagation();
          openReviewsModal(item);
        });
      }

      const addBtn = card.querySelector('.add-to-cart-btn');
      if (addBtn) {
        addBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (item.isConstructor) {
            openConstructorModal();
          } else if (category === 'pizza') {
            openModal(item.id);
          } else {
            addNonPizzaToCart(item, category, e.currentTarget);
          }
        });
      }

      const plusBtn = card.querySelector('.plus-btn');
      if (plusBtn) {
        plusBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (item.isConstructor) {
            openConstructorModal();
          } else if (category === 'pizza') {
            openModal(item.id);
          } else {
            addNonPizzaToCart(item, category, e.currentTarget);
          }
        });
      }

      const minusBtn = card.querySelector('.minus-btn');
      if (minusBtn) {
        minusBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          removeItemFromCart(item);
        });
      }

      pizzaGrid.appendChild(card);
    });
  }

  // ---------- АНИМАЦИЯ ДОБАВЛЕНИЯ В КОРЗИНУ ----------
  function flyToCart(sourceEl, emoji) {
    if (!sourceEl || !goToCartBtn) return;
    const startRect = sourceEl.getBoundingClientRect();
    const endRect = goToCartBtn.getBoundingClientRect();

    const flyer = document.createElement('div');
    flyer.className = 'fly-to-cart';
    flyer.textContent = emoji || '🍕';
    flyer.style.left = (startRect.left + startRect.width / 2 - 14) + 'px';
    flyer.style.top = (startRect.top + startRect.height / 2 - 14) + 'px';
    flyer.style.opacity = '1';
    document.body.appendChild(flyer);

    requestAnimationFrame(() => {
      const dx = (endRect.left + endRect.width / 2) - (startRect.left + startRect.width / 2);
      const dy = (endRect.top + endRect.height / 2) - (startRect.top + startRect.height / 2);
      flyer.style.transform = `translate(${dx}px, ${dy}px) scale(0.3)`;
      flyer.style.opacity = '0.2';
    });

    setTimeout(() => {
      flyer.remove();
      goToCartBtn.classList.add('bump');
      cartBadge.classList.add('bump');
      setTimeout(() => {
        goToCartBtn.classList.remove('bump');
        cartBadge.classList.remove('bump');
      }, 400);
    }, 550);
  }

  // ---------- ДОБАВЛЕНИЕ/УДАЛЕНИЕ ТОВАРОВ ----------
  function addNonPizzaToCart(item, category, sourceEl) {
    const existing = cart.find(ci => ci.id === item.id && !ci.isPizza);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        size: null,
        toppings: [],
        price: item.price,
        quantity: 1,
        isPizza: false,
        category: category
      });
    }
    if (sourceEl) flyToCart(sourceEl, item.emoji || '🍕');
    renderCatalog(currentCategory);
    renderCart();
    updateBadge();
    updateOrderButton();
    updateSummary();
    checkPromoValidity();
  }

  function removeItemFromCart(item) {
    const existing = cart.find(ci => ci.id === item.id && !ci.isPizza);
    if (existing) {
      if (existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        const idx = cart.indexOf(existing);
        cart.splice(idx, 1);
      }
    }
    renderCatalog(currentCategory);
    renderCart();
    updateBadge();
    updateOrderButton();
    updateSummary();
    checkPromoValidity();
  }

  // ---------- МОДАЛКА ПИЦЦЫ ----------
  function updateModalLivePrice() {
    if (!currentPizza) return;
    const multiplier = getSelectedMultiplier();
    const toppings = getSelectedToppings();
    const basePrice = Math.round(currentPizza.price * multiplier);
    const total = basePrice + getToppingsPrice(toppings);
    const priceEl = document.getElementById('modalLivePrice');
    if (priceEl) priceEl.textContent = `${total} ₽`;
  }

  function openModal(pizzaId) {
    const pizza = menuData.pizza.find(p => p.id === pizzaId);
    if (!pizza) return;
    currentPizza = pizza;
    modalPizzaName.textContent = `${pizza.emoji} ${pizza.name}`;

    document.querySelectorAll('.size-btn').forEach(btn => {
      const mult = parseFloat(btn.dataset.multiplier);
      const sizePrice = Math.round(pizza.price * mult);
      btn.querySelector('.size-price').textContent = `${sizePrice} ₽`;
    });

    document.querySelectorAll('.size-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.size === '32');
    });
    document.querySelectorAll('#toppingsGroup input').forEach(cb => cb.checked = false);

    updateModalLivePrice();
    modalOverlay.classList.add('open');
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    currentPizza = null;
  }

  function getSelectedSize() {
    const active = document.querySelector('.size-btn.active');
    return active ? parseInt(active.dataset.size) : 32;
  }

  function getSelectedMultiplier() {
    const active = document.querySelector('.size-btn.active');
    return active ? parseFloat(active.dataset.multiplier) : 1;
  }

  function getSelectedToppings() {
    const checked = document.querySelectorAll('#toppingsGroup input:checked');
    return Array.from(checked).map(cb => cb.value);
  }

  function addToCartFromModal() {
    if (!currentPizza) return;

    const size = getSelectedSize();
    const multiplier = getSelectedMultiplier();
    const toppings = getSelectedToppings();

    let basePrice = Math.round(currentPizza.price * multiplier);
    const toppingsPrice = getToppingsPrice(toppings);
    const totalPrice = basePrice + toppingsPrice;

    const existing = cart.find(item =>
      item.id === currentPizza.id &&
      item.size === size &&
      JSON.stringify(item.toppings) === JSON.stringify(toppings)
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: currentPizza.id,
        name: currentPizza.name,
        size: size,
        toppings: toppings,
        price: totalPrice,
        quantity: 1,
        isPizza: true,
        category: 'pizza'
      });
    }

    flyToCart(modalAddBtn, currentPizza.emoji || '🍕');
    closeModal();
    renderCatalog(currentCategory);
    renderCart();
    updateBadge();
    updateOrderButton();
    updateSummary();
    checkPromoValidity();
  }

  // ---------- КОНСТРУКТОР СВОЕЙ ПИЦЦЫ ----------
  const CONSTRUCTOR_BASE_PRICE = 280;
  const CONSTRUCTOR_SAUCES = [
    { id: 'tomato', name: 'Томатный соус', price: 0 },
    { id: 'cream', name: 'Сливочный соус', price: 30 },
    { id: 'bbq', name: 'Соус барбекю', price: 40 }
  ];
  const CONSTRUCTOR_CHEESE = [
    { id: 'mozzarella', name: 'Моцарелла', price: 0 },
    { id: 'double', name: 'Двойной сыр', price: 70 },
    { id: 'cheddar', name: 'Чеддер', price: 60 }
  ];
  const CONSTRUCTOR_TOPPINGS = [
    { id: 'pepperoni', name: 'Пепперони', emoji: '🌶️', price: 60 },
    { id: 'ham', name: 'Ветчина', emoji: '🍖', price: 55 },
    { id: 'mushrooms', name: 'Грибы', emoji: '🍄', price: 30 },
    { id: 'olives', name: 'Оливки', emoji: '🫒', price: 35 },
    { id: 'bacon', name: 'Бекон', emoji: '🥓', price: 60 },
    { id: 'pepper', name: 'Перец', emoji: '🫑', price: 40 },
    { id: 'onion', name: 'Лук', emoji: '🧅', price: 20 },
    { id: 'pineapple', name: 'Ананас', emoji: '🍍', price: 45 },
    { id: 'tomatoes', name: 'Томаты', emoji: '🍅', price: 30 },
    { id: 'jalapeno', name: 'Халапеньо', emoji: '🌶️', price: 35 }
  ];

  const constructorModal = document.getElementById('constructorModal');
  const constructorSizeSelector = document.getElementById('constructorSizeSelector');
  const constructorSauceGroup = document.getElementById('constructorSauceGroup');
  const constructorCheeseGroup = document.getElementById('constructorCheeseGroup');
  const constructorToppingsGroup = document.getElementById('constructorToppingsGroup');
  const constructorLivePrice = document.getElementById('constructorLivePrice');
  const constructorCancelBtn = document.getElementById('constructorCancelBtn');
  const constructorAddBtn = document.getElementById('constructorAddBtn');

  let constructorSauceId = CONSTRUCTOR_SAUCES[0].id;
  let constructorCheeseId = CONSTRUCTOR_CHEESE[0].id;
  let constructorToppingIds = [];

  function renderConstructorOptions() {
    constructorSauceGroup.innerHTML = CONSTRUCTOR_SAUCES.map(s => `
      <button type="button" class="constructor-pill" data-sauce="${s.id}">${s.name}${s.price ? ` (+${s.price}₽)` : ''}</button>
    `).join('');

    constructorCheeseGroup.innerHTML = CONSTRUCTOR_CHEESE.map(c => `
      <button type="button" class="constructor-pill" data-cheese="${c.id}">${c.name}${c.price ? ` (+${c.price}₽)` : ''}</button>
    `).join('');

    constructorToppingsGroup.innerHTML = CONSTRUCTOR_TOPPINGS.map(t => `
      <label class="heart-checkbox">
        <input type="checkbox" value="${t.id}">
        <span class="heart-icon empty">🤍</span>
        <span class="heart-icon filled">❤️</span>
        <span class="heart-label">${t.emoji} ${t.name}</span>
        <span class="heart-price">+${t.price}₽</span>
      </label>
    `).join('');

    constructorSauceGroup.querySelectorAll('.constructor-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        constructorSauceId = btn.dataset.sauce;
        constructorSauceGroup.querySelectorAll('.constructor-pill').forEach(b => b.classList.toggle('active', b === btn));
        updateConstructorPrice();
      });
    });

    constructorCheeseGroup.querySelectorAll('.constructor-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        constructorCheeseId = btn.dataset.cheese;
        constructorCheeseGroup.querySelectorAll('.constructor-pill').forEach(b => b.classList.toggle('active', b === btn));
        updateConstructorPrice();
      });
    });

    constructorToppingsGroup.querySelectorAll('input').forEach(cb => {
      cb.addEventListener('change', updateConstructorPrice);
    });

    constructorSizeSelector.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        constructorSizeSelector.querySelectorAll('.size-btn').forEach(b => b.classList.toggle('active', b === btn));
        updateConstructorPrice();
      });
    });
  }

  function getConstructorMultiplier() {
    const active = constructorSizeSelector.querySelector('.size-btn.active');
    return active ? parseFloat(active.dataset.multiplier) : 1;
  }

  function getConstructorSize() {
    const active = constructorSizeSelector.querySelector('.size-btn.active');
    return active ? parseInt(active.dataset.size) : 32;
  }

  function updateConstructorPrice() {
    const sauce = CONSTRUCTOR_SAUCES.find(s => s.id === constructorSauceId);
    const cheese = CONSTRUCTOR_CHEESE.find(c => c.id === constructorCheeseId);
    const toppingIds = Array.from(constructorToppingsGroup.querySelectorAll('input:checked')).map(cb => cb.value);
    const toppingsSum = toppingIds.reduce((sum, id) => {
      const t = CONSTRUCTOR_TOPPINGS.find(x => x.id === id);
      return sum + (t ? t.price : 0);
    }, 0);

    const multiplier = getConstructorMultiplier();
    const total = Math.round(CONSTRUCTOR_BASE_PRICE * multiplier) + sauce.price + cheese.price + toppingsSum;
    constructorLivePrice.textContent = `${total} ₽`;
    return total;
  }

  function openConstructorModal() {
    renderConstructorOptions();

    constructorSizeSelector.querySelectorAll('.size-btn').forEach(btn => {
      const mult = parseFloat(btn.dataset.multiplier);
      btn.querySelector('.size-price').textContent = `${Math.round(CONSTRUCTOR_BASE_PRICE * mult)} ₽`;
      btn.classList.toggle('active', btn.dataset.size === '32');
    });

    constructorSauceId = CONSTRUCTOR_SAUCES[0].id;
    constructorCheeseId = CONSTRUCTOR_CHEESE[0].id;
    constructorSauceGroup.querySelector('.constructor-pill').classList.add('active');
    constructorCheeseGroup.querySelector('.constructor-pill').classList.add('active');

    updateConstructorPrice();
    constructorModal.classList.add('open');
  }

  function closeConstructorModal() {
    constructorModal.classList.remove('open');
  }

  function addConstructorPizzaToCart() {
    const sauce = CONSTRUCTOR_SAUCES.find(s => s.id === constructorSauceId);
    const cheese = CONSTRUCTOR_CHEESE.find(c => c.id === constructorCheeseId);
    const toppingIds = Array.from(constructorToppingsGroup.querySelectorAll('input:checked')).map(cb => cb.value);
    const toppingNames = toppingIds.map(id => {
      const t = CONSTRUCTOR_TOPPINGS.find(x => x.id === id);
      return t ? `${t.emoji} ${t.name}` : id;
    });
    const size = getConstructorSize();
    const totalPrice = updateConstructorPrice();
    const description = [sauce.name, cheese.name, ...toppingNames];

    const existing = cart.find(item =>
      item.id === 0 &&
      item.size === size &&
      JSON.stringify(item.toppings) === JSON.stringify(description)
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: 0,
        name: '🛠️ Своя пицца',
        size: size,
        toppings: description,
        price: totalPrice,
        quantity: 1,
        isPizza: true,
        category: 'pizza'
      });
    }

    flyToCart(constructorAddBtn, '🛠️');
    closeConstructorModal();
    renderCatalog(currentCategory);
    renderCart();
    updateBadge();
    updateOrderButton();
    updateSummary();
    checkPromoValidity();
    showNotification('success', '🛠️ Готово!', 'Ваша авторская пицца добавлена в корзину');
  }

  constructorCancelBtn.addEventListener('click', closeConstructorModal);
  constructorAddBtn.addEventListener('click', addConstructorPizzaToCart);
  constructorModal.addEventListener('click', (e) => {
    if (e.target === constructorModal) closeConstructorModal();
  });

  // ---------- БЛОК "ДОБАВИТЬ К ЗАКАЗУ" ----------
  function renderAddToOrder() {
    addToOrderGrid.innerHTML = '';
    addToOrderItems.forEach(item => {
      const div = document.createElement('div');
      div.className = 'add-to-order-item';
      div.innerHTML = `
          <div class="item-info">
            <span class="item-name">${item.emoji} ${item.name}</span>
            <span class="item-price">${item.price} ₽</span>
          </div>
          <button class="add-btn" data-id="${item.id}">+</button>
        `;

      div.querySelector('.add-btn').addEventListener('click', (e) => {
        addNonPizzaToCart(item, item.category, e.currentTarget);
      });

      addToOrderGrid.appendChild(div);
    });
  }

  // ---------- КОРЗИНА ----------
  function renderCart() {
    cartList.innerHTML = '';
    if (cart.length === 0) {
      cartList.innerHTML = '<div class="empty-cart-msg">Корзина пуста, но пицца ждёт 💫</div>';
      return;
    }

    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      let detail = '';
      if (item.isPizza) {
        const toppingsStr = item.toppings.length ? ` + ${item.toppings.join(', ')}` : '';
        detail = `${item.size} см, ${item.price} ₽ × ${item.quantity}${toppingsStr}`;
      } else {
        detail = `${item.price} ₽ × ${item.quantity}`;
      }
      div.innerHTML = `
          <div class="cart-item-info">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-detail">${detail}</span>
          </div>
          <div class="cart-item-actions">
            <button class="qty-btn minus-cart-btn" data-index="${index}">−</button>
            <span class="item-qty">${item.quantity}</span>
            <button class="qty-btn plus-cart-btn" data-index="${index}">+</button>
          </div>
        `;
      cartList.appendChild(div);
    });

    document.querySelectorAll('.plus-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.dataset.index);
        cart[idx].quantity += 1;
        renderCatalog(currentCategory);
        renderCart();
        updateBadge();
        updateOrderButton();
        updateSummary();
        checkPromoValidity();
      });
    });
    document.querySelectorAll('.minus-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.dataset.index);
        if (cart[idx].quantity > 1) {
          cart[idx].quantity -= 1;
        } else {
          cart.splice(idx, 1);
        }
        renderCatalog(currentCategory);
        renderCart();
        updateBadge();
        updateOrderButton();
        updateSummary();
        checkPromoValidity();
      });
    });
  }

  function updateBadge() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = total;
    document.title = total > 0 ? `(${total}) ПикмиПицца` : 'ПикмиПицца';
  }

  // ---------- СУММА ЗАКАЗА ----------
  function updateSummary() {
    const { total, discount, freeItem, bonusDiscount, deliveryFee } = getCartTotalWithFactors();
    let finalTotal = total - discount + deliveryFee - bonusDiscount;
    let html = '';

    html += `<div class="summary-line">Сумма заказа <span>${total} ₽</span></div>`;

    if (deliveryFee > 0) {
      html += `<div class="summary-line delivery-fee">🚗 Доставка (отдаленный район) <span>+${deliveryFee} ₽</span></div>`;
    } else if (deliveryType === 'delivery' && deliveryDistrict === 'remote') {
      html += `<div class="summary-line delivery-fee" style="color:#7ddfa0;">🚗 Доставка (отдаленный район) <span>Бесплатно</span></div>`;
    }

    if (discount > 0) {
      let discountText = '';
      if (deliveryType === 'pickup') {
        discountText = 'Скидка за самовывоз 10%';
      } else if (promoDiscount > 0) {
        discountText = `Скидка по промокоду (${promoDiscount}%)`;
      }
      html += `<div class="summary-line discount">${discountText} <span>-${discount} ₽</span></div>`;
    }

    if (freeItem && freePizza && total >= 2500) {
      html += `<div class="summary-line free-item">${freeItem.name} <span>0 ₽</span></div>`;
    }

    if (bonusDiscount > 0) {
      html += `<div class="summary-line bonus">Списано бонусов <span>-${bonusDiscount} ₽</span></div>`;
    }

    html += `<div class="summary-line total">Итого к оплате <span>${finalTotal} ₽</span></div>`;

    orderSummary.innerHTML = html;

    if (isLoggedIn) {
      bonusInfo.textContent = `Доступно: ${userData.bonuses} ₽`;
      if (useBonuses && bonusDiscount > 0) {
        bonusApplyInfo.style.display = 'inline';
        bonusApplyInfo.textContent = `Списано: ${bonusDiscount} ₽`;
      } else if (useBonuses && cart.length > 0) {
        bonusApplyInfo.style.display = 'inline';
        bonusApplyInfo.textContent = 'Бонусов недостаточно';
        bonusApplyInfo.style.color = '#ff6b6b';
      } else {
        bonusApplyInfo.style.display = 'none';
      }
    }
  }

  // ---------- ПРОВЕРКА ПРОМОКОДА ----------
  function checkPromoValidity() {
    if (!promoApplied) return;

    const total = getCartTotal();
    if (freePizza && total < 2500) {
      promoApplied = false;
      freePizza = false;
      promoDiscount = 0;
      promoMessage.textContent = '⚠️ Сумма заказа меньше 2500 ₽, промокод больше не действует';
      promoMessage.className = 'promo-message info';
      promoInput.value = '';
      renderCatalog(currentCategory);
      renderCart();
      updateOrderButton();
      updateSummary();
      return;
    }

    if (promoCode === 'КОМБО15' || promoCode === 'COMBO15') {
      const hasPizza = cart.some(ci => ci.category === 'pizza');
      const hasSnack = cart.some(ci => ci.category === 'snacks');
      const hasDrink = cart.some(ci => ci.category === 'drinks');
      if (!hasPizza || !hasSnack || !hasDrink) {
        promoApplied = false;
        promoDiscount = 0;
        promoMessage.textContent = '⚠️ Для комбо нужны пицца + закуска + напиток — промокод отменён';
        promoMessage.className = 'promo-message info';
        promoInput.value = '';
        renderCatalog(currentCategory);
        renderCart();
        updateOrderButton();
        updateSummary();
      }
    }
  }

  // ---------- КНОПКА ЗАКАЗАТЬ ----------
  function updateOrderButton() {
    const total = getCartTotal();
    const hasItems = cart.length > 0;
    const hasAddress = deliveryType === 'delivery' ? deliveryAddress.value.trim().length > 0 : true;
    const isDelivery = deliveryType === 'delivery';
    const minOrder = isDelivery ? total >= 1000 : true;
    const hasConsent = orderConsent ? orderConsent.checked : true;

    const isValid = hasItems && hasAddress && minOrder && hasConsent;

    orderBtn.classList.toggle('active', isValid);
    orderBtn.disabled = !isValid;

    if (!hasItems) {
      orderBtn.textContent = '🛒 Корзина пуста';
    } else if (isDelivery && total < 1000) {
      orderBtn.textContent = `🚚 Для доставки нужно заказать от 1000 ₽ (сейчас ${total} ₽)`;
    } else if (!hasAddress) {
      orderBtn.textContent = '📍 Укажите адрес';
    } else if (!hasConsent) {
      orderBtn.textContent = '📜 Примите условия оферты';
    } else {
      orderBtn.textContent = '✅ Заказать';
    }
  }

  // ---------- ОПЛАТА ----------
  function updatePaymentUI() {
    let html = '';

    if (paymentMethod === 'online') {
      html = `
          <label>
            <span>💳 Оплата онлайн</span>
            <span style="color:#b09ab0;font-size:0.85rem;">(безопасный платёж)</span>
          </label>
          ${isLoggedIn && userData.savedCard ? `
            <div class="saved-card">
              💳 Сохранённая карта: ${userData.savedCard}
              <button style="background:rgba(255,150,200,0.1);border:1px solid rgba(255,150,200,0.2);border-radius:30px;padding:4px 16px;color:#f0e6f0;cursor:pointer;font-size:0.8rem;" id="changeCardBtn">Изменить</button>
            </div>
          ` : `
            <button style="background:rgba(255,150,200,0.1);border:1px solid rgba(255,150,200,0.2);border-radius:30px;padding:8px 20px;color:#f0e6f0;cursor:pointer;font-size:0.9rem;margin-top:8px;" id="addCardBtn">➕ Добавить карту</button>
          `}
        `;
    } else if (paymentMethod === 'terminal') {
      html = `
          <label>
            <span>💳 Оплата картой через терминал</span>
            <span style="color:#b09ab0;font-size:0.85rem;">(при получении)</span>
          </label>
        `;
    } else if (paymentMethod === 'cash') {
      html = `
          <label>
            <span>💰 Наличными</span>
            ${deliveryType === 'delivery' ? `
              <div style="width:100%;margin-top:8px;">
                <span style="color:#b09ab0;font-size:0.9rem;">С какой суммы подготовить сдачу:</span>
                <input type="text" id="cashDenomination" placeholder="Например: 500, 1000, 2000" value="500, 1000" style="width:100%;margin-top:4px;">
              </div>
            ` : ''}
          </label>
        `;
    }

    paymentDetail.innerHTML = html;

    const addCardBtn = document.getElementById('addCardBtn');
    if (addCardBtn) {
      addCardBtn.addEventListener('click', () => {
        paymentModal.classList.add('open');
      });
    }

    const changeCardBtn = document.getElementById('changeCardBtn');
    if (changeCardBtn) {
      changeCardBtn.addEventListener('click', () => {
        paymentModal.classList.add('open');
      });
    }
  }

  // ---------- ОГРАНИЧЕНИЯ НА ВВОД КАРТЫ ----------
  function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    let formatted = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += value[i];
    }
    input.value = formatted;
  }

  function formatCardExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      const month = parseInt(value.slice(0, 2));
      if (month > 12) {
        value = '12' + value.slice(2);
      }
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
    }
    input.value = value;
  }

  function formatCardCvv(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    input.value = value;
  }

  // ---------- ОПЛАТА ОНЛАЙН ----------
  function processOnlinePayment() {
    const number = cardNumber.value.replace(/\s/g, '');
    const expiry = cardExpiry.value.replace('/', '');
    const cvv = cardCvv.value;

    if (number.length < 16) {
      showNotification('error', '❌ Ошибка', 'Введите корректный номер карты (16 цифр)');
      return;
    }
    if (expiry.length < 4) {
      showNotification('error', '❌ Ошибка', 'Введите корректный срок действия (ММ/ГГ)');
      return;
    }
    if (cvv.length < 3) {
      showNotification('error', '❌ Ошибка', 'Введите CVV код (3 цифры)');
      return;
    }

    if (saveCard.checked && isLoggedIn) {
      const last4 = number.slice(-4);
      userData.savedCard = `**** ${last4}`;
      updateProfileUI();
    }

    paymentModal.classList.remove('open');
    showNotification('success', '💳 Карта сохранена', 'Карта успешно добавлена и сохранена');
    updatePaymentUI();
  }

  // ---------- СТАТУС ЗАКАЗА ----------
  const ORDER_STATUS_LABELS = {
    delivery: {
      step2icon: '🚗', step2label: 'В пути',
      step3icon: '✅', step3label: 'Доставлено',
      msgStep1: 'Приняли ваш заказ, начинаем готовить 🍕',
      msgStep2: 'Курьер уже в пути к вам 🚗',
      msgStep3: 'Заказ доставлен! Приятного аппетита 🎉'
    },
    pickup: {
      step2icon: '📦', step2label: 'Готово к выдаче',
      step3icon: '✅', step3label: 'Заказ получен',
      msgStep1: 'Приняли ваш заказ, начинаем готовить 🍕',
      msgStep2: 'Заказ готов, ждём вас в пиццерии 📦',
      msgStep3: 'Заказ получен! Спасибо, что выбрали нас 🎉'
    }
  };

  function startOrderStatusFlow(order, type) {
    const labels = ORDER_STATUS_LABELS[type] || ORDER_STATUS_LABELS.delivery;
    statusOrderId.textContent = '#' + order.id;
    statusIcon2.textContent = labels.step2icon;
    statusLabel2.textContent = labels.step2label;
    document.getElementById('statusIcon3').textContent = labels.step3icon;
    document.getElementById('statusLabel3').textContent = labels.step3label;

    const steps = orderStatusTrack.querySelectorAll('.status-step');
    steps.forEach((s, i) => s.classList.toggle('active', i === 0));
    steps.forEach(s => s.classList.remove('done'));
    statusLine1.classList.remove('filled');
    statusLine2.classList.remove('filled');
    orderStatusMessage.textContent = labels.msgStep1;
    order.status = 'preparing';
    courierCard.style.display = 'none';
    courierMapEl.style.display = 'none';
    stopCourierTracking();

    orderStatusModal.classList.add('open');

    const t1 = setTimeout(() => {
      steps[0].classList.add('done');
      steps[1].classList.add('active');
      statusLine1.classList.add('filled');
      orderStatusMessage.textContent = labels.msgStep2;
      order.status = 'onTheWay';
      if (isLoggedIn) { updateProfileUI(); persistAccount(); }
      if (type === 'delivery') initCourierTracking();
    }, 4000);

    const t2 = setTimeout(() => {
      steps[1].classList.add('done');
      steps[2].classList.add('active', 'done');
      statusLine2.classList.add('filled');
      orderStatusMessage.textContent = labels.msgStep3;
      order.status = 'delivered';
      if (isLoggedIn) { updateProfileUI(); persistAccount(); }
    }, 8000);

    orderStatusModal._timers = [t1, t2];
  }

  function closeOrderStatusModal() {
    orderStatusModal.classList.remove('open');
    if (orderStatusModal._timers) {
      orderStatusModal._timers.forEach(clearTimeout);
    }
    stopCourierTracking();
  }

  // ---------- ОТСЛЕЖИВАНИЕ КУРЬЕРА ----------
  const COURIER_NAMES = ['Максим', 'Артём', 'Иван', 'Дамир', 'Роман', 'Никита', 'Егор', 'Тимур'];
  const PIZZERIA_COORDS = [58.0105, 56.2502];
  let courierMapInstance = null;
  let courierMarker = null;
  let courierMoveInterval = null;

  function randomCourierPhone() {
    const seg = () => String(Math.floor(Math.random() * 90) + 10);
    return `+7 9${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${seg()}${Math.floor(Math.random() * 9)}-${seg()}-${seg()}`;
  }

  function initCourierTracking() {
    const name = COURIER_NAMES[Math.floor(Math.random() * COURIER_NAMES.length)];
    const rating = (4.6 + Math.random() * 0.4).toFixed(1);
    const phone = randomCourierPhone();

    courierAvatar.textContent = '🛵';
    courierName.textContent = name;
    courierRating.textContent = `⭐ ${rating}`;
    courierPhone.textContent = phone;
    courierCallBtn.href = 'tel:' + phone.replace(/[^\d+]/g, '');

    courierCard.style.display = 'flex';
    courierMapEl.style.display = 'block';

    if (typeof ol === 'undefined') return;

    const destLat = PIZZERIA_COORDS[0] + (Math.random() - 0.5) * 0.035;
    const destLng = PIZZERIA_COORDS[1] + (Math.random() - 0.5) * 0.045;
    const startXY = ol.proj.fromLonLat([PIZZERIA_COORDS[1], PIZZERIA_COORDS[0]]);
    const destXY = ol.proj.fromLonLat([destLng, destLat]);

    function makePin(text, extraClass, coord) {
      const el = document.createElement('div');
      el.className = 'map-pin ' + extraClass;
      el.textContent = text;
      const overlay = new ol.Overlay({ element: el, position: coord, positioning: 'bottom-center', offset: [0, -8] });
      courierMapInstance.addOverlay(overlay);
      return overlay;
    }

    setTimeout(() => {
      if (!courierMapInstance) {
        courierMapInstance = new ol.Map({
          target: 'courierMap',
          layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
          controls: ol.control.defaults.defaults({ attribution: false, zoom: false, rotate: false })
            .extend([new ol.control.Attribution({ collapsible: false })]),
          interactions: ol.interaction.defaults.defaults({
            dragPan: false, mouseWheelZoom: false, doubleClickZoom: false,
            pinchZoom: false, keyboard: false, altShiftDragRotate: false, pinchRotate: false
          }),
          view: new ol.View({ center: startXY, zoom: 13 })
        });
      } else {
        courierMapInstance.getOverlays().clear();
      }
      courierMapInstance.updateSize();

      makePin('🏠', 'home', destXY);
      courierMarker = makePin('🛵', 'courier', startXY);

      courierMapInstance.getView().fit(ol.extent.boundingExtent([startXY, destXY]), {
        padding: [45, 45, 45, 45], maxZoom: 15
      });

      const totalSteps = 40;
      let stepCount = 0;
      clearInterval(courierMoveInterval);
      courierMoveInterval = setInterval(() => {
        stepCount++;
        const t = Math.min(1, stepCount / totalSteps);
        const lat = PIZZERIA_COORDS[0] + (destLat - PIZZERIA_COORDS[0]) * t;
        const lng = PIZZERIA_COORDS[1] + (destLng - PIZZERIA_COORDS[1]) * t;
        if (courierMarker) courierMarker.setPosition(ol.proj.fromLonLat([lng, lat]));
        if (t >= 1) clearInterval(courierMoveInterval);
      }, 100);
    }, 250);
  }

  function stopCourierTracking() {
    clearInterval(courierMoveInterval);
  }

  orderStatusCloseBtn.addEventListener('click', closeOrderStatusModal);
  orderStatusModal.addEventListener('click', (e) => {
    if (e.target === orderStatusModal) closeOrderStatusModal();
  });

  // ---------- МОДАЛКА ОТЗЫВОВ ----------
  const reviewsModal = document.getElementById('reviewsModal');
  const reviewsModalTitle = document.getElementById('reviewsModalTitle');
  const reviewsAvg = document.getElementById('reviewsAvg');
  const reviewsAvgStars = document.getElementById('reviewsAvgStars');
  const reviewsCountEl = document.getElementById('reviewsCount');
  const reviewsList = document.getElementById('reviewsList');
  const reviewAuthorInput = document.getElementById('reviewAuthorInput');
  const reviewTextInput = document.getElementById('reviewTextInput');
  const reviewStarPicker = document.getElementById('reviewStarPicker');
  const reviewSubmitBtn = document.getElementById('reviewSubmitBtn');

  let currentReviewItem = null;
  let selectedStarValue = 5;

  function renderReviewsModal() {
    if (!currentReviewItem) return;
    const reviews = getReviews(currentReviewItem.id);
    const rating = computeRating(currentReviewItem.id);

    reviewsModalTitle.textContent = `Отзывы: ${currentReviewItem.name}`;
    reviewsAvg.textContent = rating.count > 0 ? rating.avg.toFixed(1) : '—';
    reviewsAvgStars.textContent = rating.count > 0 ? starsString(rating.avg) : '☆☆☆☆☆';
    reviewsCountEl.textContent = rating.count === 0
      ? 'Пока нет отзывов — будьте первым!'
      : `${rating.count} ${pluralizeReviews(rating.count)}`;

    reviewsList.innerHTML = reviews.map(r => `
      <div class="review-item">
        <div class="review-header">
          <span class="review-author">${escapeHtml(r.author)}</span>
          <span class="review-date">${r.date}</span>
        </div>
        <div class="review-stars">${starsString(r.rating)}</div>
        <div class="review-text">${escapeHtml(r.text)}</div>
      </div>
    `).join('');
  }

  function pluralizeReviews(n) {
    const mod10 = n % 10, mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return 'отзыв';
    if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return 'отзыва';
    return 'отзывов';
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function openReviewsModal(item) {
    currentReviewItem = item;
    selectedStarValue = 5;
    reviewAuthorInput.value = isLoggedIn ? userData.name : '';
    reviewTextInput.value = '';
    updateStarPicker();
    renderReviewsModal();
    reviewsModal.classList.add('open');
  }

  function closeReviewsModal() {
    reviewsModal.classList.remove('open');
    currentReviewItem = null;
  }

  reviewsModal.addEventListener('click', (e) => {
    if (e.target === reviewsModal) closeReviewsModal();
  });

  function updateStarPicker() {
    reviewStarPicker.querySelectorAll('span').forEach(s => {
      s.classList.toggle('active', Number(s.dataset.val) <= selectedStarValue);
    });
  }

  reviewStarPicker.querySelectorAll('span').forEach(s => {
    s.addEventListener('click', () => {
      selectedStarValue = Number(s.dataset.val);
      updateStarPicker();
    });
  });

  reviewSubmitBtn.addEventListener('click', () => {
    const author = reviewAuthorInput.value.trim();
    const text = reviewTextInput.value.trim();
    if (!author || !text) {
      showNotification('error', 'Не всё заполнено', 'Пожалуйста, укажите имя и текст отзыва.');
      return;
    }
    const newReview = {
      author, rating: selectedStarValue, text,
      date: new Date().toLocaleDateString('ru-RU')
    };
    const key = 'pikmi-reviews-' + currentReviewItem.id;
    let stored = [];
    try { stored = JSON.parse(localStorage.getItem(key)) || []; } catch (e) { stored = []; }
    stored.unshift(newReview);
    localStorage.setItem(key, JSON.stringify(stored));

    reviewTextInput.value = '';
    renderReviewsModal();
    renderCatalog(currentCategory);
    unlockBadge('reviewer');
    showNotification('success', 'Спасибо!', 'Ваш отзыв опубликован 🎉');
  });

  // ---------- ОФОРМЛЕНИЕ ЗАКАЗА ----------
  function completeOrder() {
    const { total, discount, freeItem, bonusDiscount, deliveryFee } = getCartTotalWithFactors();
    let finalTotal = total - discount + deliveryFee - bonusDiscount;

    let orderItems = getCartItems();
    if (freeItem && freePizza && total >= 2500) {
      orderItems += ', Маргарита (бесплатно)';
    }

    const bonusEarned = Math.round(finalTotal * 0.05);
    const address = deliveryType === 'delivery' ? deliveryAddress.value : pickupAddress.value;

    const paymentLabels = {
      online: 'Онлайн',
      terminal: 'Картой (терминал)',
      cash: 'Наличными'
    };

    const newOrder = {
      id: userData.orders.length + 1,
      date: new Date().toLocaleDateString('ru-RU'),
      items: orderItems,
      total: finalTotal,
      bonus: bonusEarned,
      status: 'preparing'
    };

    let bonusText = '';
    if (isLoggedIn) {
      userData.bonuses += bonusEarned - bonusDiscount;
      if (userData.bonuses < 0) userData.bonuses = 0;
      lifetimeBonusEarned += bonusEarned;
      bonusText = `\nБонус начислен: ${bonusEarned} ₽\nВсего бонусов: ${userData.bonuses} ₽`;
      userData.orders.unshift(newOrder);
      persistAccount();

      const ordersCount = incrementLifetimeOrdersCount();
      if (ordersCount >= 1) unlockBadge('first_order');
      if (ordersCount >= 5) unlockBadge('five_orders');
      if (ordersCount >= 10) unlockBadge('ten_orders');

      const orderHour = new Date().getHours();
      if (orderHour >= 22 || orderHour < 5) unlockBadge('night_owl');
      if (finalTotal >= 2000) unlockBadge('big_spender');
      if (promoCode === 'КОМБО15' || promoCode === 'COMBO15') unlockBadge('combo_master');

      updateLoyaltyUI();
    }

    let cashDetail = '';
    if (paymentMethod === 'cash' && deliveryType === 'delivery') {
      const denom = document.getElementById('cashDenomination')?.value || 'не указаны';
      cashDetail = `\nСдача с купюр: ${denom}`;
    }

    let districtNames = {
      center: 'Центр',
      north: 'Север',
      south: 'Юг',
      remote: 'Отдаленный район'
    };

    let deliveryInfo = deliveryType === 'delivery' ? 'Доставка' : 'Самовывоз';
    if (deliveryType === 'delivery') {
      deliveryInfo += ` (${districtNames[deliveryDistrict] || deliveryDistrict})`;
    }

    let message = `<span class="highlight">✅ Заказ оформлен!</span>\n\n`;
    message += `<span class="highlight">Сумма:</span> ${finalTotal} ₽\n`;
    message += `<span class="highlight">Способ:</span> ${deliveryInfo}\n`;
    message += `<span class="highlight">Адрес:</span> ${address}\n`;
    message += `<span class="highlight">Оплата:</span> ${paymentLabels[paymentMethod]}${cashDetail}\n`;
    if (discount > 0) message += `<span class="highlight">Скидка:</span> ${discount} ₽\n`;
    if (deliveryFee > 0) message += `<span class="highlight">Доставка:</span> ${deliveryFee} ₽\n`;
    if (bonusDiscount > 0) message += `<span class="highlight">Списано бонусов:</span> ${bonusDiscount} ₽\n`;
    message += bonusText;
    message += `\n\n<span class="highlight">Состав заказа:</span>\n${orderItems}\n\n`;
    message += `<span class="success-text">Спасибо за заказ! 🍕</span>`;

    const orderedDeliveryType = deliveryType;
    showNotification('gold', '🎉 Заказ оформлен!', message, () => {
      startOrderStatusFlow(newOrder, orderedDeliveryType);
    });

    cart = [];
    promoApplied = false;
    promoDiscount = 0;
    freePizza = false;
    promoInput.value = '';
    promoMessage.textContent = '';
    promoMessage.className = 'promo-message';
    useBonuses = false;
    useBonusesCheckbox.checked = false;
    bonusAmount = 0;
    if (orderConsent) orderConsent.checked = false;
    renderCatalog(currentCategory);
    renderCart();
    updateBadge();
    updateOrderButton();
    updateSummary();
    updateProfileUI();
  }

  function placeOrder() {
    if (paymentMethod === 'online') {
      if (isLoggedIn && userData.savedCard) {
        completeOrder();
      } else {
        paymentModal.classList.add('open');
      }
      return;
    }
    completeOrder();
  }

  // ---------- ПРОМОКОД ----------
  function applyPromo() {
    const code = promoInput.value.trim().toUpperCase();
    promoMessage.className = 'promo-message';

    if (code === 'ПИКМИ') {
      const total = getCartTotal();
      if (total >= 2500) {
        promoApplied = true;
        promoDiscount = 0;
        freePizza = true;
        promoCode = code;
        promoMessage.textContent = '🎉 Промокод применён! Пицца Маргарита в подарок!';
        promoMessage.className = 'promo-message success';
        renderCatalog(currentCategory);
        renderCart();
        updateOrderButton();
        updateSummary();
        showNotification('success', '🎉 Промокод применён', 'Пицца Маргарита добавлена в подарок!');
      } else {
        promoMessage.textContent = '❌ Для использования промокода нужно заказать от 2500 ₽';
        promoMessage.className = 'promo-message error';
        showNotification('error', '❌ Ошибка', 'Для использования промокода нужно заказать от 2500 ₽');
      }
    } else if (code === 'ДР' || code === 'DR') {
      promoApplied = true;
      promoDiscount = 10;
      freePizza = false;
      promoCode = code;
      promoMessage.textContent = '🎂 Скидка 10% в честь дня рождения!';
      promoMessage.className = 'promo-message success';
      renderCatalog(currentCategory);
      renderCart();
      updateOrderButton();
      updateSummary();
      showNotification('success', '🎂 С днём рождения!', 'Скидка 10% применена ко всему заказу!');
    } else if (code === 'BIRTHDAY10') {
      promoApplied = true;
      promoDiscount = 10;
      freePizza = false;
      promoCode = code;
      promoMessage.textContent = '🎂 Скидка 10% применена! С днём рождения!';
      promoMessage.className = 'promo-message success';
      renderCatalog(currentCategory);
      renderCart();
      updateOrderButton();
      updateSummary();
      showNotification('success', '🎂 С днём рождения!', 'Скидка 10% применена ко всему заказу!');
    } else if (code === 'PICKUP10') {
      promoApplied = true;
      promoDiscount = 10;
      freePizza = false;
      promoCode = code;
      promoMessage.textContent = '🏪 Скидка 10% за самовывоз!';
      promoMessage.className = 'promo-message success';
      renderCatalog(currentCategory);
      renderCart();
      updateOrderButton();
      updateSummary();
      showNotification('success', '🏪 Скидка за самовывоз', 'Скидка 10% применена!');
    } else if (code === 'КОМБО15' || code === 'COMBO15') {
      const hasPizza = cart.some(ci => ci.category === 'pizza');
      const hasSnack = cart.some(ci => ci.category === 'snacks');
      const hasDrink = cart.some(ci => ci.category === 'drinks');
      if (hasPizza && hasSnack && hasDrink) {
        promoApplied = true;
        promoDiscount = 15;
        freePizza = false;
        promoCode = code;
        promoMessage.textContent = '🍕🍟🥤 Комбо дня: скидка 15% применена!';
        promoMessage.className = 'promo-message success';
        renderCatalog(currentCategory);
        renderCart();
        updateOrderButton();
        updateSummary();
        showNotification('success', '🎉 Комбо дня', 'Скидка 15% применена ко всему заказу!');
      } else {
        promoMessage.textContent = '❌ Для комбо нужны пицца + закуска + напиток в заказе';
        promoMessage.className = 'promo-message error';
        showNotification('error', '❌ Ошибка', 'Добавьте в корзину пиццу, закуску и напиток, чтобы применить комбо');
      }
    } else if (code) {
      promoMessage.textContent = '❌ Неверный промокод';
      promoMessage.className = 'promo-message error';
      showNotification('error', '❌ Неверный промокод', 'Проверьте правильность ввода');
    }
  }

  // ---------- НАВИГАЦИЯ ----------
  function hideAllPages() {
    [catalogPage, cartPage, profilePage, promoPage, faqPage, mapPage].forEach(p => {
      p.classList.remove('active');
      p.style.display = 'none';
    });
  }

  function showCatalog() {
    hideAllPages();
    catalogPage.style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelector('.nav-item[data-page="catalog"]')?.classList.add('active');
    renderCatalog(currentCategory);
  }

  function showCart() {
    hideAllPages();
    cartPage.style.display = 'block';
    cartPage.classList.add('active');
    renderCart();
    updateOrderButton();
    updateSummary();
    renderAddToOrder();
    updatePaymentUI();
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  }

  function showProfile() {
    hideAllPages();
    profilePage.style.display = 'block';
    profilePage.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    updateProfileUI();
  }

  function showPromo() {
    hideAllPages();
    promoPage.style.display = 'block';
    promoPage.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelector('.nav-item[data-page="promo"]')?.classList.add('active');
  }

  function showFAQ() {
    hideAllPages();
    faqPage.style.display = 'block';
    faqPage.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelector('.nav-item[data-page="faq"]')?.classList.add('active');
  }

  function showMap() {
    hideAllPages();
    mapPage.style.display = 'block';
    mapPage.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelector('.nav-item[data-page="map"]')?.classList.add('active');
    initPickupMap();
  }

  // ---------- ПРОФИЛЬ ----------
  function updateProfileUI() {
    if (isLoggedIn) {
      profileAuth.style.display = 'none';
      profileContent.classList.add('active');
      profileBtnText.textContent = userData.name;
      profileNameDisplay.textContent = userData.name;
      profilePhoneDisplay.textContent = userData.phone;
      bonusDisplay.textContent = `${userData.bonuses} ₽`;
      discountDisplay.textContent = `${userData.discount}%`;
      savedCardDisplay.textContent = userData.savedCard || 'Не сохранена';
      if (referralCodeDisplay) referralCodeDisplay.textContent = userData.referralCode || '—';
      updateLoyaltyUI();
      renderBadges();

      ordersList.innerHTML = '';
      if (userData.orders.length === 0) {
        ordersList.innerHTML = '<div style="color:#806a80;text-align:center;padding:20px;">У вас пока нет заказов</div>';
      } else {
        const statusBadges = {
          preparing: { text: '👨‍🍳 Готовится', color: '#ffb347' },
          onTheWay: { text: '🚗 В пути / Готово к выдаче', color: '#7db8ff' },
          delivered: { text: '✅ Завершён', color: '#7ddfa0' }
        };
        userData.orders.forEach(order => {
          const badge = statusBadges[order.status] || statusBadges.delivered;
          const div = document.createElement('div');
          div.className = 'order-item';
          div.innerHTML = `
              <div class="order-header">
                <span class="order-id">Заказ #${order.id}</span>
                <span class="order-date">${order.date}</span>
              </div>
              <div class="order-details">${order.items}</div>
              <div class="order-details" style="color:#7ddfa0;">Сумма: ${order.total} ₽ | Бонус: +${order.bonus} ₽</div>
              <div class="order-details" style="color:${badge.color};font-weight:600;">${badge.text}</div>
            `;
          ordersList.appendChild(div);
        });
      }
    } else {
      profileAuth.style.display = 'flex';
      profileContent.classList.remove('active');
      profileBtnText.textContent = 'Войти';
    }
  }

  function normalizePhone(phone) {
    return (phone || '').replace(/\D/g, '');
  }

  // Простой, НЕ криптографический хеш — только чтобы не хранить пароль
  // открытым текстом в localStorage. Это фронтенд-демо без настоящего
  // сервера авторизации, поэтому не годится для реальных чувствительных паролей.
  function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    }
    return hash.toString(36);
  }

  function loadAccounts() {
    try { return JSON.parse(localStorage.getItem('pikmi-accounts') || '{}'); } catch (e) { return {}; }
  }

  function saveAccounts(accounts) {
    try { localStorage.setItem('pikmi-accounts', JSON.stringify(accounts)); } catch (e) { /* хранилище недоступно */ }
  }

  function getAccount(phone) {
    const accounts = loadAccounts();
    return accounts[normalizePhone(phone)] || null;
  }

  // Сохраняет текущие данные вошедшего пользователя в его аккаунт
  function persistAccount() {
    if (!isLoggedIn || !userData.phone) return;
    const accounts = loadAccounts();
    const key = normalizePhone(userData.phone);
    const existing = accounts[key] || {};
    accounts[key] = {
      passwordHash: existing.passwordHash,
      name: userData.name,
      bonuses: userData.bonuses,
      discount: userData.discount,
      savedCard: userData.savedCard,
      referralCode: userData.referralCode,
      referredBy: userData.referredBy,
      orders: userData.orders
    };
    saveAccounts(accounts);
  }

  function generateReferralCode(name) {
    const base = (name || 'ПИКМИ')
      .toUpperCase()
      .replace(/[^А-ЯA-Z]/g, '')
      .slice(0, 4) || 'ГОСТЬ';
    const digits = Math.floor(1000 + Math.random() * 9000);
    return base + digits;
  }

  function login() {
    const phone = document.getElementById('loginPhone').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!phone || !password) {
      showNotification('error', '❌ Ошибка входа', 'Пожалуйста, заполните все поля');
      return;
    }

    const account = getAccount(phone);
    if (!account) {
      showNotification('error', '❌ Аккаунт не найден', 'С этим номером ещё никто не регистрировался — создайте аккаунт на вкладке «Регистрация»');
      return;
    }
    if (account.passwordHash !== simpleHash(password)) {
      showNotification('error', '❌ Неверный пароль', 'Проверьте номер телефона и пароль');
      return;
    }

    isLoggedIn = true;
    userData.name = account.name;
    userData.phone = phone;
    userData.bonuses = account.bonuses;
    userData.discount = account.discount;
    userData.savedCard = account.savedCard;
    userData.referralCode = account.referralCode;
    userData.referredBy = account.referredBy;
    userData.orders = account.orders || [];
    lifetimeBonusEarned = account.bonuses;

    updateProfileUI();
    showNotification('success', '✅ Вход выполнен', `С возвращением, ${userData.name}!`);
    showCatalog();
  }

  function register() {
    const name = document.getElementById('regName').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value;
    const friendCode = document.getElementById('regReferralCode').value.trim().toUpperCase();
    const regConsent = document.getElementById('regConsent');

    if (!name || !phone || !password) {
      showNotification('error', '❌ Ошибка', 'Пожалуйста, заполните имя, телефон и пароль');
      return;
    }
    if (password.length < 4) {
      showNotification('error', '❌ Слишком короткий пароль', 'Пароль должен быть не короче 4 символов');
      return;
    }
    if (regConsent && !regConsent.checked) {
      showNotification('error', '❌ Ошибка', 'Нужно согласие на обработку персональных данных');
      return;
    }
    if (getAccount(phone)) {
      showNotification('error', '❌ Такой номер уже зарегистрирован', 'Попробуйте войти на вкладке «Вход»');
      return;
    }

    isLoggedIn = true;
    userData.name = name;
    userData.phone = phone;
    userData.bonuses = 100;
    userData.discount = 5;
    userData.savedCard = '**** 4589';
    userData.referralCode = generateReferralCode(name);
    userData.orders = [];

    const accounts = loadAccounts();
    accounts[normalizePhone(phone)] = {
      passwordHash: simpleHash(password),
      name: userData.name,
      bonuses: userData.bonuses,
      discount: userData.discount,
      savedCard: userData.savedCard,
      referralCode: userData.referralCode,
      referredBy: null,
      orders: []
    };
    saveAccounts(accounts);

    if (friendCode) {
      userData.referredBy = friendCode;
      userData.bonuses += 50;
      lifetimeBonusEarned = userData.bonuses;
      persistAccount();
      updateProfileUI();
      showNotification('success', '✅ Регистрация выполнена', `Добро пожаловать, ${name}! По реферальному коду начислено +50 бонусов сверху — итого 150 бонусов 🎉 Пригласивший друг получит 100 бонусов после вашего первого заказа.`);
    } else {
      lifetimeBonusEarned = userData.bonuses;
      updateProfileUI();
      showNotification('success', '✅ Регистрация выполнена', `Добро пожаловать, ${name}! Вам начислено 100 бонусов 🎉`);
    }
    showCatalog();
  }

  function logout() {
    isLoggedIn = false;
    updateProfileUI();
    showNotification('info', '👋 До свидания', 'Вы вышли из личного кабинета');
    showCatalog();
  }

  // ---------- МОДАЛКИ ИНФО ----------
  function openInfoModal(type) {
    const titles = {
      contacts: '📞 Контакты',
      vacancies: '💼 Вакансии',
      about: '📖 О нас',
      'delivery-info': '🚚 Доставка',
      'payment-info': '💳 Оплата',
      oferta: '📜 Публичная оферта',
      privacy: '🔒 Политика конфиденциальности'
    };

    const contents = {
      contacts: `
  <span class="info-icon">📞</span>
  <div class="info-item">
    <span class="label">Телефон</span>
    <span class="value">
      <a href="tel:+79991234567" style="color:#6b1f4d;text-decoration:none;">+7 (999) 123-45-67</a>
    </span>
  </div>
  <div class="info-item">
    <span class="label">Email</span>
    <span class="value">
      <a href="mailto:info@picmipizza.ru" style="color:#6b1f4d;text-decoration:none;">info@picmipizza.ru</a>
    </span>
  </div>
  <div class="info-item">
    <span class="label">Режим работы</span>
    <span class="value">10:00 - 23:00</span>
  </div>
  <div class="info-item">
    <span class="label">Адрес</span>
    <span class="value">
      <a href="https://maps.yandex.ru/?text=Студенческая 22" target="_blank" 
         style="color:#6b1f4d;text-decoration:none;">
        г. Пермь, ул. Студенческая, д. 22
      </a>
    </span>
  </div>
`,
      vacancies: `
          <span class="info-icon">💼</span>
          <div style="margin-bottom:12px;color:#b09ab0;">Мы всегда рады талантливым людям!</div>
          <div class="info-item"><span class="label">Повар-пиццайоло</span><span class="value">от 60 000 ₽</span></div>
          <div class="info-item"><span class="label">Курьер</span><span class="value">от 45 000 ₽</span></div>
          <div class="info-item"><span class="label">Менеджер зала</span><span class="value">от 55 000 ₽</span></div>
          <div style="margin-top:12px;color:#806a80;font-size:0.9rem;">Присылайте резюме на careers@picmipizza.ru</div>
        `,
      about: `
          <span class="info-icon">📖</span>
          <div style="color:#b09ab0;line-height:1.8;">
            <strong style="color:#f0e6f0;">ПикмиПицца</strong> — это уютная пиццерия с душой. 
            Мы готовим пиццу по традиционным рецептам с любовью к каждому ингредиенту.
            Наша миссия — дарить вкус и радость каждому гостю. 🍕❤️
          </div>
        `,
      'delivery-info': `
          <span class="info-icon">🚚</span>
          <div style="color:#b09ab0;line-height:1.8;">
            <div class="info-item"><span class="label">Стоимость доставки</span><span class="value">Бесплатно при заказе от 1000 ₽</span></div>
            <div class="info-item"><span class="label">Отдаленные районы</span><span class="value">+200 ₽ (бесплатно от 1500 ₽)</span></div>
            <div class="info-item"><span class="label">Время доставки</span><span class="value">30-60 минут</span></div>
            <div class="info-item"><span class="label">Районы</span><span class="value">Весь город</span></div>
          </div>
        `,
      'payment-info': `
          <span class="info-icon">💳</span>
          <div style="color:#b09ab0;line-height:1.8;">
            <div class="info-item"><span class="label">Онлайн</span><span class="value">Карты Visa, Mastercard, МИР</span></div>
            <div class="info-item"><span class="label">При получении</span><span class="value">Картой или наличными</span></div>
            <div class="info-item"><span class="label">Бонусы</span><span class="value">5% от суммы заказа</span></div>
          </div>
        `,
      oferta: `
          <span class="info-icon">📜</span>
          <div class="legal-text">
            <p><strong>Публичная оферта на оказание услуг по продаже и доставке пиццы</strong></p>
            <p>1. Настоящий документ является официальным предложением (публичной офертой) ИП Соколовой Д.В. (далее — «Исполнитель») и содержит все существенные условия по продаже и доставке продукции через сайт ПикмиПицца.</p>
            <p>2. Оформляя заказ на сайте, пользователь (далее — «Заказчик») подтверждает, что принимает условия настоящей оферты в полном объёме.</p>
            <p>3. <strong>Предмет оферты.</strong> Исполнитель обязуется передать Заказчику пиццу и сопутствующие товары в ассортименте и по ценам, указанным в каталоге на сайте, а Заказчик обязуется оплатить и принять заказ.</p>
            <p>4. <strong>Оформление заказа.</strong> Заказ считается оформленным с момента нажатия кнопки «Заказать» и получения Заказчиком уведомления о принятии заказа.</p>
            <p>5. <strong>Оплата.</strong> Оплата производится онлайн картой, картой курьеру или наличными при получении — способ выбирается Заказчиком при оформлении заказа.</p>
            <p>6. <strong>Доставка.</strong> Сроки и стоимость доставки указаны в разделе «Доставка». Минимальная сумма заказа для доставки — 500 ₽.</p>
            <p>7. <strong>Отмена и возврат.</strong> Заказчик вправе отменить заказ в течение 5 минут после оформления. Возврат денежных средств осуществляется на карту, с которой производилась оплата, в течение 10 рабочих дней.</p>
            <p>8. <strong>Ответственность сторон.</strong> Исполнитель не несёт ответственности за задержку доставки по причинам, не зависящим от Исполнителя (погодные условия, действия третьих лиц и т.п.).</p>
            <p>9. <strong>Срок действия оферты.</strong> Оферта действует бессрочно, до момента её отзыва Исполнителем.</p>
            <p style="color:#806a80;font-size:0.85rem;margin-top:16px;">Это демонстрационный (учебный) текст оферты для тестового проекта. Перед использованием на реальном сайте документ должен быть подготовлен или проверен юристом.</p>
          </div>
        `,
      privacy: `
          <span class="info-icon">🔒</span>
          <div class="legal-text">
            <p><strong>Политика обработки персональных данных</strong></p>
            <p>1. Настоящая Политика определяет порядок обработки персональных данных пользователей сайта ПикмиПицца в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».</p>
            <p>2. <strong>Оператор.</strong> Обработку данных осуществляет ИП Соколова Д.В., ИНН 590123456789, г. Пермь, ул. Студенческая, д. 22.</p>
            <p>3. <strong>Какие данные собираются:</strong> имя, номер телефона, адрес электронной почты, адрес доставки, история заказов, а также технические данные (файлы cookie, данные localStorage — тема оформления, содержимое корзины).</p>
            <p>4. <strong>Цели обработки:</strong> оформление и доставка заказов, обратная связь с пользователем, работа бонусной программы, улучшение качества сервиса.</p>
            <p>5. <strong>Передача третьим лицам.</strong> Данные могут передаваться курьерской службе исключительно в объёме, необходимом для доставки заказа. Данные не передаются third-party рекламным сетям.</p>
            <p>6. <strong>Срок хранения.</strong> Данные хранятся до момента отзыва согласия пользователем либо удаления учётной записи.</p>
            <p>7. <strong>Права пользователя.</strong> Пользователь вправе в любой момент отозвать согласие на обработку персональных данных, запросить удаление своих данных, написав на почту info@picmipizza.ru.</p>
            <p>8. <strong>Cookie и localStorage.</strong> Сайт использует файлы cookie и локальное хранилище браузера для сохранения темы оформления, корзины и данных сессии. Отключение cookie может ограничить работу отдельных функций сайта.</p>
            <p style="color:#806a80;font-size:0.85rem;margin-top:16px;">Это демонстрационный (учебный) текст политики для тестового проекта. Перед использованием на реальном сайте документ должен быть подготовлен или проверен юристом.</p>
          </div>
        `
    };

    infoModalTitle.textContent = titles[type] || 'Информация';
    infoModalContent.innerHTML = contents[type] || '<div style="color:#b09ab0;">Информация временно недоступна</div>';
    infoModal.classList.add('open');
  }

  // ---------- ОБРАТНАЯ СВЯЗЬ ----------
  function openFeedbackModal() {
    feedbackModal.classList.add('open');
    feedbackName.value = '';
    feedbackPhone.value = '';
    feedbackEmail.value = '';
    feedbackMessage.value = '';
    feedbackConsent.checked = false;
    consentError.classList.remove('show');
    clearFieldError(feedbackName, nameError);
    clearFieldError(feedbackPhone, phoneError);
    clearFieldError(feedbackEmail, emailError);
    clearFieldError(feedbackMessage, messageError);

    // Сброс reCAPTCHA
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.reset();
    }
  }

  function closeFeedbackModal() {
    feedbackModal.classList.remove('open');
  }

  // ---------- ИНТЕГРАЦИЯ С DADATA (БЕСПЛАТНО) ----------
  function searchAddresses(query) {
    if (query.length < 3) {
      addressSuggestions.classList.remove('show');
      return;
    }

    fetch('/api/suggest-address', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: query,
        count: 7,
        locations: [{ city: 'Пермь' }]
      })
    })
      .then(response => response.json())
      .then(data => {
        addressSuggestions.innerHTML = '';

        if (!data.suggestions || data.suggestions.length === 0) {
          addressSuggestions.classList.remove('show');
          return;
        }

        data.suggestions.forEach(item => {
          const div = document.createElement('div');
          div.className = 'suggestion-item';

          const address = item.value;

          div.innerHTML = `
          <span>${address}</span>
          <span class="sub-text">📍 Выбрать этот адрес</span>
        `;

          div.addEventListener('click', function () {
            deliveryAddress.value = address;
            deliveryAddress.classList.add('address-selected');
            addressHint.textContent = `✅ Адрес выбран: ${address}`;
            addressHint.className = 'address-hint success';
            addressSuggestions.classList.remove('show');
            updateSummary();
            updateOrderButton();
          });

          addressSuggestions.appendChild(div);
        });

        addressSuggestions.classList.add('show');
      })
      .catch(err => {
        console.error('Ошибка поиска:', err);
        addressHint.textContent = '❌ Ошибка поиска. Попробуйте еще раз.';
        addressHint.className = 'address-hint error';
      });
  }

  // ---------- СОБЫТИЯ ДЛЯ АДРЕСА ----------
  deliveryAddress.addEventListener('input', function () {
    const query = this.value.trim();

    if (query.length === 0) {
      addressSuggestions.classList.remove('show');
      addressHint.textContent = 'Начните вводить адрес для подсказок';
      addressHint.className = 'address-hint';
      this.classList.remove('address-selected');
      return;
    }

    if (query.length >= 3) {
      searchAddresses(query);
    } else {
      addressSuggestions.classList.remove('show');
      addressHint.textContent = 'Введите минимум 3 символа для поиска';
      addressHint.className = 'address-hint';
    }
  });

  deliveryAddress.addEventListener('blur', function () {
    setTimeout(() => {
      addressSuggestions.classList.remove('show');
    }, 200);
  });

  deliveryAddress.addEventListener('focus', function () {
    const query = this.value.trim();
    if (query.length >= 3) {
      searchAddresses(query);
    }
  });

  deliveryAddress.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = this.value.trim();
      if (query.length >= 3) {
        addressHint.textContent = '⏳ Ищем адрес...';
        addressHint.className = 'address-hint loading';

        fetch('/api/suggest-address', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: query,
            count: 1,
            locations: [{ city: 'Пермь' }]
          })
        })
          .then(response => response.json())
          .then(data => {
            if (data.suggestions && data.suggestions.length > 0) {
              const address = data.suggestions[0].value;

              this.value = address;
              this.classList.add('address-selected');

              addressHint.textContent = `✅ Адрес найден: ${address}`;
              addressHint.className = 'address-hint success';
              addressSuggestions.classList.remove('show');

              updateSummary();
              updateOrderButton();
            } else {
              addressHint.textContent = '❌ Адрес не найден. Проверьте правильность ввода.';
              addressHint.className = 'address-hint error';
            }
          })
          .catch(err => {
            addressHint.textContent = '❌ Ошибка проверки адреса';
            addressHint.className = 'address-hint error';
          });
      }
    }
  });

  function validateSelectedAddress() {
    const address = deliveryAddress.value.trim();

    if (!address) {
      addressHint.textContent = '⚠️ Пожалуйста, введите адрес доставки';
      addressHint.className = 'address-hint error';
      return false;
    }

    const isSelected = deliveryAddress.classList.contains('address-selected');

    if (!isSelected) {
      addressHint.textContent = '⚠️ Пожалуйста, выберите адрес из подсказок';
      addressHint.className = 'address-hint error';
      return false;
    }

    return true;
  }

  // ---------- ОГРАНИЧЕНИЯ НА ВВОД В ОБРАТНОЙ СВЯЗИ ----------
  // Телефон — только цифры, +, пробелы, скобки, дефис
  feedbackPhone.addEventListener('input', function () {
    // Разрешаем только цифры, +, пробелы, (, ), -
    this.value = this.value.replace(/[^0-9+\s()\-]/g, '');
    if (this.value.length > 18) {
      this.value = this.value.slice(0, 18);
    }
  });

  feedbackPhone.addEventListener('keydown', function (e) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key) && e.key !== '+' && e.key !== '(' && e.key !== ')' && e.key !== '-' && e.key !== ' ') {
      e.preventDefault();
    }
  });

  // Имя — только буквы, пробелы, дефис
  feedbackName.addEventListener('input', function () {
    this.value = this.value.replace(/[^а-яА-ЯёЁa-zA-Z\s\-]/g, '');
    if (this.value.length > 50) {
      this.value = this.value.slice(0, 50);
    }
  });

  // Сообщение — ограничение длины
  feedbackMessage.addEventListener('input', function () {
    if (this.value.length > 1000) {
      this.value = this.value.slice(0, 1000);
    }
  });

  // ---------- СОБЫТИЯ ----------
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', function () {
      const page = this.dataset.page;
      if (page === 'catalog') showCatalog();
      else if (page === 'promo') showPromo();
      else if (page === 'faq') showFAQ();
      else if (page === 'map') showMap();
      else if (page === 'contacts') openInfoModal('contacts');
      else showCatalog();
    });
  });

  document.querySelectorAll('.footer-link-btn[data-info]').forEach(btn => {
    btn.addEventListener('click', function () {
      const type = this.dataset.info;
      openInfoModal(type);
    });
  });

  // Ссылки "оферта / политика конфиденциальности" внутри форм и cookie-баннера
  document.addEventListener('click', function (e) {
    const link = e.target.closest('.legal-link');
    if (link) {
      e.preventDefault();
      openInfoModal(link.dataset.info);
    }
  });

  // ---------- COOKIE-БАННЕР ----------
  if (cookieBanner && cookieAcceptBtn) {
    if (!localStorage.getItem('pikmi-cookie-consent')) {
      cookieBanner.classList.add('show');
    }
    cookieAcceptBtn.addEventListener('click', function () {
      localStorage.setItem('pikmi-cookie-consent', '1');
      cookieBanner.classList.remove('show');
    });
  }

  // ---------- КОЛЕСО УДАЧИ ----------
  const WHEEL_PRIZES = [
    { icon: '🎁', label: 'Скидка 5%', short: '−5%', type: 'discount', value: 5, weight: 20 },
    { icon: '🎉', label: '+50 бонусов', short: '+50', type: 'bonus', value: 50, weight: 18 },
    { icon: '🍀', label: 'Скидка 10%', short: '−10%', type: 'discount', value: 10, weight: 14 },
    { icon: '🙃', label: 'Повезёт завтра', short: 'Мимо', type: 'none', value: 0, weight: 16 },
    { icon: '💎', label: '+100 бонусов', short: '+100', type: 'bonus', value: 100, weight: 10 },
    { icon: '🔥', label: 'Скидка 15%', short: '−15%', type: 'discount', value: 15, weight: 8 },
    { icon: '🍕', label: 'Пицца в подарок', short: 'Пицца', type: 'freepizza', value: 0, weight: 4 },
    { icon: '⭐', label: 'Скидка 7%', short: '−7%', type: 'discount', value: 7, weight: 10 }
  ];
  const WHEEL_COLORS = ['#ff2e7e', '#ffc93c', '#ff7aa8', '#ffe7a8', '#e8203c', '#ffd166', '#ff9ec0', '#ffd6e6'];
  const WHEEL_STORAGE_KEY = 'pikmi-wheel-last-spin';
  let wheelIsSpinning = false;
  let wheelCurrentRotation = 0;

  function renderWheelSvg() {
    if (!wheelGroup) return;
    const cx = 160, cy = 160, r = 152;
    const n = WHEEL_PRIZES.length;
    const sectorAngle = 360 / n;
    const pt = (radius, deg) => {
      const rad = deg * Math.PI / 180;
      return [cx + radius * Math.sin(rad), cy - radius * Math.cos(rad)];
    };
    const textStyle = 'fill:#fff;stroke:#3a1024;stroke-width:4.5px;paint-order:stroke;stroke-linejoin:round;text-anchor:middle;dominant-baseline:middle;font-family:Baloo 2,Segoe UI,sans-serif;font-weight:800;';
    let svg = '';
    for (let i = 0; i < n; i++) {
      const [x0, y0] = pt(r, i * sectorAngle);
      const [x1, y1] = pt(r, (i + 1) * sectorAngle);
      const mid = i * sectorAngle + sectorAngle / 2;
      const [ex, ey] = pt(118, mid);
      const [tx, ty] = pt(80, mid);
      const color = WHEEL_COLORS[i % WHEEL_COLORS.length];
      svg += `<path d="M${cx},${cy} L${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 0,1 ${x1.toFixed(1)},${y1.toFixed(1)} Z" fill="${color}" stroke="#ffffff" stroke-opacity="0.65" stroke-width="2"></path>`;
      svg += `<text x="${ex.toFixed(1)}" y="${ey.toFixed(1)}" transform="rotate(${mid.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)})" style="font-size:28px;dominant-baseline:middle;text-anchor:middle;">${WHEEL_PRIZES[i].icon}</text>`;
      svg += `<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" transform="rotate(${mid.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)})" style="${textStyle}font-size:21px;">${WHEEL_PRIZES[i].short}</text>`;
    }
    wheelGroup.innerHTML = svg;

    const legend = document.getElementById('wheelLegend');
    if (legend) {
      legend.innerHTML = WHEEL_PRIZES.map(p => `<span class="wheel-legend-chip">${p.icon} ${p.label}</span>`).join('');
    }
  }

  function getTodayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function hasSpunToday() {
    return localStorage.getItem(WHEEL_STORAGE_KEY) === getTodayStr();
  }

  function updateWheelAvailability() {
    if (!wheelFabBadge) return;
    if (hasSpunToday()) {
      wheelFabBadge.classList.add('hidden');
    } else {
      wheelFabBadge.classList.remove('hidden');
    }
  }

  function pickWeightedPrizeIndex() {
    const total = WHEEL_PRIZES.reduce((sum, p) => sum + p.weight, 0);
    let rnd = Math.random() * total;
    for (let i = 0; i < WHEEL_PRIZES.length; i++) {
      rnd -= WHEEL_PRIZES[i].weight;
      if (rnd <= 0) return i;
    }
    return WHEEL_PRIZES.length - 1;
  }

  // Лёгкий "дзынь" через Web Audio API — без внешних звуковых файлов
  function playChime(success) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const notes = success ? [523.25, 659.25, 783.99, 1046.5] : [392, 330];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        const start = ctx.currentTime + i * 0.11;
        gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.4);
      });
    } catch (e) { /* тихо игнорируем, если звук не поддерживается */ }
  }

  function launchConfetti() {
    const colors = ['#ff6b9d', '#c084e8', '#ffd166', '#7ddfa0', '#8fd3ff'];
    const count = 40;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (2.2 + Math.random() * 1.3) + 's';
      piece.style.animationDelay = (Math.random() * 0.3) + 's';
      piece.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
      piece.style.width = piece.style.height = (6 + Math.random() * 6) + 'px';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 4000);
    }
  }

  function applyWheelPrize(prize) {
    if (prize.type === 'discount') {
      promoApplied = true;
      promoDiscount = prize.value;
      freePizza = false;
      promoCode = 'WHEEL' + prize.value;
      renderCatalog(currentCategory);
      renderCart();
      updateOrderButton();
      updateSummary();
      return `Скидка ${prize.value}% уже применена к вашей корзине — переходите к оформлению заказа!`;
    }
    if (prize.type === 'bonus') {
      userData.bonuses = (userData.bonuses || 0) + prize.value;
      lifetimeBonusEarned += prize.value;
      if (bonusDisplay) bonusDisplay.textContent = `${userData.bonuses} ₽`;
      updateLoyaltyUI();
      persistAccount();
      return `Начислено ${prize.value} бонусных рублей на ваш счёт!`;
    }
    if (prize.type === 'freepizza') {
      promoApplied = true;
      promoDiscount = 0;
      freePizza = true;
      promoCode = 'WHEELPIZZA';
      renderCatalog(currentCategory);
      renderCart();
      updateOrderButton();
      updateSummary();
      return 'Пицца Маргарита будет добавлена в подарок при следующем заказе!';
    }
    return 'В этот раз без приза — но завтра будет новая попытка!';
  }

  function spinWheel() {
    if (wheelIsSpinning || hasSpunToday()) return;
    wheelIsSpinning = true;
    wheelSpinBtn.disabled = true;
    wheelStatus.textContent = 'Крутим... 🎡';
    unlockBadge('wheel_player');

    const targetIndex = pickWeightedPrizeIndex();
    const sectorAngle = 360 / WHEEL_PRIZES.length;
    const landingOffset = sectorAngle * targetIndex + sectorAngle / 2;
    const extraSpins = 5;
    wheelCurrentRotation += extraSpins * 360 + (360 - landingOffset) - (wheelCurrentRotation % 360);
    wheelSvg.style.transform = `rotate(${wheelCurrentRotation}deg)`;

    setTimeout(() => {
      const prize = WHEEL_PRIZES[targetIndex];
      const won = prize.type !== 'none';
      playChime(won);
      if (won) launchConfetti();

      localStorage.setItem(WHEEL_STORAGE_KEY, getTodayStr());
      updateWheelAvailability();

      wheelResultEmoji.textContent = prize.icon;
      wheelResultTitle.textContent = won ? prize.label : 'Почти повезло!';
      wheelResultText.textContent = applyWheelPrize(prize);
      wheelResult.style.display = 'block';
      wheelStatus.style.display = 'none';
      wheelSpinBtn.style.display = 'none';

      wheelIsSpinning = false;
    }, 4300);
  }

  if (wheelFabBtn && wheelModal) {
    renderWheelSvg();
    updateWheelAvailability();

    wheelFabBtn.addEventListener('click', function () {
      wheelModal.classList.add('open');
      wheelResult.style.display = 'none';
      wheelStatus.style.display = 'block';
      wheelSpinBtn.style.display = 'inline-block';
      if (hasSpunToday()) {
        wheelSpinBtn.disabled = true;
        wheelStatus.textContent = '✅ Вы уже крутили колесо сегодня — заходите завтра!';
      } else {
        wheelSpinBtn.disabled = false;
        wheelStatus.textContent = 'Один раз в день — крутите колесо и получайте приз!';
      }
    });

    wheelCloseBtn.addEventListener('click', () => wheelModal.classList.remove('open'));
    wheelModal.addEventListener('click', (e) => {
      if (e.target === wheelModal) wheelModal.classList.remove('open');
    });
    wheelSpinBtn.addEventListener('click', spinWheel);
    wheelResultCloseBtn.addEventListener('click', () => wheelModal.classList.remove('open'));
  }

  document.getElementById('openFeedbackBtn').addEventListener('click', openFeedbackModal);

  // ---------- ПРОГРЕСС УРОВНЯ ЛОЯЛЬНОСТИ ----------
  const LOYALTY_TIERS = [
    { name: 'Bronze', icon: '🥉', threshold: 0, discount: 5 },
    { name: 'Silver', icon: '🥈', threshold: 300, discount: 7 },
    { name: 'Gold', icon: '🥇', threshold: 800, discount: 10 },
    { name: 'Platinum', icon: '💎', threshold: 2000, discount: 15 }
  ];
  let lifetimeBonusEarned = userData.bonuses;

  function getLoyaltyInfo() {
    let current = LOYALTY_TIERS[0];
    let next = null;
    for (let i = 0; i < LOYALTY_TIERS.length; i++) {
      if (lifetimeBonusEarned >= LOYALTY_TIERS[i].threshold) {
        current = LOYALTY_TIERS[i];
        next = LOYALTY_TIERS[i + 1] || null;
      }
    }
    return { current, next };
  }

  function updateLoyaltyUI() {
    if (!loyaltyTierIcon) return;
    const { current, next } = getLoyaltyInfo();
    userData.discount = current.discount;
    loyaltyTierIcon.textContent = current.icon;
    loyaltyTierName.textContent = current.name;
    if (discountDisplay) discountDisplay.textContent = `${current.discount}%`;

    if (next) {
      const span = next.threshold - current.threshold;
      const progressed = lifetimeBonusEarned - current.threshold;
      const pct = Math.max(0, Math.min(100, Math.round((progressed / span) * 100)));
      loyaltyProgressFill.style.width = pct + '%';
      const remaining = Math.max(0, next.threshold - lifetimeBonusEarned);
      loyaltyProgressText.textContent = `До статуса ${next.name} ${next.icon} осталось ${remaining} ₽ бонусами`;
    } else {
      loyaltyProgressFill.style.width = '100%';
      loyaltyProgressText.textContent = '🏆 Максимальный уровень! Скидка 15% — навсегда ваша.';
    }
  }

  // ---------- ДОСТИЖЕНИЯ ----------
  const BADGES = [
    { id: 'first_order', icon: '🍕', name: 'Первый заказ' },
    { id: 'five_orders', icon: '🔥', name: '5 заказов' },
    { id: 'ten_orders', icon: '👑', name: '10 заказов' },
    { id: 'night_owl', icon: '🌙', name: 'Ночной заказ' },
    { id: 'big_spender', icon: '💸', name: 'Заказ от 2000 ₽' },
    { id: 'wheel_player', icon: '🎡', name: 'Испытал удачу' },
    { id: 'combo_master', icon: '🍕🥤', name: 'Комбо-мастер' },
    { id: 'reviewer', icon: '❤️', name: 'Оставил отзыв' }
  ];
  const BADGES_STORAGE_KEY = 'pikmi-badges';
  const ORDERS_COUNT_KEY = 'pikmi-lifetime-orders';

  function getUnlockedBadges() {
    try { return JSON.parse(localStorage.getItem(BADGES_STORAGE_KEY)) || []; } catch (e) { return []; }
  }

  function renderBadges() {
    if (!badgesGrid) return;
    const unlocked = getUnlockedBadges();
    badgesGrid.innerHTML = BADGES.map(b => `
      <div class="badge-item ${unlocked.includes(b.id) ? 'unlocked' : 'locked'}">
        <div class="badge-icon">${b.icon}</div>
        <div class="badge-name">${b.name}</div>
      </div>
    `).join('');
  }

  function unlockBadge(id) {
    const unlocked = getUnlockedBadges();
    if (unlocked.includes(id)) return;
    unlocked.push(id);
    localStorage.setItem(BADGES_STORAGE_KEY, JSON.stringify(unlocked));
    const badge = BADGES.find(b => b.id === id);
    renderBadges();
    if (badge) {
      playChime(true);
      launchConfetti();
      showSocialToast(badge.icon, '🏆 Новое достижение!', badge.name);
    }
  }

  function getLifetimeOrdersCount() {
    return Number(localStorage.getItem(ORDERS_COUNT_KEY) || '0');
  }

  function incrementLifetimeOrdersCount() {
    const n = getLifetimeOrdersCount() + 1;
    localStorage.setItem(ORDERS_COUNT_KEY, String(n));
    return n;
  }

  renderBadges();
  updateLoyaltyUI();

  // ---------- LIVE-УВЕДОМЛЕНИЯ (СОЦИАЛЬНОЕ ДОКАЗАТЕЛЬСТВО) ----------
  let socialToastTimer = null;

  function showSocialToast(emoji, title, text) {
    if (!socialToast) return;
    socialToastEmoji.textContent = emoji;
    socialToastTitle.textContent = title;
    socialToastText.textContent = text;
    socialToast.classList.add('show');
    clearTimeout(socialToastTimer);
    socialToastTimer = setTimeout(() => socialToast.classList.remove('show'), 5000);
  }

  const SOCIAL_NAMES = ['Ирина', 'Дмитрий', 'Анна', 'Максим', 'Ольга', 'Сергей', 'Юлия', 'Артём', 'Мария', 'Алексей', 'Наталья', 'Павел'];
  const SOCIAL_DISTRICTS = ['Ленинском районе', 'Мотовилихинском районе', 'Индустриальном районе', 'Свердловском районе', 'Дзержинском районе'];
  const SOCIAL_TOASTS_MAX = 6;
  let socialToastsShown = 0;

  function scheduleSocialToast() {
    if (socialToastsShown >= SOCIAL_TOASTS_MAX) return;
    const delay = 20000 + Math.random() * 25000;
    setTimeout(() => {
      const allPizzas = menuData.pizza.filter(p => !p.isConstructor);
      const pizza = allPizzas[Math.floor(Math.random() * allPizzas.length)];
      const name = SOCIAL_NAMES[Math.floor(Math.random() * SOCIAL_NAMES.length)];
      const district = SOCIAL_DISTRICTS[Math.floor(Math.random() * SOCIAL_DISTRICTS.length)];
      const minsAgo = 1 + Math.floor(Math.random() * 4);
      showSocialToast(pizza.emoji, `${name} из Перми`, `Только что заказал(а) «${pizza.name}» в ${district} · ${minsAgo} мин назад`);
      socialToastsShown++;
      scheduleSocialToast();
    }, delay);
  }

  scheduleSocialToast();

  infoModalCloseBtn.addEventListener('click', () => infoModal.classList.remove('open'));
  infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) infoModal.classList.remove('open');
  });

  feedbackCancelBtn.addEventListener('click', closeFeedbackModal);
  feedbackModal.addEventListener('click', (e) => {
    if (e.target === feedbackModal) closeFeedbackModal();
  });

  // Отправка формы обратной связи
  feedbackForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    let hasError = false;

    // Проверка имени
    if (!feedbackName.value.trim()) {
      showFieldError(feedbackName, nameError);
      hasError = true;
    } else {
      clearFieldError(feedbackName, nameError);
    }

    // Проверка телефона
    if (!feedbackPhone.value.trim()) {
      showFieldError(feedbackPhone, phoneError);
      hasError = true;
    } else {
      clearFieldError(feedbackPhone, phoneError);
    }

    // Проверка email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!feedbackEmail.value.trim() || !emailPattern.test(feedbackEmail.value.trim())) {
      showFieldError(feedbackEmail, emailError);
      hasError = true;
    } else {
      clearFieldError(feedbackEmail, emailError);
    }

    // Проверка сообщения
    if (!feedbackMessage.value.trim()) {
      showFieldError(feedbackMessage, messageError);
      hasError = true;
    } else {
      clearFieldError(feedbackMessage, messageError);
    }

    // Проверка reCAPTCHA
    if (typeof grecaptcha !== 'undefined') {
      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        recaptchaError.classList.add('show');
        hasError = true;
      } else {
        recaptchaError.classList.remove('show');
      }
    }

    // Проверка согласия на обработку персональных данных
    if (!feedbackConsent.checked) {
      consentError.classList.add('show');
      hasError = true;
    } else {
      consentError.classList.remove('show');
    }

    if (hasError) {
      return;
    }

    const name = feedbackName.value.trim();
    const phone = feedbackPhone.value.trim();
    const email = feedbackEmail.value.trim();
    const message = feedbackMessage.value.trim();

    try {
      const response = await fetch('https://test-frontend-socr.onrender.com/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, email, message })
      });

      const data = await response.json();

      if (data.success) {
        showNotification('success', '✅ Сообщение отправлено',
          `Спасибо, ${name}! Мы свяжемся с вами в ближайшее время.`);
        if (typeof grecaptcha !== 'undefined') {
          grecaptcha.reset();
        }
        closeFeedbackModal();
      } else {
        showNotification('error', '❌ Ошибка', data.error || 'Не удалось отправить сообщение');
        if (typeof grecaptcha !== 'undefined') {
          grecaptcha.reset();
        }
      }
    } catch (error) {
      console.error('Ошибка:', error);
      showNotification('error', '❌ Ошибка', 'Не удалось отправить сообщение. Проверьте подключение к интернету.');
      if (typeof grecaptcha !== 'undefined') {
        grecaptcha.reset();
      }
    }
  });

  categoryTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.category-tab');
    if (!tab) return;
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentCategory = tab.dataset.category;
    renderCatalog(currentCategory);
  });

  goToCartBtn.addEventListener('click', showCart);
  backToCatalogBtn.addEventListener('click', showCatalog);
  profileBtn.addEventListener('click', showProfile);
  closeProfileBtn.addEventListener('click', showCatalog);
  closePromoBtn.addEventListener('click', showCatalog);
  document.getElementById('closeFaqBtn')?.addEventListener('click', showCatalog);
  document.getElementById('closeMapBtn')?.addEventListener('click', showCatalog);

  // ---------- КАРТА ТОЧЕК САМОВЫВОЗА ----------
  let pickupMapInstance = null;
  let pickupMapMarkers = null;

  function initPickupMap() {
    const mapPointsList = document.getElementById('mapPointsList');
    if (mapPointsList) {
      mapPointsList.innerHTML = pickupPoints.map(p => `
        <div class="map-point-card">
          <div class="pickup-point-name">📍 ${p.name}</div>
          <div class="pickup-point-hours">🕐 ${p.hours}</div>
          <button class="map-point-select-btn" data-point-id="${p.id}">Выбрать эту точку</button>
        </div>
      `).join('');

      mapPointsList.querySelectorAll('.map-point-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          selectedPickupPointId = Number(btn.dataset.pointId);
          updatePickupAddressValue();
          renderPickupPoints();
          highlightSelectedMapMarker();
          document.querySelectorAll('.delivery-toggle button').forEach(b => b.classList.remove('active'));
          document.querySelector('.delivery-toggle button[data-type="pickup"]')?.classList.add('active');
          deliveryType = 'pickup';
          deliveryAddressBlock.style.display = 'none';
          pickupAddressBlock.style.display = 'block';
          deliveryAddress.disabled = true;
          showCart();
          showNotification('success', '📍 Точка выбрана', `Самовывоз: ${pickupPoints.find(p => p.id === selectedPickupPointId).address}`);
        });
      });
    }

    if (typeof ol === 'undefined') return;

    if (!pickupMapInstance) {
      pickupMapInstance = new ol.Map({
        target: 'pickupMap',
        layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
        controls: ol.control.defaults.defaults({ attribution: false, rotate: false })
          .extend([new ol.control.Attribution({ collapsible: false })]),
        interactions: ol.interaction.defaults.defaults({ mouseWheelZoom: false }),
        view: new ol.View({ center: ol.proj.fromLonLat([56.2502, 58.0105]), zoom: 12 })
      });

      pickupMapMarkers = pickupPoints.map(p => {
        const el = document.createElement('div');
        el.className = 'map-pin';
        el.textContent = '🍕';
        el.title = `${p.address} · ${p.hours}`;
        el.addEventListener('click', () => {
          selectedPickupPointId = p.id;
          updatePickupAddressValue();
          renderPickupPoints();
          highlightSelectedMapMarker();
          document.querySelectorAll('.delivery-toggle button').forEach(b => b.classList.remove('active'));
          document.querySelector('.delivery-toggle button[data-type="pickup"]')?.classList.add('active');
          deliveryType = 'pickup';
          deliveryAddressBlock.style.display = 'none';
          pickupAddressBlock.style.display = 'block';
          deliveryAddress.disabled = true;
          showCart();
        });
        pickupMapInstance.addOverlay(new ol.Overlay({
          element: el,
          position: ol.proj.fromLonLat([p.lng, p.lat]),
          positioning: 'bottom-center',
          offset: [0, -8]
        }));
        return { id: p.id, el };
      });
      highlightSelectedMapMarker();
    }

    setTimeout(() => {
      pickupMapInstance.updateSize();
      const extent = ol.extent.boundingExtent(pickupPoints.map(p => ol.proj.fromLonLat([p.lng, p.lat])));
      pickupMapInstance.getView().fit(extent, { padding: [60, 60, 60, 60], maxZoom: 15 });
    }, 100);
  }

  function highlightSelectedMapMarker() {
    if (!pickupMapMarkers) return;
    pickupMapMarkers.forEach(m => m.el.classList.toggle('selected', m.id === selectedPickupPointId));
  }

  // ---------- FAQ АККОРДЕОН ----------
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });
      if (!wasOpen) {
        item.classList.add('open');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + 20 + 'px';
      }
    });
  });

  // ---------- ТЁМНАЯ ТЕМА ----------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  function applyTheme(theme) {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  const savedTheme = localStorage.getItem('pikmi-theme') || 'light';
  applyTheme(savedTheme);
  themeToggleBtn.addEventListener('click', () => {
    const next = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    localStorage.setItem('pikmi-theme', next);
    applyTheme(next);
  });

  deliveryToggle.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    document.querySelectorAll('.delivery-toggle button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    deliveryType = btn.dataset.type;

    if (deliveryType === 'delivery') {
      deliveryAddressBlock.style.display = 'block';
      pickupAddressBlock.style.display = 'none';
      deliveryAddress.disabled = false;
    } else {
      deliveryAddressBlock.style.display = 'none';
      pickupAddressBlock.style.display = 'block';
      deliveryAddress.disabled = true;
    }
    updateOrderButton();
    updatePaymentUI();
    updateSummary();
  });

  // ---------- ТОЧКИ САМОВЫВОЗА: СПИСОК И ВЫБОР ----------
  const pickupPointsList = document.getElementById('pickupPointsList');

  function renderPickupPoints() {
    if (!pickupPointsList) return;
    pickupPointsList.innerHTML = pickupPoints.map(p => `
      <label class="pickup-point-item${p.id === selectedPickupPointId ? ' selected' : ''}" data-point-id="${p.id}">
        <input type="radio" name="pickupPoint" value="${p.id}" ${p.id === selectedPickupPointId ? 'checked' : ''}>
        <div class="pickup-point-info">
          <div class="pickup-point-name">📍 ${p.name}</div>
          <div class="pickup-point-hours">🕐 ${p.hours}</div>
        </div>
      </label>
    `).join('');

    pickupPointsList.querySelectorAll('input[name="pickupPoint"]').forEach(input => {
      input.addEventListener('change', () => {
        selectedPickupPointId = Number(input.value);
        updatePickupAddressValue();
        renderPickupPoints();
        highlightSelectedMapMarker();
        updateOrderButton();
        updateSummary();
      });
    });
  }

  function updatePickupAddressValue() {
    const point = pickupPoints.find(p => p.id === selectedPickupPointId) || pickupPoints[0];
    if (pickupAddress) pickupAddress.value = point.address;
  }

  updatePickupAddressValue();
  renderPickupPoints();

  deliveryAddress.addEventListener('input', updateOrderButton);
  if (orderConsent) orderConsent.addEventListener('change', updateOrderButton);

  paymentOptions.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    document.querySelectorAll('.payment-options button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    paymentMethod = btn.dataset.payment;
    updatePaymentUI();
  });

  cardNumber.addEventListener('input', function () { formatCardNumber(this); });
  cardExpiry.addEventListener('input', function () { formatCardExpiry(this); });
  cardCvv.addEventListener('input', function () { formatCardCvv(this); });

  cardNumber.addEventListener('keypress', function (e) {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') e.preventDefault();
  });
  cardExpiry.addEventListener('keypress', function (e) {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') e.preventDefault();
  });
  cardCvv.addEventListener('keypress', function (e) {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') e.preventDefault();
  });

  paymentCancelBtn.addEventListener('click', () => paymentModal.classList.remove('open'));
  paymentConfirmBtn.addEventListener('click', processOnlinePayment);
  paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) paymentModal.classList.remove('open');
  });

  useBonusesCheckbox.addEventListener('change', function () {
    useBonuses = this.checked;
    if (useBonuses && !isLoggedIn) {
      showNotification('error', '❌ Ошибка', 'Для использования бонусов необходимо войти в личный кабинет');
      this.checked = false;
      useBonuses = false;
      return;
    }
    if (useBonuses && cart.length === 0) {
      showNotification('error', '❌ Ошибка', 'Корзина пуста');
      this.checked = false;
      useBonuses = false;
      return;
    }
    updateSummary();
  });

  applyPromoBtn.addEventListener('click', applyPromo);
  promoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') applyPromo();
  });

  orderBtn.addEventListener('click', function () {
    if (!this.disabled) {
      if (deliveryType === 'delivery') {
        const isValidAddress = validateSelectedAddress();
        if (!isValidAddress) {
          deliveryAddress.scrollIntoView({ behavior: 'smooth', block: 'center' });
          deliveryAddress.focus();
          return;
        }
      }

      if (isLoggedIn) {
        placeOrder();
      } else {
        showNotification('info', '🔐 Требуется вход', 'Для оформления заказа нужно войти в личный кабинет');
        setTimeout(showProfile, 1500);
      }
    }
  });

  sizeSelector.addEventListener('click', (e) => {
    const btn = e.target.closest('.size-btn');
    if (!btn) return;
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateModalLivePrice();
  });

  document.getElementById('toppingsGroup')?.addEventListener('change', updateModalLivePrice);

  modalCancelBtn.addEventListener('click', closeModal);
  modalAddBtn.addEventListener('click', addToCartFromModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  });

  registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  });

  loginBtn.addEventListener('click', login);
  registerBtn.addEventListener('click', register);
  logoutBtn.addEventListener('click', logout);

  document.getElementById('loginPassword').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') login();
  });
  document.getElementById('regPassword').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') register();
  });

  // ---------- ПРОМОКОДЫ: КОПИРОВАНИЕ ПО КЛИКУ ----------
  document.querySelectorAll('.promo-code[data-copy]').forEach(codeEl => {
    codeEl.addEventListener('click', () => {
      const text = codeEl.textContent.trim();
      const done = () => {
        codeEl.classList.add('copied');
        showNotification('success', '📋 Скопировано', `Промокод <b>${text}</b> скопирован в буфер обмена`);
        setTimeout(() => codeEl.classList.remove('copied'), 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        done();
      }
    });
  });

  // ---------- ТАЙМЕР "СЧАСТЛИВЫЕ ЧАСЫ" (14:00–16:00) ----------
  const happyHourEl = document.getElementById('happyHourCountdown');
  const happyHourBanner = document.getElementById('happyHourBanner');
  const happyHourStatus = document.getElementById('happyHourStatus');
  const happyHourCountdownLabel = document.getElementById('happyHourCountdownLabel');

  function formatDiff(diffMs) {
    const h = String(Math.floor(diffMs / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diffMs % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diffMs % 60000) / 1000)).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  function updateHappyHourCountdown() {
    if (!happyHourEl) return;
    const now = new Date();
    const hour = now.getHours();
    const isActive = hour >= 14 && hour < 16;

    if (isActive) {
      const end = new Date(now);
      end.setHours(16, 0, 0, 0);
      happyHourEl.textContent = formatDiff(end - now);
      happyHourCountdownLabel.textContent = 'До конца акции осталось';
      happyHourStatus.textContent = '🟢 Акция активна сейчас';
      happyHourBanner.classList.remove('inactive');
    } else {
      const start = new Date(now);
      start.setHours(14, 0, 0, 0);
      if (now >= start) start.setDate(start.getDate() + 1);
      happyHourEl.textContent = formatDiff(start - now);
      happyHourCountdownLabel.textContent = 'Акция начнётся через';
      happyHourStatus.textContent = '⚪ Сейчас акция не действует';
      happyHourBanner.classList.add('inactive');
    }
  }

  if (happyHourEl) {
    updateHappyHourCountdown();
    setInterval(updateHappyHourCountdown, 1000);
  }

  // ---------- ИНИЦИАЛИЗАЦИЯ ----------
  renderAddToOrder();
  renderCatalog('pizza');
  renderCart();
  updateBadge();
  updateOrderButton();
  updateSummary();
  updatePaymentUI();
  updateProfileUI();
  showCatalog();

})();