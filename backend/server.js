require('dotenv').config(); // ← НОВАЯ СТРОКА: подключаем "сейф" с паролями

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ===== ГЛАВНОЕ: РАЗДАЧА HTML, CSS, JS =====
app.use(express.static(__dirname + '/..'));

// ===== НАСТРОЙКА ПОЧТЫ =====
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,   // ← БЫЛО: 'dashkacv8@gmail.com'
    pass: process.env.EMAIL_PASS    // ← БЫЛО: 'ymwy ixrw hwjg yefd'
  }
});

// ===== ЭНДПОИНТ ДЛЯ ОТПРАВКИ ПОЧТЫ =====
app.post('/api/feedback', async (req, res) => {
  console.log('📩 Получен запрос:', req.body);

  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Все поля обязательны для заполнения'
    });
  }

  try {
    const mailOptions = {
      from: `"ПикмиПицца" <${transporter.options.auth.user}>`,
      to: process.env.EMAIL_USER,   // ← БЫЛО: 'dashkacv8@gmail.com'
      subject: `📩 Новое сообщение от ${name}`,
      html: `
        <h2>📩 Новое сообщение с сайта ПикмиПицца</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong></p>
        <p style="background:#f5f5f5;padding:15px;border-radius:8px;">${message}</p>
        <hr>
        <p style="color:#999;font-size:12px;">Время: ${new Date().toLocaleString('ru-RU')}</p>
      `,
      text: `Новое сообщение с сайта ПикмиПицца\n\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nСообщение: ${message}`
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Письмо отправлено!');

    res.json({
      success: true,
      message: 'Сообщение успешно отправлено'
    });

  } catch (error) {
    console.error('❌ Ошибка:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка при отправке: ' + error.message
    });
  }
});

// ===== НОВЫЙ ЭНДПОИНТ: ПОДСКАЗКИ АДРЕСОВ (DADATA) =====
app.post('/api/suggest-address', async (req, res) => {
  try {
    const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + process.env.DADATA_API_KEY,
        'X-Secret': process.env.DADATA_SECRET_KEY
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('❌ Ошибка DaData:', error);
    res.status(500).json({ error: 'Не удалось получить подсказки адресов' });
  }
});

// ===== ЗАПУСК СЕРВЕРА =====
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📁 Отдаю файлы из: ${__dirname + '/..'}`);
  console.log(`📧 Почта настроена для: ${transporter.options.auth.user}`);
});