import { Test, type TestingModule } from '@nestjs/testing'
import { TodosService } from './todos.service'
import { NotFoundException } from '@nestjs/common'

describe('TodosService', () => {
	let service: TodosService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TodosService],
		}).compile()

		service = module.get<TodosService>(TodosService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should return all todos when filter = all', () => {
		service.newTodo({ title: 'Todo 1' })
		service.newTodo({ title: 'Todo 2' })
		service.newTodo({ title: 'Todo 3' })

		const result = service.findAllTodos('all')
		expect(result).toHaveLength(3)
	})
	it('should return all todos when filter = active', () => {
		const todo_1 = service.newTodo({ title: 'Todo 1' })
		service.newTodo({ title: 'Todo 2' })
		service.newTodo({ title: 'Todo 3' })
		service.updateTodo(todo_1.id, { completed: true })

		const result = service.findAllTodos('active')
		expect(result).toHaveLength(2)
	})
	it('should return all todos when filter = completed', () => {
		const todo_1 = service.newTodo({ title: 'Todo 1' })
		service.newTodo({ title: 'Todo 2' })
		service.newTodo({ title: 'Todo 3' })
		service.updateTodo(todo_1.id, { completed: true })

		const result = service.findAllTodos('completed')
		expect(result).toHaveLength(1)
	})
	it('should return todo by id', () => {
		const todo = service.newTodo({ title: 'Todo 1' })
		const result = service.findTodoById(todo.id)
		expect(result).toEqual(todo)
	})
	it('should delete todo by id and then findTodoById should throw', () => {
		const todo = service.newTodo({ title: 'Todo 1' })
		service.deleteTodo(todo.id)
		expect(() => service.findTodoById(todo.id)).toThrow(NotFoundException)
	})
})
