import prisma from '@root/shared/config/db.config';
import { ICreateTaskPayload, ITask, IUpdatePayload } from '@task/interfaces/task.interface';

class TaskService {
  public async createTask(payload: ICreateTaskPayload) {
    const task = await prisma.task.create({ data: payload });
    return task;
  }
  public async getAllTasks() {
    const tasks: ITask[] = await prisma.task.findMany({});
    return tasks;
  }
  public async updateTask(payload: IUpdatePayload) {
    const updatedTask: ITask = await prisma.task.update({
      where: {
        id: payload.id
      },
      data: {
        completed: payload.completed
      }
    });
    return updatedTask;
  }
  public async deleteTask(id: number) {
    await prisma.task.delete({
      where: {
        id
      }
    });
  }
}

export const taskService: TaskService = new TaskService();
