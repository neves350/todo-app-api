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
import type { CreateTodoDto } from './dto/create-todo.dto'
import type { UpdateTodoDto } from './dto/update-todo.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('todos')
@Controller('todos')
export class TodosController {
	constructor(private todosService: TodosService) {}

	@Get()
	@ApiOperation({ summary: 'Return a list of todos.' })
	getAllTodos(@Query('filter') filter: Filter): TodosResponseDto {
		const todos = this.todosService.findAllTodos(filter)
		return new TodosResponseDto(todos)
	}

	@Get(':id')
	@ApiOperation({ summary: 'Return a todo by id.' })
	getTodoById(@Param('id') id: string): Todo {
		return this.todosService.findTodoById(id)
	}

	@Post()
	@ApiOperation({ summary: 'Create a new todo.' })
	createTodo(@Body() createTodoDto: CreateTodoDto): Todo {
		return this.todosService.newTodo(createTodoDto)
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a todo.' })
	updateTodo(
		@Param('id') id: string,
		@Body() updateTodoDto: UpdateTodoDto,
	): Todo {
		return this.todosService.updateTodo(id, updateTodoDto)
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a todo.' })
	deleteTodo(@Param('id') id: string): void {
		return this.todosService.deleteTodo(id)
	}
}
