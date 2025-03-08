const { Scenes, Markup } = require("telegraf");
const {
  admin_message_keyboard,
  main_keyboard,
  admin_message_keyboard_first_step,
  admin_message_keyboard_last_step,
} = require("../keyboards");
const pool = require("../db/db");

// Сцена для збору повідомлення
const messageScene = new Scenes.WizardScene(
  "message_scene", // Назва сцени
  async (ctx) => {
    // Перша сцена: Запитуємо користувача про повідомлення
    await ctx.reply("Введіть ваше повідомлення:", {
      reply_markup: {
        keyboard: admin_message_keyboard_first_step,
        resize_keyboard: true,
      },
    });
    return ctx.wizard.next();
  },
  async (ctx) => {
    // Друга сцена: Отримуємо текст від користувача
    const userMessage = ctx.message.text;
    await ctx.reply("Надсилаємо?", {
      reply_markup: {
        keyboard: admin_message_keyboard_last_step,
        resize_keyboard: true,
      },
    });
    ctx.wizard.state.userMessage = userMessage; // Зберігаємо повідомлення в стан сцени
    return ctx.wizard.next();
  },
  async (ctx) => {
    // Перевірка на кнопку "Надіслати"
    const username = ctx.message.from.username;
    const first_name = ctx.message.from.first_name;
    const client_id = ctx.message.from.id;
    if (ctx.message.text === "Надіслати") {
      const userMessage = ctx.wizard.state.userMessage; // Отримуємо збережене повідомлення

      const insertMessage = await pool.query(
        "insert into messages_from_noris_development (text,client_id,client_username,client_first_name) values($1,$2,$3,$4)",
        [userMessage, client_id, username, first_name]
      );
      // Ваш код для відправки повідомлення
      await ctx.reply(
        `Повідомлення: "${userMessage}" успішно відправлене. Очікуйте на відповідь.`,
        {
          reply_markup: {
            keyboard: main_keyboard,
            resize_keyboard: true,
          },
        }
      );

      // Завершуємо сцену після надсилання повідомлення
      return ctx.scene.leave();
    } else {
      // Якщо користувач натиснув "Повернутись назад"
      await ctx.reply("Вітаю!\n\nОберіть, який саме пункт меню вас цікавить", {
        reply_markup: {
          keyboard: main_keyboard,
          resize_keyboard: true,
        },
      });

      return ctx.scene.leave(); // Завершуємо сцену, якщо натиснуто повернення назад
    }
  }
);

// Обробка кнопки "Повернутись назад"
messageScene.hears("❌ Повернутись назад", async (ctx) => {
  await ctx.reply("Вітаю!\n\nОберіть, який саме пункт меню вас цікавить", {
    reply_markup: {
      keyboard: main_keyboard,
      resize_keyboard: true,
    },
  });
  await ctx.scene.leave(); // Завершуємо сцену
});

module.exports = messageScene;
