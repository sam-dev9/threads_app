import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  text: { type: "string", require: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
