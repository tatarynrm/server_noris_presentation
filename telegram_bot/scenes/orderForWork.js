const { Scenes, Markup } = require("telegraf");
const pool = require("../db/db");
const { main_keyboard } = require("../keyboards");
const sendMainKeyboard = require("../functions/sendMainKeyboard");

// Об'єкт для зберігання вибраних категорій для кожного користувача
let userSelections = {};

const orderForWorkScene = new Scenes.WizardScene(
  "order_for_work", // Назва сцени
  async (ctx) => {
    // Перша сцена: Відправляємо кнопки для вибору категорії
    const userId = ctx.from.id;

    // Ініціалізація списку вибраних категорій для користувача
    if (!userSelections[userId]) {
      userSelections[userId] = [];
    }

    // Відправляємо кнопки
    await ctx.reply(
      "Оберіть категорію, яка вас цікавить?",
      Markup.inlineKeyboard([
        [ // Перша кнопка
          Markup.button.callback(
            userSelections[userId].includes("web_development")
              ? "✅ Послуги для розробки веб-сайтів та веб-додатків 🌐"
              : "Послуги для розробки веб-сайтів та веб-додатків 🌐",
            "web_development"
          )
        ],
        [ // Друга кнопка
          Markup.button.callback(
            userSelections[userId].includes("bots_automation")
              ? "✅ Послуги для розробки ботів та автоматизації 🤖"
              : "Послуги для розробки ботів та автоматизації 🤖",
            "bots_automation"
          )
        ],
        [ // Третя кнопка
          Markup.button.callback(
            userSelections[userId].includes("database_development")
              ? "✅ Розробка / оптимізація баз даних 📊"
              : "Розробка / оптимізація баз даних 📊",
            "database_development"
          )
        ],
        [ // Четверта кнопка
          Markup.button.callback(
            userSelections[userId].includes("cms_crm")
              ? "✅ Розробка систем управління вмістом (CMS) та CRM 🖥️"
              : "Розробка систем управління вмістом (CMS) та CRM 🖥️",
            "cms_crm"
          )
        ],
        [ // П'ята кнопка
          Markup.button.callback(
            userSelections[userId].includes("payment_systems")
              ? "✅ Розробка та налаштування електронних платіжних систем 💳"
              : "Розробка та налаштування електронних платіжних систем 💳",
            "payment_systems"
          )
        ],
        [ // Шоста кнопка
          Markup.button.callback(
            userSelections[userId].includes("mobile_app_development")
              ? "✅ Розробка мобільних додатків 📱"
              : "Розробка мобільних додатків 📱",
            "mobile_app_development"
          )
        ],
        [ // Сьома кнопка
          Markup.button.callback(
            userSelections[userId].includes("seo_marketing")
              ? "✅ SEO та онлайн-маркетинг 📈"
              : "SEO та онлайн-маркетинг 📈",
            "seo_marketing"
          )
        ]
      ])
    );

    return ctx.wizard.next();
  },

  async (ctx) => {
    // Обробка натискання на інлайн кнопки
    console.log(ctx.callbackQuery);

    if (ctx.callbackQuery) {
      const action = ctx.callbackQuery.data; // Отримуємо дію кнопки
      const userId = ctx.from.id;

      // Якщо категорія не була вибрана, додаємо її, якщо була вибрана, видаляємо
      const selectedOptions = userSelections[userId];

      // Якщо категорія вже є у виборі — видаляємо її
      if (selectedOptions.includes(action)) {
        const index = selectedOptions.indexOf(action);
        selectedOptions.splice(index, 1); // Видаляємо категорію
      } else {
        selectedOptions.push(action); // Додаємо категорію
      }

      // Оновлюємо повідомлення та клавіатуру з вибраними категоріями
      await ctx.editMessageText(
        "Оберіть категорії, які вас цікавлять. Ви можете вибрати кілька:",
        Markup.inlineKeyboard([
          [ // Перша кнопка
            Markup.button.callback(
              selectedOptions.includes("web_development")
                ? "✅ Послуги для розробки веб-сайтів та веб-додатків 🌐"
                : "Послуги для розробки веб-сайтів та веб-додатків 🌐",
              "web_development"
            )
          ],
          [ // Друга кнопка
            Markup.button.callback(
              selectedOptions.includes("bots_automation")
                ? "✅ Послуги для розробки ботів та автоматизації 🤖"
                : "Послуги для розробки ботів та автоматизації 🤖",
              "bots_automation"
            )
          ],
          [ // Третя кнопка
            Markup.button.callback(
              selectedOptions.includes("database_development")
                ? "✅ Розробка / оптимізація баз даних 📊"
                : "Розробка / оптимізація баз даних 📊",
              "database_development"
            )
          ],
          [ // Четверта кнопка
            Markup.button.callback(
              selectedOptions.includes("cms_crm")
                ? "✅ Розробка систем управління вмістом (CMS) та CRM 🖥️"
                : "Розробка систем управління вмістом (CMS) та CRM 🖥️",
              "cms_crm"
            )
          ],
          [ // П'ята кнопка
            Markup.button.callback(
              selectedOptions.includes("payment_systems")
                ? "✅ Розробка та налаштування електронних платіжних систем 💳"
                : "Розробка та налаштування електронних платіжних систем 💳",
              "payment_systems"
            )
          ],
          [ // Шоста кнопка
            Markup.button.callback(
              selectedOptions.includes("mobile_app_development")
                ? "✅ Розробка мобільних додатків 📱"
                : "Розробка мобільних додатків 📱",
              "mobile_app_development"
            )
          ],
          [ // Сьома кнопка
            Markup.button.callback(
              selectedOptions.includes("seo_marketing")
                ? "✅ SEO та онлайн-маркетинг 📈"
                : "SEO та онлайн-маркетинг 📈",
              "seo_marketing"
            )
          ]
        ])
      );

      // Далі відправляємо або оновлюємо кнопку "Надіслати", якщо вибрано хоча б одну категорію
      if (selectedOptions.length > 0) {
        await ctx.reply("Натисніть 'Надіслати', щоб підтвердити вибір", {
          reply_markup: {
            keyboard: [
              [{ text: "✅ Надіслати" }],
              [{ text: "❌ Повернутись назад" }],
            ],
            resize_keyboard: true,
          },
        });
        return ctx.wizard.next(); // Переходимо до наступного кроку
      } else {
        // Якщо не вибрано жодної категорії
        await ctx.reply("Будь ласка, оберіть хоча б одну категорію", {
          reply_markup: {
            keyboard: [
              [{ text: "❌ Повернутись назад" }],
            ],
            resize_keyboard: true,
          },
        });
      }
    }
  },

  async (ctx) => {
    // Перевірка на натискання кнопки "Надіслати"
    if (ctx.message && ctx.message.text === "✅ Надіслати") {
      const userId = ctx.from.id;
      const selectedOptions = userSelections[userId];

      // Перетворення вибраних пунктів на текст
      const selectedText = selectedOptions.join(", ");

      // Зберігаємо повідомлення та вибрані категорії в базі даних
      const username = ctx.message.from.username;
      const first_name = ctx.message.from.first_name;
      const client_id = ctx.message.from.id;

      const insertMessage = await pool.query(
        "INSERT INTO order_for_work_noris_development (order_class, client_id, username, first_name) VALUES ($1, $2, $3, $4)",
        [
          "Запит на розробку: " + selectedText,
          client_id,
          username,
          first_name
        ]
      );

      const admins = await pool.query(`SELECT * FROM noris_development_admin_users`);
      const { rows } = admins;

      if (rows.length > 0) {
        for (let i = 0; i < rows.length; i++) {
          const element = rows[i];
          await ctx.telegram.sendMessage(element.tg_id, `\nПрийшов новий запит на розробку:\n\n\n${selectedText} \n\nВід @${username}`, { parse_mode: "HTML" });
        }
      }

      // Повідомлення про успішну відправку
      await ctx.reply(
        `Ваш запит успішно надіслано!\n\nОчікуйте на відповідь.`,
        {
          reply_markup: {
            keyboard: main_keyboard,
            resize_keyboard: true,
          },
        }
      );
      if (userSelections[userId]) {
        userSelections[userId] = [];
      }
      // Завершуємо сцену після надсилання
      return ctx.scene.leave();
    } else if (ctx.message && ctx.message.text === "❌ Повернутись назад") {
      await ctx.reply("Оберіть, який саме пункт меню вас цікавить", {
        reply_markup: {
          keyboard: main_keyboard,
          resize_keyboard: true,
        },
      });

      return ctx.scene.leave(); // Завершуємо сцену
    }
  }
);


orderForWorkScene.hears('❌ Повернутись назад',async ctx =>{
  await ctx.scene.leave();
  await sendMainKeyboard(ctx)

})
module.exports = orderForWorkScene;
