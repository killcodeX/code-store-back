import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  language: { type: String, required: true },
  userId: { type: ObjectId, ref: "UserMessage" },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const LangMessage = mongoose.model("LangMessage", postSchema);

export default LangMessage;