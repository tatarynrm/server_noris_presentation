const { checkAllUsers, getMessagesWithLimit } = require("../controllers/admin.controller");
const { checkIsAdmin } = require("../controllers/user.controller");
const bot = require("../index");
const { admin_menu_keyboard } = require("../keyboards");

let currentOffset = 0; // Початковий offset для пагінації
let limit = 1; // Ліміт на кількість повідомлень (наприклад, 1)

console.log('limit',limit);
console.log('currentOffset',currentOffset);

function adminFunctions(bot) {
  bot.hears("Адмін панель", async (ctx) => {
    if (checkIsAdmin(ctx)) {
      await ctx.reply("ACCESS GRANTED", {
        reply_markup: {
          keyboard: admin_menu_keyboard,
          resize_keyboard: true,
        },
      });
    } else {
      return await ctx.reply("ACCESS DENIED");
    }
  });

  bot.hears("К-сть користувачів бота", async (ctx) => {
    const result = await checkAllUsers();
    await ctx.reply(result.rows[0].count);
  });
  bot.hears("❓ Отримати нове повідомлення", async (ctx) => {
    try {

      // Отримуємо нові повідомлення з бази даних з лімітом і відступом
      const messages = await getMessagesWithLimit(limit, currentOffset);
  
      if (messages.length > 0) {
        const message = messages[0]; // Показуємо перше повідомлення
        currentOffset += limit; // Збільшуємо offset для отримання наступного повідомлення
  
        await ctx.reply(message.text, {
          reply_markup: {
            keyboard: [
              [{ text: "Наступне повідомлення" }],
              [{text:'АДМІН МЕНЮ'}]
            ],
            resize_keyboard: true,
          }
        });
      } else {
         currentOffset = 0; // Початковий offset для пагінації
         limit = 1; // Ліміт на кількість повідомлень (наприклад, 1)
        await ctx.reply("Немає нових повідомлень.");
        
      }
    } catch (error) {
      console.error("Error in bot handler:", error);
    }
  });
  
  // Обробка кнопки "Наступне повідомлення"
bot.hears("Наступне повідомлення", async (ctx) => {
    try {
      // Отримуємо наступні повідомлення з лімітом і відступом
      const messages = await getMessagesWithLimit(limit, currentOffset);
  
      if (messages.length > 0) {
        const message = messages[0]; // Показуємо перше наступне повідомлення
        currentOffset += limit; // Збільшуємо offset для наступного запиту
        console.log('limit',limit);
        console.log('currentOffset',currentOffset);
        await ctx.reply(message.text, {
          reply_markup: {
            keyboard: [
              [{ text: "Наступне повідомлення" }],
              [{text:'АДМІН МЕНЮ'}]
            ],
            resize_keyboard: true,
          }
        });
      } else {
        await ctx.reply("Немає більше повідомлень.",{
            reply_markup: {
                keyboard: [
                  [{text:'АДМІН МЕНЮ'}]
                ],
                resize_keyboard: true,
              }
        });
      }
    } catch (error) {
      console.error("Error in bot handler:", error);
    }
  });


  bot.hears('АДМІН МЕНЮ',async ctx =>{
    await ctx.reply("Адміністративне меню", {
        reply_markup: {
          keyboard: admin_menu_keyboard,
          resize_keyboard: true,
        },
      });
  })
}

module.exports = adminFunctions;
