export interface Task {
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
}

// Drawer props interface
export interface DrawerProps {
  isOpen: boolean; // Drawer open/closed state
  onClose: () => void; // Callback for closing the drawer
  data?: Task;
  onDelete: (id: any) => void;
  onSave: (data: any) => void;
}

// Drawer state interface
export interface DrawerState {
  isAnimating: boolean; // Flag for animation in progress
}
