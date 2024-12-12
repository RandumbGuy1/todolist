import { Component } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
declare function start(): void;

@Component({
  selector: 'app-home',
  imports: [CommonModule, TaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  taskList: Task[] = [
    {
      name: "Brush Teeth",
      createDate: "",
      dueDate: "",
      completed: false,
    }
  ];
  
  addTask(task: string) {
    var datetime = new Date();

    this.taskList.push({
      name: task,
      createDate: datetime.toISOString(),
      dueDate: datetime.toDateString(),
      completed: false,
    })

    start();
  }

  constructor() {
    start();
  }
}
