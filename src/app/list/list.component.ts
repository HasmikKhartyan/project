import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input()
  todos: Todo[];

  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  update: EventEmitter<Todo> = new EventEmitter();

  constructor() {
  }
  onRemoveTodo(todo: Todo) {
    this.remove.emit(todo);
  }
  onUpdateTodo(todo: Todo) {
    this.update.emit(todo);

  }
  identify(index, item) {
    return item.title;
  }
}
