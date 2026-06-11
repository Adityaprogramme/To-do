const dotenv = require("dotenv");
const connectDB = require("./database");
dotenv.config();

const app = require("./app");

//database connect
connectDB();

const PORT = process.env.PORT || 5000;





app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);

  });