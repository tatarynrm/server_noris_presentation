const pool = require("../db/db");

class UserController {
  // Створення нового користувача або оновлення існуючого
  static async createOrUpdateUser(ctx) {
    try {
      // Перевірка, чи існує користувач в базі за telegramId
      const tg_id = ctx.message.from.id;
      const username = ctx.message.from.username;
      const first_name = ctx.message.from.first_name;
      const is_premium = ctx.message.from.is_premium || false;

      const result = await pool.query(
        "SELECT * FROM noris_development_bot_users WHERE tg_id = $1",
        [tg_id]
      );

      if (result.rows.length > 0) {
        // Якщо користувач існує, оновлюємо його дані
        const user = result.rows[0];
        await pool.query(
          "UPDATE noris_development_bot_users SET username = $1, first_name = $2,is_premium = $3  WHERE tg_id = $4",
          [username, first_name, is_premium, tg_id]
        );
      } else {
        // Якщо користувач не існує, створюємо нового
        await pool.query(
          "INSERT INTO noris_development_bot_users (tg_id, username, first_name,is_premium) VALUES ($1, $2, $3,$4)",
          [tg_id, username, first_name, is_premium]
        );
      }
    } catch (error) {
      console.error("Error in createOrUpdateUser:", error);
    }
  }
  static async checkIsAdmin(ctx) {
    try {
      // Перевірка, чи існує користувач в базі за telegramId
      const tg_id = ctx.message.from.id;
      const username = ctx.message.from.username;
      const first_name = ctx.message.from.first_name;
      const is_premium = ctx.message.from.is_premium || false;

      const result = await pool.query(
        "SELECT * FROM noris_development_admin_users WHERE tg_id = $1",
        [tg_id]
      );

      if (result.rows.length > 0) {
        // Якщо користувач існує, оновлюємо його дані
        const user = result.rows[0];
  
        if (user?.is_admin) {
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      console.error("Error in createOrUpdateUser:", error);
    }
  }
  //   // Отримання інформації про користувача за його telegramId
  //   static async getUserById(telegramId) {
  //     try {
  //       const user = await User.findOne({ telegramId });
  //       return user;  // Повертаємо користувача або null, якщо не знайдено
  //     } catch (error) {
  //       console.error('Error in getUserById:', error);
  //       return null;
  //     }
  //   }

  //   // Оновлення даних користувача (наприклад, зміна імені, мови тощо)
  //   static async updateUser(telegramId, updatedData) {
  //     try {
  //       const user = await User.findOneAndUpdate(
  //         { telegramId },
  //         { $set: updatedData },
  //         { new: true }  // Повертає оновлену версію користувача
  //       );
  //       return user;
  //     } catch (error) {
  //       console.error('Error in updateUser:', error);
  //       return null;
  //     }
  //   }

  //   // Видалення користувача
  //   static async deleteUser(telegramId) {
  //     try {
  //       await User.deleteOne({ telegramId });
  //       console.log(`User deleted: ${telegramId}`);
  //     } catch (error) {
  //       console.error('Error in deleteUser:', error);
  //     }
  //   }

  //   // Перевірка, чи є користувач адміністратором
  //   static async isAdmin(telegramId) {
  //     try {
  //       const user = await User.findOne({ telegramId });
  //       return user && user.isAdmin;
  //     } catch (error) {
  //       console.error('Error in isAdmin:', error);
  //       return false;
  //     }
  //   }
}

module.exports = UserController;
