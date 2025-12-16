import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../shared/prisma.service'
import type { Todo as TodoModel } from '../generated/prisma/client'
import type { Filter } from 'src/common/interfaces/todo.model'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'

@Injectable()
export class TodosService {
	constructor(private readonly prisma: PrismaService) {}

	async findAllTodos(filter: Filter): Promise<TodoModel[]> {
		const where =
			filter === 'active'
				? { completed: false }
				: filter === 'completed'
					? { completed: true }
					: {}

		return this.prisma.todo.findMany({
			where,
			orderBy: { createdAt: 'desc' },
		})
	}

	async findTodoById(id: string): Promise<TodoModel> {
		const todo = await this.prisma.todo.findUnique({
			where: { id },
		})

		if (!todo) {
			throw new NotFoundException('Todo not found.')
		}

		return todo
	}

	async newTodo(createdTodoDto: CreateTodoDto): Promise<TodoModel> {
		return this.prisma.todo.create({
			data: {
				title: createdTodoDto.title,
			},
		})
	}

	async updateTodo(
		id: string,
		updateTodoDto: UpdateTodoDto,
	): Promise<TodoModel> {
		// Throws if not found
		await this.findTodoById(id)

		return this.prisma.todo.update({
			where: { id },
			data: {
				title: updateTodoDto.title,
				completed: updateTodoDto.completed,
			},
		})
	}

	async deleteTodo(id: string): Promise<void> {
		// Ensure it exists first
		await this.findTodoById(id)

		await this.prisma.todo.delete({
			where: { id },
		})
	}
}
