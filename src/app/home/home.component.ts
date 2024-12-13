import { Component } from '@angular/core';
import { TaskComponent } from '../task/task.component';

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

    this.taskList.push({
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
    this.taskList = this.taskList.filter(task => task.id !== $event);
    this.resetList();
  }

  toggleTask($event: number) {
    var task = this.taskList.filter(task => task.id === $event)[0];
    task.completed = !task.completed;

    this.resetList();
  }

  toggleFilter() {
    this.filterComplete = !this.filterComplete;
    this.resetList();
  }

  resetList() {
    this.filteredTaskList = this.taskList.filter(task => !task.completed || !this.filterComplete);
  }

  constructor() {
    start();
  }
}
