// index.js
import app from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`=================================`);
});