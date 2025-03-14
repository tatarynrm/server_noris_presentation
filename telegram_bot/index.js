const { Telegraf, Markup, Scenes, session } = require("telegraf");
const messageScene = require("./scenes/messageToAdminScene");
const {
  main_keyboard,
  admin_main_keyboard,
  admin_menu_keyboard,
} = require("./keyboards");
const {
  createOrUpdateUser,
  checkIsAdmin,
} = require("./controllers/user.controller");
const { keyboard } = require("telegraf/markup");
const adminFunctions = require("./bot_admin_panel/admin");
const orderForWorkScene = require("./scenes/orderForWork");
const sendMainKeyboard = require("./functions/sendMainKeyboard");
const infoPagesShow = require("./bot_info_pages");
// Ваша API Token для Telegram бота
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
// Створення і налаштування сцени

const stage = new Scenes.Stage([messageScene,orderForWorkScene]);

// Налаштовуємо бота
bot.use(session());
bot.use(stage.middleware());

// Обробник для команд
bot.start(async (ctx) => {

  createOrUpdateUser(ctx);
  sendMainKeyboard(ctx)
});

bot.hears("Послуги для розробки веб-сайтів та веб-додатків 🌐", async (ctx) => {
  await ctx.reply(` ✅ Landing Page (Цільова сторінка):\n
  🌐 Розробка односторінкових сайтів для маркетингових кампаній, продуктів або послуг.
  📱 Адаптивний дизайн під мобільні пристрої.
  📊 Інтеграція з аналітикою (Google Analytics).
  📝 Створення форм для збору контактних даних (lead capture).
  ⚡ Оптимізація швидкості завантаження сторінки.\n
  `);
  await ctx.reply(` ✅ Багатосторінкові сайти:\n
  🏢 Розробка корпоративних сайтів.
  📰 Блоги та новинні портали.
  🛍️ Сайти для онлайн-магазинів (E-commerce).
  🔍 Базова SEO-оптимізація для пошукових систем.
  🛠️ Інтеграція з системами управління контентом (CMS), такими як WordPress, Joomla, Drupal.
  🖥️ Створення спеціалізованих панелей адміністрування.\n`);
  await ctx.reply(` ✅ Інтернет-магазини:\n
  🏪 Розробка магазинів на базі платформ (Shopify, WooCommerce, Magento).
  💳 Інтеграція з платіжними системами (Stripe, PayPal, LiqPay, тощо).
  🛒 Управління товарами (категорії, фільтри, пошук).
  📱 Мобільна версія магазину та адаптивний дизайн.
  📦 Інтеграція з системами управління складом.\n`);

  await ctx.reply(` ✅ Web-програмування і інтерфейси:\n
  🖥️ Розробка складних веб-додатків.
  📈 Спеціалізовані рішення для бізнесу (CRM, ERP).
  💬 Розробка інтерактивних елементів (чати, калькулятори, інтерактивні мапи).
  ⚙️ Використання фреймворків (React, Angular, Vue.js).
  🔌 Розробка API для інтеграції з іншими системами.\n`);

  await ctx.reply("Оберіть свою категорію", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "❌ Повернутись назад",
          },
        ],
        [
          {
            text: "✅ Landing Page (Цільова сторінка)",
          },
        ],
        [
          {
            text: "✅ Багатосторінкові сайти",
          },
        ],
        [
          {
            text: "✅ Інтернет-магазини",
          },
        ],
        [
          {
            text: "✅ Web-програмування і інтерфейси",
          },
        ],
      ],
      resize_keyboard: true,
    },
  });
});
bot.hears("Послуги для розробки ботів та автоматизації 🤖", async (ctx) => {
  await ctx.reply(` ✅ Розробка чат-ботів:\n
  🤖 Створення бота для Telegram, Facebook Messenger, WhatsApp тощо.
  🔄 Інтеграція з різними системами (CRM, ERP, служби підтримки).
  💬 Налаштування автоматичних відповідей та сценаріїв.
  🧠 Використання штучного інтелекту для аналізу запитів та навчання бота.
  📊 Аналітика взаємодії з користувачем та зворотний зв'язок.\n
  `);
  await ctx.reply(` ✅ Автоматизація процесів:\n
  ⚙️ Автоматизація бізнес-процесів та задач (управління завданнями, комунікація).
  📝 Інтеграція з сервісами для обробки даних та документів.
  📅 Створення автоматичних нагадувань, планувальників та календарів.
  🛠️ Інтеграція з популярними платформами для автоматизації (Zapier, Integromat).
  🧑‍💻 Налаштування розсилок та автоматичних повідомлень.\n`);

  await ctx.reply(` ✅ Інтеграція з іншими системами:\n
  🔗 API інтеграція з різними онлайн-сервісами та платформами.
  📥 Збір даних з веб-сайтів та інших джерел.
  🛠️ Розробка кастомізованих API для автоматизації робочих процесів.
  💼 Інтеграція з ERP, CRM системами для синхронізації даних.\n`);

  await ctx.reply(` ✅ Розробка системи підтримки:\n
  📞 Створення чат-ботів для підтримки клієнтів та обробки запитів.
  🕒 Автоматизація роботи з чеками, замовленнями, відгуками.
  💬 Інтеграція з системами управління зверненнями (ticketing systems).
  🤖 Чат-боти для FAQ та обробки часто запитуваних питань.\n`);

  await ctx.reply("Оберіть свою категорію", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "❌ Повернутись назад",
          },
        ],
        [
          {
            text: "✅ Розробка чат-ботів",
          },
        ],
        [
          {
            text: "✅ Автоматизація процесів",
          },
        ],
        [
          {
            text: "✅ Інтеграція з іншими системами",
          },
        ],
        [
          {
            text: "✅ Розробка системи підтримки",
          },
        ],
      ],
      resize_keyboard: true,
    },
  });
});

