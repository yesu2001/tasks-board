import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
  board_id: {
    required: true,
    type: String,
  },
  task_id: String,
  task_name: {
    required: true,
    type: String,
  },
  task_description: String,
  icon: String,
  status: String,
});

const TaskSchema = models.Tasks || model("Tasks", taskSchema);

export default TaskSchema;
