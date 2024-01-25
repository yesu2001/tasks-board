import { Schema, model, models } from "mongoose";

const boardSchema = new Schema({
  board_id: {
    required: true,
    type: String,
  },
  board_name: {
    type: String,
  },
  board_description: { type: String },
});

const BoardSchema = models.Boards || model("Boards", boardSchema);

export default BoardSchema;
