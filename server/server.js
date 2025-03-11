const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow cross-domain requests
app.use(express.json()); // Parse JSON request body


// User data for the simulated database (6-digit ID)
const users = [
  { id: "123456", name: "Alice" },
  { id: "654321", name: "Bob" },
  { id: "987654", name: "Charlie" },
  { id: "012345", name: "Yali" },
];



// Query User API, here the API only supports /users/:id, access the correct path like http://localhost:5000/users/123456.
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (user) {
    res.json({ message: "Hello, welcome!", user });
  } else {
    res
      .status(404)
      .json({ message: "Can't find, please re-enter the 6-digit number." });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
