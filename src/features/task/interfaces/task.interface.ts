export interface ITask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface ICreateTaskPayload {
  title: string;
  description: string;
  completed: boolean;
}

export interface IUpdatePayload {
  id: number;
  completed: boolean;
}