bot.hears("Розробка / оптимізація баз даних 📊", async (ctx) => {
  await ctx.reply(` ✅ Розробка баз даних:\n
    💻 Створення структури бази даних (таблиці, індекси, зв'язки).
    🧩 Проектування реляційних та нереляційних баз даних.
    🔧 Проектування схеми даних для бізнес-вимог.
    📊 Оптимізація запитів для ефективної роботи з великими об'ємами даних.
    🛠️ Використання СУБД (MySQL, PostgreSQL, MongoDB та інші).\n`);

  await ctx.reply(` ✅ Оптимізація баз даних:\n
    ⚡ Оптимізація таблиць та індексів для кращої швидкості доступу до даних.
    🛠️ Аналіз та оптимізація запитів для покращення продуктивності.
    🔍 Виявлення та усунення "вузьких місць" в роботі бази даних.
    📈 Тюнінг СУБД для зниження навантаження та покращення ефективності.
    🧰 Використання інструментів для моніторингу бази даних та аналізу її стану.\n`);

  await ctx.reply("Оберіть свою категорію", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "❌ Повернутись назад",
          },
        ],
        [
          {
            text: "✅ Розробка баз даних",
          },
        ],
        [
          {
            text: "✅ Оптимізація баз даних",
          },
        ],
      ],
      resize_keyboard: true,
    },
  });
});

bot.hears("Розробка систем управління вмістом (CMS) та CRM 🖥️", async (ctx) => {
  await ctx.reply(` ✅ Розробка систем управління вмістом (CMS):\n
    📄 Створення та налаштування системи для керування контентом веб-сайтів.
    🔧 Інтеграція з популярними CMS платформами: WordPress, Joomla, Drupal.
    🛠️ Розробка кастомних плагінів та функцій для CMS.
    🌐 Адаптація CMS для специфічних потреб бізнесу.
    📊 Інтеграція з аналітичними інструментами та SEO оптимізація.\n`);

  await ctx.reply(` ✅ Розробка та налаштування CRM систем:\n
    📈 Створення кастомних CRM систем для управління взаєминами з клієнтами.
    🔄 Інтеграція з іншими бізнес-системами (ERP, маркетингові платформи).
    🧑‍💻 Налаштування автоматичних задач, нагадувань та робочих процесів.
    📊 Інтеграція аналітики для відстеження ефективності роботи з клієнтами.
    ⚙️ Розробка інтерфейсів для зручного доступу до інформації про клієнтів.\n`);

  await ctx.reply("Оберіть свою категорію", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "❌ Повернутись назад",
          },
        ],
        [
          {
            text: "✅ Розробка CMS",
          },
        ],
        [
          {
            text: "✅ Розробка CRM",
          },
        ],
      ],
      resize_keyboard: true,
    },
  });
});
bot.hears(
  "Розробка та налаштування електронних платіжних систем 💳",
  async (ctx) => {
    await ctx.reply(` ✅ Розробка платіжних систем:\n
    💳 Інтеграція з платіжними шлюзами (Stripe, PayPal, LiqPay, тощо).
    🔒 Забезпечення безпеки транзакцій (SSL, шифрування).
    🌐 Налаштування мультивалютності для обробки платіжних операцій.
    🛠️ Створення та налаштування API для платіжних систем.
    📊 Інтеграція з системами аналітики та звітності по транзакціям.\n`);

    await ctx.reply(` ✅ Налаштування платіжних систем для онлайн-магазинів:\n
    🏪 Інтеграція з платформами для онлайн-магазинів (Shopify, WooCommerce, Magento).
    💳 Налаштування платіжних систем для прийому карток та електронних гаманців.
    🛒 Створення безпечних форм оплати.
    📱 Адаптація платіжних систем для мобільних версій магазинів.
    🧰 Інтеграція з платформами для управління замовленнями та оплатами.\n`);

    await ctx.reply("Оберіть свою категорію", {
      reply_markup: {
        keyboard: [
          [
            {
              text: "❌ Повернутись назад",
            },
          ],
          [
            {
              text: "✅ Розробка платіжних систем",
            },
          ],
          [
            {
              text: "✅ Налаштування платіжних систем для онлайн-магазинів",
            },
          ],
        ],
        resize_keyboard: true,
      },
    });
  }
);

