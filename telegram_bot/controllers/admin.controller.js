const pool = require("../db/db");

class AdminController {
  static async checkAllUsers() {
    try {
      const result = await pool.query(
        "SELECT  COUNT(*) from noris_development_bot_users"
      );

      return result;
    } catch (error) {
      console.error("Error in createOrUpdateUser:", error);
    }
  }
  static async getMessagesWithLimit(limit, offset) {
    try {
      const result = await pool.query(
        "SELECT * FROM messages_from_noris_development ORDER BY created_at DESC LIMIT $1 OFFSET $2",
        [limit, offset]
      );
      return result.rows;  // Повертаємо масив повідомлень
    } catch (error) {
      console.error("Error in getMessagesWithLimit:", error);
    }
  }
}

module.exports = AdminController;
