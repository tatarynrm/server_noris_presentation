const { checkIsAdmin } = require("../controllers/user.controller");
const { admin_main_keyboard, main_keyboard } = require("../keyboards");

const sendMainKeyboard = async (ctx) => {
  // Отримуємо статус адміністратора один раз
  const isAdmin = await checkIsAdmin(ctx);
  // Використовуємо результат перевірки статусу адміністратора
  if (isAdmin === true) {
    return await ctx.reply(
      "Вітаю!\n\nОберіть, який саме пункт меню вас цікавить",
      {
        reply_markup: {
          keyboard: admin_main_keyboard,
          resize_keyboard: true,
        },
      }
    );
  } else {
    return await ctx.reply(
      "Вітаю!\n\nОберіть, який саме пункт меню вас цікавить",
      {
        reply_markup: {
          keyboard: main_keyboard,
          resize_keyboard: true,
        },
      }
    );
  }
};

module.exports = sendMainKeyboard;
