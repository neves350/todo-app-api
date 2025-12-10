import { Test, type TestingModule } from '@nestjs/testing'
import { TodosController } from './todos.controller'
import { TodosService } from './todos.service'

describe('TodosController', () => {
	let controller: TodosController
	let todosService: jest.Mocked<TodosService>

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TodosController],
			providers: [
				{
					provide: TodosService,
					useValue: {
						// config for testing module
						findAllTodos: jest.fn(),
						findTodoById: jest.fn(),
						newTodo: jest.fn(),
						updateTodo: jest.fn(),
						deleteTodo: jest.fn(),
					},
				},
			],
		}).compile()

		controller = module.get<TodosController>(TodosController)
		todosService = module.get<TodosService>(
			TodosService,
		) as jest.Mocked<TodosService>
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should list all todos', () => {
		const todos = [
			{ id: '1', title: 'Todo 1', completed: false, createdAt: new Date() },
		]
		todosService.findAllTodos.mockReturnValue(todos)
		const result = controller.getAllTodos('all')
		expect(result.todos).toEqual(todos)
		expect(todosService.findAllTodos).toHaveBeenCalledWith('all')
	})
	it('should return todo by id', () => {
		const todo = {
			id: '1',
			title: 'Todo 1',
			completed: false,
			createdAt: new Date(),
		}
		todosService.findTodoById.mockReturnValue(todo)
		const result = controller.getTodoById('1')
		expect(result).toEqual(todo)
		expect(todosService.findTodoById).toHaveBeenCalledWith('1')
	})
	it('should create todo', () => {
		const todo = {
			id: '1',
			title: 'Todo 1',
			completed: false,
			createdAt: new Date(),
		}
		todosService.newTodo.mockReturnValue(todo)
		const result = controller.createTodo({ title: 'Todo 1' })
		expect(result).toEqual(todo)
		expect(todosService.newTodo).toHaveBeenCalledWith({ title: 'Todo 1' })
	})
	it('should update todo', () => {
		const todo = {
			id: '1',
			title: 'Todo 1',
			completed: false,
			createdAt: new Date(),
		}
		todosService.updateTodo.mockReturnValue(todo)
		const result = controller.updateTodo('1', { title: 'Todo 1' })
		expect(result).toEqual(todo)
		expect(todosService.updateTodo).toHaveBeenCalledWith('1', {
			title: 'Todo 1',
		})
	})
	it('should delete todo', () => {
		const todo = {
			id: '1',
			title: 'Todo 1',
			completed: false,
			createdAt: new Date(),
		}
		todosService.deleteTodo.mockReturnValue(void 0)
		controller.deleteTodo('1')
		expect(todosService.deleteTodo).toHaveBeenCalledWith('1')
	})
})
