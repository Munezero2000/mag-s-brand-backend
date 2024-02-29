import express from "express"

const app = express();
app.use(express.json()); // for parsing application/json
// parse various different custom JSON types as JSON

app.listen(3001, () => {
  console.log("Server is running on port 3001");}
);