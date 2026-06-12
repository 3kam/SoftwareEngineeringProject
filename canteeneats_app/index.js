// index.js
import app from "./app.js"; // Import the configured app instance

const PORT = 8000;

// Bind to 0.0.0.0 for reliable port-forwarding mapping in cloud workspaces
app.listen(PORT, "0.0.0.0", () => {
  console.log(`CanteenEats running successfully at http://localhost:${PORT}`);
});