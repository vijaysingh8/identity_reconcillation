const express = require("express");
require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const app = express();
app.use(express.json());
app.use("/identify", contactRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
