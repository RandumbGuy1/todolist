import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  protected taskList: Task[] = [];

  getAllTasks() : Task[] {
    return this.taskList;
  }

  addTask(task: Task) {
    this.taskList.push(task);
  }

  deleteTask(id: number) {
    this.taskList = this.taskList.filter(task => task.id !== id);
  }

  toggleTask(id: number) {
    var task = this.taskList.filter(task => task.id === id)[0];
    task.completed = !task.completed;
  }
}
