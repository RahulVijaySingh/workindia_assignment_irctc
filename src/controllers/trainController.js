const db = require("../config/db");

exports.addTrain = (req, res) => {
  const { name, source, destination, total_seats } = req.body;
  const available_seats = total_seats;

  db.query(
    "INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)",
    [name, source, destination, total_seats, available_seats],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Train added successfully" });
    }
  );
};

exports.getTrains = (req, res) => {
  const { source, destination } = req.query;

  db.query(
    "SELECT * FROM trains WHERE source = ? AND destination = ?",
    [source, destination],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};
