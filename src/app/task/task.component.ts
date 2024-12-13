import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})

export class TaskComponent {
  @Input() task!:Task;

  @Output() deleteEvent = new EventEmitter<number>();
  @Output() toggleEvent = new EventEmitter<number>();

  deleteTask(id: number) {
    this.deleteEvent.emit(id)
  }

  toggleTask(id: number) {
    this.toggleEvent.emit(id)
  }
}
