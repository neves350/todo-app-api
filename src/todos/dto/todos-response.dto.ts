import type { Todo } from 'src/common/interfaces/todo.model'

export class TodosResponseDto {
	data: Todo[]
	total: number

	constructor(todos: Todo[]) {
		this.data = todos
		this.total = todos.length
	}
}
