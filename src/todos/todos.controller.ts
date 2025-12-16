import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import { TodosService } from './todos.service'
import type { Filter, Todo } from 'src/common/interfaces/todo.model'
import { TodosResponseDto } from './dto/todos-response.dto'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('todos')
@Controller('todos')
export class TodosController {
	constructor(private todosService: TodosService) {}

	@Get()
	@ApiOperation({ summary: 'Return a list of todos.' })
	async getAllTodos(
		@Query('filter') filter: Filter,
	): Promise<TodosResponseDto> {
		const todos = await this.todosService.findAllTodos(filter)
		return new TodosResponseDto(todos)
	}

	@Get(':id')
	@ApiOperation({ summary: 'Return a todo by id.' })
	async getTodoById(@Param('id') id: string): Promise<Todo> {
		return this.todosService.findTodoById(id)
	}

	@Post()
	@ApiOperation({ summary: 'Create a new todo.' })
	async createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
		return this.todosService.newTodo(createTodoDto)
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a todo.' })
	async updateTodo(
		@Param('id') id: string,
		@Body() updateTodoDto: UpdateTodoDto,
	): Promise<Todo> {
		return this.todosService.updateTodo(id, updateTodoDto)
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a todo.' })
	async deleteTodo(@Param('id') id: string): Promise<void> {
		return this.todosService.deleteTodo(id)
	}
}
