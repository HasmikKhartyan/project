export class Todo {
  id: number;
  title = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

