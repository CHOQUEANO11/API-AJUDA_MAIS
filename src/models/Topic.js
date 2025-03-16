import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orgao_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Org",
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      orgao_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Org",
        required: true,
      },
      comment: {
        type: String,
        required: true,
        trim: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Topic = mongoose.models.Topic || mongoose.model("Topic", TopicSchema);

export default Topic;