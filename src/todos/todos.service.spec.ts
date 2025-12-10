import { Test, type TestingModule } from '@nestjs/testing'
import { TodosService } from './todos.service'

describe('TodosService', () => {
	let service: TodosService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TodosService],
		}).compile()

		service = module.get<TodosService>(TodosService)
		;(service as any).todos = [
			// Unit test for new method
			{ id: '1', title: 'Todo 1', completed: false },
			{ id: '2', title: 'Todo 2', completed: true },
			{ id: '3', title: 'Todo 3', completed: false },
		]
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should return all todos when filter = all', () => {
		const result = service.findAllTodos('all')
		expect(result).toHaveLength(3)
	})
	it('should return all todos when filter = active', () => {
		const result = service.findAllTodos('active')
		expect(result).toHaveLength(2)
	})
	it('should return all todos when filter = completed', () => {
		const result = service.findAllTodos('completed')
		expect(result).toHaveLength(1)
	})
})
