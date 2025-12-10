import { Injectable } from '@nestjs/common'
import type { Filter, Todo } from 'src/common/interfaces/todo.model'

@Injectable()
export class TodosService {
	private todos: Todo[] = []

	findAllTodos(filter: Filter): Todo[] {
		// Filter the array and show the todos that are not completed
		let items = this.todos

		if (filter === 'active') {
			items = items.filter((todo) => !todo.completed)
		}

		if (filter === 'completed') {
			items = items.filter((todo) => todo.completed)
		}

		return items
	}
}
