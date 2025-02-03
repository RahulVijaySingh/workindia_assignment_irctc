const db = require("../config/db");

const bookSeat = (req, res) => {
  const { user_id, train_id } = req.body;

  if (!user_id || !train_id) {
    return res.status(400).json({ error: "User ID and Train ID are required" });
  }

  db.getConnection((err, connection) => {
    if (err) return res.status(500).json({ error: err.message });

    // Start transaction to prevent race conditions
    connection.beginTransaction(async (err) => {
      if (err) {
        connection.release();
        return res.status(500).json({ error: err.message });
      }

      try {
        // Step 1: Lock the train record and check available seats
        const [seats] = await connection
          .promise()
          .query("SELECT available_seats FROM trains WHERE id = ? FOR UPDATE", [
            train_id,
          ]);

        if (seats.length === 0) {
          throw { status: 404, message: "Train not found" };
        }

        if (seats[0].available_seats <= 0) {
          throw { status: 400, message: "No seats available" };
        }

        // Step 2: Reduce the available seat count
        await connection
          .promise()
          .query(
            "UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?",
            [train_id]
          );

        // Step 3: Insert the booking record
        await connection
          .promise()
          .query("INSERT INTO bookings (user_id, train_id) VALUES (?, ?)", [
            user_id,
            train_id,
          ]);

        // Step 4: Commit the transaction
        await connection.promise().commit();

        res.json({ message: "Seat booked successfully" });
      } catch (error) {
        await connection.promise().rollback();
        res
          .status(error.status || 500)
          .json({ error: error.message || "Internal Server Error" });
      } finally {
        connection.release();
      }
    });
  });
};

const getUserBookings = (req, res) => {
  const userId = req.user.id; // Extract user ID from JWT token

  db.query(
    "SELECT b.id, t.name AS train_name, t.source, t.destination, b.booking_time FROM bookings b JOIN trains t ON b.train_id = t.id WHERE b.user_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

const getAllBookings = (req, res) => {
  db.query(
    "SELECT b.id, u.name AS user_name, t.name AS train_name, t.source, t.destination, b.booking_time FROM bookings b JOIN users u ON b.user_id = u.id JOIN trains t ON b.train_id = t.id",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

// ✅ Export at the end

module.exports = { bookSeat, getUserBookings, getAllBookings };
console.log("Exported functions from bookingController:", module.exports);