bot.hears("Розробка мобільних додатків 📱", async (ctx) => {
  await ctx.reply(` ✅ Розробка мобільних додатків для Android:\n
    📱 Створення нативних додатків для Android за допомогою Java, Kotlin.
    🧑‍💻 Розробка адаптивних інтерфейсів для різних розмірів екрану.
    🔧 Інтеграція з API та сторонніми сервісами.
    🛠️ Налаштування push-сповіщень та геолокації.
    ⚡ Оптимізація продуктивності та швидкості роботи додатку.\n`);

  await ctx.reply(` ✅ Розробка мобільних додатків для iOS:\n
    🍏 Створення нативних додатків для iOS за допомогою Swift, Objective-C.
    🧑‍💻 Розробка адаптивних інтерфейсів для різних моделей iPhone та iPad.
    🔧 Інтеграція з API та сторонніми сервісами.
    🛠️ Налаштування push-сповіщень та інтерфейсів для зручної взаємодії.
    ⚡ Оптимізація продуктивності та швидкості роботи додатку.\n`);

  await ctx.reply(` ✅ Кросплатформна розробка мобільних додатків:\n
    🤖 Розробка додатків за допомогою фреймворків Flutter, React Native.
    🌐 Адаптація додатків для одночасної роботи на Android та iOS.
    🔄 Інтеграція з API та сторонніми платформами для підтримки обох ОС.
    🧑‍💻 Розробка адаптивних інтерфейсів для різних платформ.
    🛠️ Оптимізація продуктивності та взаємодії з користувачем.\n`);

  await ctx.reply("Оберіть свою категорію", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "❌ Повернутись назад",
          },
        ],
        [
          {
            text: "✅ Розробка мобільних додатків для Android",
          },
        ],
        [
          {
            text: "✅ Розробка мобільних додатків для iOS",
          },
        ],
        [
          {
            text: "✅ Кросплатформна розробка мобільних додатків",
          },
        ],
      ],
      resize_keyboard: true,
    },
  });
});

bot.hears("SEO та онлайн-маркетинг 📈", async (ctx) => {
  await ctx.reply(`✅ SEO-оптимізація:\n
    🔍 Аналіз та оптимізація структури сайту для покращення видимості в пошукових системах.
    📝 Створення та оптимізація контенту (тексти, мета-теги, заголовки).
    🌐 Внутрішня та зовнішня SEO-оптимізація (link building, аналіз зворотних посилань).
    📊 Аналіз ефективності SEO та налаштування звітності (Google Analytics, Google Search Console).
    ⚡ Оптимізація швидкості завантаження сторінок для покращення позицій у результатах пошуку.\n`);

  await ctx.reply(`✅ Контекстна реклама та PPC (Pay-Per-Click):\n
    📈 Налаштування рекламних кампаній у Google Ads та інших платформах.
    🔍 Таргетинг на конкретну аудиторію та аналіз ключових слів.
    💸 Створення стратегій для максимального ROI (повернення інвестицій).
    🧑‍💻 Налаштування та моніторинг кампаній для досягнення бізнес-цілей.
    📊 Аналіз результатів та коригування стратегій для покращення результатів.\n`);

  await ctx.reply(`✅ Соціальні мережі та SMM (Social Media Marketing):\n
    📱 Створення та реалізація стратегій просування у соціальних мережах.
    📈 Реклама на платформах: Facebook, Instagram, LinkedIn, TikTok тощо.
    📊 Аналіз ефективності контенту та взаємодії з аудиторією.
    🧑‍💻 Розробка контент-плану та креативних рекламних кампаній.
    💬 Залучення та утримання клієнтів через соціальні платформи.\n`);

  await ctx.reply(`✅ E-mail маркетинг та автоматизація:\n
    📧 Налаштування автоматичних розсилок та email кампаній.
    🔄 Сегментація аудиторії для персоналізованих пропозицій.
    📊 Створення аналітики та звітів по результатам розсилок.
    🧑‍💻 Налаштування автоматизації для підвищення ефективності маркетингу.
    💬 Створення стратегій для залучення нових підписників та утримання поточних.\n`);

  await ctx.reply("Оберіть свою категорію", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "❌ Повернутись назад",
          },
        ],
        [
          {
            text: "✅ SEO-оптимізація",
          },
        ],
        [
          {
            text: "✅ Контекстна реклама та PPC",
          },
        ],
        [
          {
            text: "✅ Соціальні мережі та SMM",
          },
        ],
        [
          {
            text: "✅ E-mail маркетинг та автоматизація",
          },
        ],
      ],
      resize_keyboard: true,
    },
  });
});

