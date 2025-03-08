require("dotenv").config();
const { Telegraf } = require("telegraf");
const express = require("express");
const { main_keyboard } = require("./telegram_bot/keyboards");
const bot = require("./telegram_bot");
const app = express();




// Налаштування сервера Express
app.get("/", (req, res) => {
  res.send("Сервер працює! Це стартова сторінка.");
});

bot.launch();
// Запуск Express сервера
const port = process.env.PORT || 8801;
app.listen(port, () => {
  console.log(`Сервер працює на порту ${port}`);
});
