import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {

  @Input() todo: Todo;

  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  update: EventEmitter<Todo> = new EventEmitter();

  constructor() {
  }
  updateTodo(e, todo: Todo) {
    if (e.type === 'blur' || e.which === 13 && e.shiftKey === false) {
      e.preventDefault();
      const el = e.target;
      if ( el.innerHTML === '' ) {
        el.focus();
      } else {
        e.target.focus();
        todo.title = el.innerHTML;
        this.update.emit(todo);
      }

    }

  }
  removeTodo(todo: Todo) {
    this.remove.emit(todo);
  }

}
