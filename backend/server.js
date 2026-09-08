const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path'); // ← ДОБАВИТЬ

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ===== ГЛАВНОЕ: РАЗДАЧА HTML, CSS, JS =====
// Эта строчка говорит: "Отдавай файлы из папки НА УРОВЕНЬ ВЫШЕ"
app.use(express.static(__dirname + '/..')); // ← ЭТА СТРОЧКА ВАЖНА!

// ===== НАСТРОЙКА ПОЧТЫ =====
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'dashkacv8@gmail.com',
    pass: 'ymwy ixrw hwjg yefd'
  }
});

// ===== ЭНДПОИНТ ДЛЯ ОТПРАВКИ =====
app.post('/api/feedback', async (req, res) => {
  console.log('📩 Получен запрос:', req.body);

  const { name, phone, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({
      success: false,
      error: 'Все поля обязательны для заполнения'
    });
  }

  try {
    const mailOptions = {
      from: `"ПикмиПицца" <${transporter.options.auth.user}>`,
      to: 'dashkacv8@gmail.com',
      subject: `📩 Новое сообщение от ${name}`,
      html: `
        <h2>📩 Новое сообщение с сайта ПикмиПицца</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Сообщение:</strong></p>
        <p style="background:#f5f5f5;padding:15px;border-radius:8px;">${message}</p>
        <hr>
        <p style="color:#999;font-size:12px;">Время: ${new Date().toLocaleString('ru-RU')}</p>
      `,
      text: `Новое сообщение от ${name}\nТелефон: ${phone}\nСообщение: ${message}`
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

// ===== ЗАПУСК СЕРВЕРА =====
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`📁 Отдаю файлы из: ${__dirname + '/..'}`);
  console.log(`📧 Почта настроена для: ${transporter.options.auth.user}`);
});