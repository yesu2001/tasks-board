export interface Task {
  _id: String;
  board_id: string;
  task_id: string;
  task_name: string;
  task_description: string;
  icon: string;
  status: string;
}

export interface TaskProps {
  task: Task;
  onDelete: (id: String) => void;
  onSave: (data: any) => void;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

// Drawer props interface
export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data?: Task;
  onDelete: (id: any) => void;
  onSave: (data: any) => void;
  isEdit: boolean;
}

// Drawer state interface
export interface DrawerState {
  isAnimating: boolean;
}
