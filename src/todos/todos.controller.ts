import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'
import type { TodosService } from './todos.service'
import type { Filter, Todo } from 'src/common/interfaces/todo.model'
import { TodosResponseDto } from './dto/todos-response.dto'
import type { CreateTodoDto } from './dto/create-todo.dto'
import type { UpdateTodoDto } from './dto/update-todo.dto'

@Controller('todos')
export class TodosController {
	constructor(private todosService: TodosService) {}

	@Get()
	getAllTodos(@Query('filter') filter: Filter): TodosResponseDto {
		const todos = this.todosService.findAllTodos(filter)
		return new TodosResponseDto(todos)
	}

	@Post()
	createTodo(@Body() createTodoDto: CreateTodoDto): Todo {
		return this.todosService.newTodo(createTodoDto)
	}

	@Put(':id')
	updateTodo(
		@Param('id') id: string,
		@Body() updateTodoDto: UpdateTodoDto,
	): Todo {
		return this.todosService.updateTodo(id, updateTodoDto)
	}
}
