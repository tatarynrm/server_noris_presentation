const pool = require("../db/pool");



// Клас OrderController
class OrderController {
  // Створення нового замовлення
  static async createOrder(req, res) {
    const { categories, email, name, phone } = req.body;
console.log(req.body);

    const query = `
      INSERT INTO orders_from_noris_development (categories,email,name,phone)
      VALUES ($1, $2, $3, $4)
      RETURNING id, categories, email, name, phone;
    `;

    try {
      
      const result = await pool.query(query, [categories, email, name, phone]);
      res.status(201).json(result.rows[0]);  // Відправляємо створене замовлення
    } catch (err) {
      console.error('Помилка при створенні замовлення:', err);
      res.status(500).json({ error: 'Виникла помилка при створенні замовлення' });
    }
  }

  // Отримання всіх замовлень
  static async getAllOrders(req, res) {
    const query = 'SELECT * FROM orders';

    try {
      const result = await pool.query(query);
      res.status(200).json(result.rows);  // Відправляємо всі замовлення
    } catch (err) {
      console.error('Помилка при отриманні замовлень:', err);
      res.status(500).json({ error: 'Виникла помилка при отриманні замовлень' });
    }
  }

  // Отримання замовлення за ID
  static async getOrderById(req, res) {
    const { id } = req.params;

    const query = 'SELECT * FROM orders WHERE id = $1';

    try {
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Замовлення не знайдено' });
      }
      res.status(200).json(result.rows[0]);  // Відправляємо знайдене замовлення
    } catch (err) {
      console.error('Помилка при отриманні замовлення:', err);
      res.status(500).json({ error: 'Виникла помилка при отриманні замовлення' });
    }
  }
}

module.exports = OrderController;
