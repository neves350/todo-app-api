import type { Todo } from 'src/common/interfaces/todo.model'

export class TodosResponseDto {
	todos: Todo[]
	total: number

	constructor(todos: Todo[]) {
		this.todos = todos
		this.total = todos.length
	}
}
