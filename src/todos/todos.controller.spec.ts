import { Test, type TestingModule } from '@nestjs/testing'
import { TodosController } from './todos.controller'
import { TodosService } from './todos.service'

describe('TodosController', () => {
	let controller: TodosController
	let todosService: TodosService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TodosController],
			providers: [TodosService],
		}).compile()

		controller = module.get<TodosController>(TodosController)
		todosService = module.get<TodosService>(TodosService)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
