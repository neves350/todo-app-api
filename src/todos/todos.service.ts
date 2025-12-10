import { Injectable, NotFoundException } from '@nestjs/common'
import type { Filter, Todo } from 'src/common/interfaces/todo.model'
import { CreateTodoDto } from './dto/create-todo.dto'
import type { UpdateTodoDto } from './dto/update-todo.dto'

@Injectable()
export class TodosService {
	private todos: Todo[] = []

	findAllTodos(filter: Filter): Todo[] {
		// Filter the array and show the todos that are not completed
		let items = this.todos

		if (filter === 'active') items = items.filter((todo) => !todo.completed)
		if (filter === 'completed') items = items.filter((todo) => todo.completed)

		return items
	}

	findTodoById(id: string): Todo {
		const todo = this.todos.find((t) => t.id === id)

		if (!todo) {
			throw new NotFoundException('Todo not found.')
		}

		return todo
	}

	newTodo(createdTodoDto: CreateTodoDto): Todo {
		const todo: Todo = {
			id: crypto.randomUUID(),
			title: createdTodoDto.title,
			completed: false,
			createdAt: new Date(),
		}

		this.todos.push(todo)
		return todo
	}

	updateTodo(id: string, updateTodoDto: UpdateTodoDto): Todo {
		let foundTodo = false
		let updateTodo: Todo

		this.todos = this.todos.map((t) => {
			if (t.id !== id) return t

			foundTodo = true
			updateTodo = { ...t, ...updateTodoDto }

			return updateTodo
		})

		if (!foundTodo) throw new NotFoundException('Todo not found.')

		return updateTodo!
	}

	deleteTodo(id: string): void {
		this.todos = this.todos.filter((t) => t.id !== id)
	}
}
