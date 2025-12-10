import { Controller, Get, Query } from '@nestjs/common'
import type { TodosService } from './todos.service'
import type { Filter } from 'src/common/interfaces/todo.model'
import { TodosResponseDto } from './dto/todos-response.dto'

@Controller('todos')
export class TodosController {
	constructor(private todosService: TodosService) {}

	@Get()
	getAllTodos(@Query('filter') filter: Filter): TodosResponseDto {
		return new TodosResponseDto([])
	}
}
