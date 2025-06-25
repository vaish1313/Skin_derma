const express = require('express');
const router = express.Router();
const db = require("../db"); // your MySQL connection

// GET doctors by city
router.get('/', (req, res) => {
  const city = req.query.city;

  const query = `
    SELECT 
      d.doctor_id,
      d.name,
      d.city,
      d.phone,
      d.clinic_address,
      d.experience,
      d.specialization,
      d.photo_url,
      IFNULL(AVG(r.rating), 0) AS rating,
      COUNT(r.review_id) AS review_count
    FROM doctors d
    LEFT JOIN reviews r ON d.doctor_id = r.doctor_id
    WHERE d.city = ?
    GROUP BY d.doctor_id
    ORDER BY rating DESC;
  `;

  db.query(query, [city], (err, results) => {
    if (err) {
      console.error("Error fetching doctors:", err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

module.exports = router;
