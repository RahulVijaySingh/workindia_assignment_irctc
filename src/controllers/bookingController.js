const db = require("../config/db");

const bookSeat = (req, res) => {
  const { user_id, train_id } = req.body;

  if (!user_id || !train_id) {
    return res.status(400).json({ error: "User ID and Train ID are required" });
  }

  db.getConnection((err, connection) => {
    if (err) return res.status(500).json({ error: err.message });

    // Start transaction to prevent race conditions
    connection.beginTransaction((err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Step 1: Check seat availability
      connection.query(
        "SELECT available_seats FROM trains WHERE id = ? FOR UPDATE",
        [train_id],
        (err, results) => {
          if (err)
            return connection.rollback(() =>
              res.status(500).json({ error: err.message })
            );

          if (results.length === 0) {
            return connection.rollback(() =>
              res.status(404).json({ error: "Train not found" })
            );
          }

          const availableSeats = results[0].available_seats;
          if (availableSeats <= 0) {
            return connection.rollback(() =>
              res.status(400).json({ error: "No seats available" })
            );
          }

          // Step 2: Reduce the available seat count
          connection.query(
            "UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?",
            [train_id],
            (err) => {
              if (err)
                return connection.rollback(() =>
                  res.status(500).json({ error: err.message })
                );

              // Step 3: Insert the booking
              connection.query(
                "INSERT INTO bookings (user_id, train_id) VALUES (?, ?)",
                [user_id, train_id],
                (err) => {
                  if (err)
                    return connection.rollback(() =>
                      res.status(500).json({ error: err.message })
                    );

                  // Step 4: Commit the transaction
                  connection.commit((err) => {
                    if (err)
                      return connection.rollback(() =>
                        res.status(500).json({ error: err.message })
                      );
                    res.json({ message: "Seat booked successfully" });
                  });
                }
              );
            }
          );
        }
      );
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
