(function () {
  // ---------- ДАННЫЕ ----------
  const menuData = {
    pizza: [
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
  const ordersList = document.getElementById('ordersList');

  // Модалки
  const infoModal = document.getElementById('infoModal');
  const infoModalTitle = document.getElementById('infoModalTitle');
  const infoModalContent = document.getElementById('infoModalContent');
  const infoModalCloseBtn = document.getElementById('infoModalCloseBtn');

  const feedbackModal = document.getElementById('feedbackModal');
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackCancelBtn = document.getElementById('feedbackCancelBtn');

  // Поля для обратной связи
  const feedbackName = document.getElementById('feedbackName');
  const feedbackPhone = document.getElementById('feedbackPhone');
  const feedbackMessage = document.getElementById('feedbackMessage');

  // Элементы ошибок
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const messageError = document.getElementById('messageError');
  const recaptchaError = document.getElementById('recaptchaError');

  // Уведомления
  const notifOverlay = document.getElementById('notificationOverlay');
  const notifIcon = document.getElementById('notifIcon');
  const notifTitle = document.getElementById('notifTitle');
  const notifMessage = document.getElementById('notifMessage');
  const notifBtn = document.getElementById('notifBtn');

  // ---------- СИСТЕМА УВЕДОМЛЕНИЙ ----------
  function showNotification(type, title, message) {
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
  }

  function closeNotification() {
    notifOverlay.classList.remove('open');
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
  function renderCatalog(category = currentCategory) {
    pizzaGrid.innerHTML = '';
    const items = menuData[category] || [];

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'pizza-card';
      card.dataset.id = item.id;

      const count = getItemCount(item);
      const isInCart = count > 0;

      card.innerHTML = `
          <div class="pizza-emoji">${item.emoji}</div>
          <div class="pizza-name">${item.name}</div>
          <div class="pizza-desc">${item.desc}</div>
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

      const addBtn = card.querySelector('.add-to-cart-btn');
      if (addBtn) {
        addBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (category === 'pizza') {
            openModal(item.id);
          } else {
            addNonPizzaToCart(item, category);
          }
        });
      }

      const plusBtn = card.querySelector('.plus-btn');
      if (plusBtn) {
        plusBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (category === 'pizza') {
            openModal(item.id);
          } else {
            addNonPizzaToCart(item, category);
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

  // ---------- ДОБАВЛЕНИЕ/УДАЛЕНИЕ ТОВАРОВ ----------
  function addNonPizzaToCart(item, category) {
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
    const toppingsPrice = toppings.length * 30;
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

    closeModal();
    renderCatalog(currentCategory);
    renderCart();
    updateBadge();
    updateOrderButton();
    updateSummary();
    checkPromoValidity();
  }

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

      div.querySelector('.add-btn').addEventListener('click', () => {
        addNonPizzaToCart(item, item.category);
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
    }
  }

  // ---------- КНОПКА ЗАКАЗАТЬ ----------
  function updateOrderButton() {
    const total = getCartTotal();
    const hasItems = cart.length > 0;
    const hasAddress = deliveryType === 'delivery' ? deliveryAddress.value.trim().length > 0 : true;
    const isDelivery = deliveryType === 'delivery';
    const minOrder = isDelivery ? total >= 1000 : true;

    const isValid = hasItems && hasAddress && minOrder;

    orderBtn.classList.toggle('active', isValid);
    orderBtn.disabled = !isValid;

    if (!hasItems) {
      orderBtn.textContent = '🛒 Корзина пуста';
    } else if (isDelivery && total < 1000) {
      orderBtn.textContent = `🚚 Для доставки нужно заказать от 1000 ₽ (сейчас ${total} ₽)`;
    } else if (!hasAddress) {
      orderBtn.textContent = '📍 Укажите адрес';
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

    let bonusText = '';
    if (isLoggedIn) {
      userData.bonuses += bonusEarned - bonusDiscount;
      if (userData.bonuses < 0) userData.bonuses = 0;
      bonusText = `\nБонус начислен: ${bonusEarned} ₽\nВсего бонусов: ${userData.bonuses} ₽`;
      userData.orders.unshift({
        id: userData.orders.length + 1,
        date: new Date().toLocaleDateString('ru-RU'),
        items: orderItems,
        total: finalTotal,
        bonus: bonusEarned
      });
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

    showNotification('gold', '🎉 Заказ оформлен!', message);

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
    } else if (code) {
      promoMessage.textContent = '❌ Неверный промокод';
      promoMessage.className = 'promo-message error';
      showNotification('error', '❌ Неверный промокод', 'Проверьте правильность ввода');
    }
  }

  // ---------- НАВИГАЦИЯ ----------
  function showCatalog() {
    catalogPage.style.display = 'block';
    cartPage.classList.remove('active');
    cartPage.style.display = 'none';
    profilePage.classList.remove('active');
    profilePage.style.display = 'none';
    promoPage.classList.remove('active');
    promoPage.style.display = 'none';
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelector('.nav-item[data-page="catalog"]')?.classList.add('active');
    renderCatalog(currentCategory);
  }

  function showCart() {
    catalogPage.style.display = 'none';
    cartPage.style.display = 'block';
    cartPage.classList.add('active');
    profilePage.classList.remove('active');
    profilePage.style.display = 'none';
    promoPage.classList.remove('active');
    promoPage.style.display = 'none';
    renderCart();
    updateOrderButton();
    updateSummary();
    renderAddToOrder();
    updatePaymentUI();
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  }

  function showProfile() {
    catalogPage.style.display = 'none';
    cartPage.classList.remove('active');
    cartPage.style.display = 'none';
    profilePage.style.display = 'block';
    profilePage.classList.add('active');
    promoPage.classList.remove('active');
    promoPage.style.display = 'none';
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    updateProfileUI();
  }

  function showPromo() {
    catalogPage.style.display = 'none';
    cartPage.classList.remove('active');
    cartPage.style.display = 'none';
    profilePage.classList.remove('active');
    profilePage.style.display = 'none';
    promoPage.style.display = 'block';
    promoPage.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelector('.nav-item[data-page="promo"]')?.classList.add('active');
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

      ordersList.innerHTML = '';
      if (userData.orders.length === 0) {
        ordersList.innerHTML = '<div style="color:#806a80;text-align:center;padding:20px;">У вас пока нет заказов</div>';
      } else {
        userData.orders.forEach(order => {
          const div = document.createElement('div');
          div.className = 'order-item';
          div.innerHTML = `
              <div class="order-header">
                <span class="order-id">Заказ #${order.id}</span>
                <span class="order-date">${order.date}</span>
              </div>
              <div class="order-details">${order.items}</div>
              <div class="order-details" style="color:#7ddfa0;">Сумма: ${order.total} ₽ | Бонус: +${order.bonus} ₽</div>
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

  function login() {
    const phone = document.getElementById('loginPhone').value;
    const code = document.getElementById('loginCode').value;

    if (phone && code) {
      isLoggedIn = true;
      userData.name = 'Анна';
      userData.phone = phone;
      updateProfileUI();
      showNotification('success', '✅ Вход выполнен', `Добро пожаловать, ${userData.name}!`);
      showCatalog();
    } else {
      showNotification('error', '❌ Ошибка входа', 'Пожалуйста, заполните все поля');
    }
  }

  function register() {
    const name = document.getElementById('regName').value;
    const phone = document.getElementById('regPhone').value;

    if (name && phone) {
      isLoggedIn = true;
      userData.name = name;
      userData.phone = phone;
      userData.bonuses = 100;
      userData.discount = 5;
      userData.savedCard = '**** 4589';
      updateProfileUI();
      showNotification('success', '✅ Регистрация выполнена', `Добро пожаловать, ${name}! Вам начислено 100 бонусов 🎉`);
      showCatalog();
    } else {
      showNotification('error', '❌ Ошибка', 'Пожалуйста, заполните все поля');
    }
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
      'payment-info': '💳 Оплата'
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
    feedbackMessage.value = '';
    clearFieldError(feedbackName, nameError);
    clearFieldError(feedbackPhone, phoneError);
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
  const DADATA_API_KEY = 'c037b41df093a6c96f63af6c109d56589931f74f';

  function searchAddresses(query) {
    if (query.length < 3) {
      addressSuggestions.classList.remove('show');
      return;
    }

    const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + DADATA_API_KEY
      },
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

        div.addEventListener('click', function() {
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
  deliveryAddress.addEventListener('input', function() {
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

  deliveryAddress.addEventListener('blur', function() {
    setTimeout(() => {
      addressSuggestions.classList.remove('show');
    }, 200);
  });

  deliveryAddress.addEventListener('focus', function() {
    const query = this.value.trim();
    if (query.length >= 3) {
      searchAddresses(query);
    }
  });

  deliveryAddress.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = this.value.trim();
      if (query.length >= 3) {
        addressHint.textContent = '⏳ Ищем адрес...';
        addressHint.className = 'address-hint loading';

        const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + DADATA_API_KEY
          },
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
  feedbackPhone.addEventListener('input', function() {
    // Разрешаем только цифры, +, пробелы, (, ), -
    this.value = this.value.replace(/[^0-9+\s()\-]/g, '');
    if (this.value.length > 18) {
      this.value = this.value.slice(0, 18);
    }
  });

  feedbackPhone.addEventListener('keydown', function(e) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key) && e.key !== '+' && e.key !== '(' && e.key !== ')' && e.key !== '-' && e.key !== ' ') {
      e.preventDefault();
    }
  });

  // Имя — только буквы, пробелы, дефис
  feedbackName.addEventListener('input', function() {
    this.value = this.value.replace(/[^а-яА-ЯёЁa-zA-Z\s\-]/g, '');
    if (this.value.length > 50) {
      this.value = this.value.slice(0, 50);
    }
  });

  // Сообщение — ограничение длины
  feedbackMessage.addEventListener('input', function() {
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

  document.getElementById('openFeedbackBtn').addEventListener('click', openFeedbackModal);

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

    if (hasError) {
      return;
    }

    const name = feedbackName.value.trim();
    const phone = feedbackPhone.value.trim();
    const message = feedbackMessage.value.trim();

    try {
      const response = await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, message })
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

  deliveryAddress.addEventListener('input', updateOrderButton);

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
  });

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

  document.getElementById('loginCode').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') login();
  });
  document.getElementById('regPhone').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') register();
  });

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