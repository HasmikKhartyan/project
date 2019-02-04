import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  private cons;
  private pros;
  private todos;
  constructor(
      private service: DataService
  ) {
  }

  public ngOnInit() {
    this.service.call('getAllData')
       .subscribe(
           (data) => {
             this.todos = data;
             this.cons = data.cons.map((todo, index) => new Todo({id: index, title: todo}));
             this.pros = data.pros.map((todo, index) => new Todo({id: index, title: todo}));
           }
       );
    //   this.todos = {cons:["random reason 1","random reason 2","random reason 3","llll"],pros:["random reason 1","random reason 2","random reason 3"]};
    //            this.cons = this.todos.cons.map((todo, index) => new Todo({id: index, title: todo}));
    //            this.pros = this.todos.pros.map((todo, index) => new Todo({id: index, title: todo}));

  }
    onAddTodo(todo, prop) {

        const newData = Object.assign(this.todos, {[prop]: [...this.todos[prop], todo.title]});
        this.service
          .call( 'addTodo', newData)
          .subscribe(
            (newTodo) => {
               this.todos = newTodo;
                this.cons = newTodo.cons.map(( item, index) => new Todo({id: index, title: item}));
                this.pros = newTodo.pros.map((item, index) => new Todo({id: index, title: item}));
            }
          );
    }
    onUpdateTodo(todo, prop) {
        const newCons = [...this.todos[prop]];
        const res = newCons.filter((item, index) => index !== todo.id);
        const newData = Object.assign(this.todos, {[prop]: [...res, todo.title ]});
        this.service
            .call( 'addTodo', newData)
            .subscribe(
                (newTodo) => {
                    this.todos = newTodo;
                    this.cons = newTodo.cons.map((item, index) => new Todo({id: index, title: item}));
                    this.pros = newTodo.pros.map((item, index) => new Todo({id: index, title: item}));
                }
            );
    }
    onRemoveTodo(todo, prop) {
      const newCons = [...this.todos[prop]];
      const res = newCons.filter((item, index) => index !== todo.id);
        const newData = Object.assign(this.todos, {[prop]: res});
        this.service
            .call( 'addTodo', newData)
            .subscribe(
                (newTodo) => {

                    this.todos = newTodo;
                    this.cons = newTodo.cons.map((item, index) => new Todo({id: index, title: item}));
                    this.pros = newTodo.pros.map((item, index) => new Todo({id: index, title: item}));
                }
            );
    }
}
