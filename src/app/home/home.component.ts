import { Component, inject } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../taskservice';

import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

declare function start(): void;
declare function refresh(): void;

@Component({
  selector: 'app-home',
  imports: [CommonModule, TaskComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  taskService: TaskService = inject(TaskService);

  taskList: Task[] = [];
  filteredTaskList: Task[] = [];

  filterComplete:boolean = false;

  taskForm = new FormGroup({
    taskName: new FormControl('')
  }, Validators.minLength(0));
  
  count:number = 0;
  addTask() {
    var task = (this.taskForm.value.taskName ?? '').trim();
    this.taskForm.setValue({taskName: ''});

    if (task.length == 0) return;

    var datetime = new Date();
    this.taskService.addTask({
      id: this.count,
      name: task,
      createDate: datetime.toISOString(),
      dueDate: datetime.toDateString(),
      completed: false,
    })
    this.count++;

    refresh();
    this.resetList();
  }

  deleteTask($event: number) {
    this.taskService.deleteTask($event);
    this.resetList();
  }

  toggleTask($event: number) {
    this.taskService.toggleTask($event);
    this.resetList();
  }

  toggleFilter() {
    this.filterComplete = !this.filterComplete;
    this.resetList();
  }

  resetList() {
    this.taskList = this.taskService.getAllTasks();
    this.filteredTaskList = this.taskList.filter(task => !task.completed || !this.filterComplete);
  }

  constructor() {
    start();
  }
}
