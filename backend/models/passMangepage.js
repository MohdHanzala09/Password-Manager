import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});
// Define a schema for the model
const passMangeSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  URL: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  objectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "allUsers", // Reference to the allUsers model
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{timestamps: true});

// Create a model from the schema
const passMange = mongoose.model("passMange", passMangeSchema);

// Export the model
export default passMange;