bot.hears("Хто Я ? 👨‍🦱", async (ctx) => {
  await ctx.replyWithHTML(
    `<b>Привіт! Мене звати Роман 👋</b>\n\n
      🧑‍💻 Я займаюсь програмуванням вже більше <b>7 років</b>, і за цей час встиг попрацювати з різними технологіями та інструментами.\n
      💻 Моя спеціалізація охоплює розробку веб-додатків, мобільних додатків, а також автоматизацію бізнес-процесів.\n
      🌐 Я маю досвід роботи з такими мовами програмування як <i>JavaScript</i>, <i>Python</i>, <i>PHP</i>, а також з фреймворками, такими як <i>React</i>, <i>Node.js</i> та іншими.\n
      🚀 Моя мета — створювати інноваційні та ефективні рішення для бізнесу, допомагаючи оптимізувати робочі процеси та покращити досвід користувачів.\n
      💬 Завжди відкритий до нових викликів і можливостей для розвитку. Якщо ти хочеш поговорити про технічні питання чи просто знайти спільну мову — звертайся!`,
    {
      reply_markup: {
        keyboard: [
          [{ text: "❌ Повернутись назад" }],
          [{ text: "Відкрити мої контакти 📃" }],
        ],
        resize_keyboard: true,
      },
    }
  );

setTimeout(async ()=>{
  // Додаємо друге повідомлення про плюси роботи з вами
  await ctx.replyWithHTML(
    `<b>Чому варто працювати зі мною, а не з великими компаніями?</b>\n\n
      🤝 **Персоналізований підхід**: Я завжди зосереджуюсь на кожному клієнті, пропонуючи індивідуальні рішення для твоїх потреб.\n
      🏆 **Гнучкість і швидкість**: У порівнянні з великими компаніями, я швидше приймаю рішення і можу швидше реагувати на зміни в проекті.\n
      💡 **Інноваційність**: Я постійно слідкую за новими технологіями та підходами, що дозволяє мені пропонувати свіжі ідеї та ефективні рішення.\n
      🔧 **Без бюрократії**: Працюючи зі мною, ти отримуєш прямий контакт без зайвих посередників — це дозволяє спрощувати процеси та знижувати витрати.\n
      🚀 **Висока якість**: Я зосереджуюсь на деталях і намагаюся завжди досягти найкращих результатів у своїй роботі, гарантуючи якість виконання.\n
      💬 **Простота комунікації**: Я завжди готовий до відкритого діалогу, тож наші співпраця буде максимально ефективною та комфортною.`
  );
},2000)



});

bot.hears("Відкрити мої контакти 📃", async (ctx) => {
  await ctx.replyWithHTML(
    `📧 Моя електронна адреса: <a href="mailto:tatarynrm@gmail.com">tatarynrm@gmail.com</a>\n\n\n🗨️ Мій нікнейм у Telegram: <a href="https://t.me/I_Dont_Have_A_Phone_Number">@I_Dont_Have_A_Phone_Number</a>`
  );
});


bot.hears("❌ Повернутись назад", async (ctx) => {
  if (await checkIsAdmin(ctx)) {
    await ctx.reply("Вітаю!\n\nОберіть, який саме пункт меню вас цікавить", {
      reply_markup: {
        keyboard: admin_main_keyboard,
        resize_keyboard: true,
      },
    });
  } else {
    await ctx.reply("Вітаю!\n\nОберіть, який саме пункт меню вас цікавить", {
      reply_markup: {
        keyboard: main_keyboard,
        resize_keyboard: true,
      },
    });
  }
});

bot.hears(`🔔 Повідомлення мені 📩`, async (ctx) => {
  await ctx.scene.enter("message_scene");
});



  bot.hears('📨 Надіслати заявку?',async ctx =>{
    await ctx.scene.enter('order_for_work')
  })

adminFunctions(bot)
infoPagesShow(bot)

module.exports = bot;
