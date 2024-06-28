import {
    MutationCreateTodoArgs,
    MutationUpdateTodoArgs,
    MutationDeleteTodoArgs
} from './graphql-types';
import { ObjectId } from 'mongodb';
import * as repos from './repositories/repository';

export const resolvers = {
    Query: {
        lists: async () => await repos.todoRepo.GetTodos(),
        list: async (_, id: string) => await repos.todoRepo.GetTodo(new ObjectId(id))
    },
    Mutation: {
        async createTodo(_, {todo}: MutationCreateTodoArgs) {
            var insertResult = await repos.todoRepo.InsertTodo(todo);
            if (!insertResult._id)
                throw new Error("Error inserting new Todo");
            return insertResult;
        },
        async updateTodo(_, {id, title, items}: MutationUpdateTodoArgs) {
            const todo = await repos.todoRepo.GetTodo(new ObjectId(id));
            if (!todo)
                throw new Error(`No Todo found with Id ${id}`);
            todo.title = title;
            todo.items = [];
            items.forEach(i => todo.items.push({title: i.title, description: i.description}));
            var updateResult = await repos.todoRepo.UpdateTodo(todo);
            if (updateResult.modifiedCount !== 1)
                throw new Error(`Error while updating Todo with Id ${id}`);
        },
        async deleteTodo(_, {id}: MutationDeleteTodoArgs) {
            const todo = await repos.todoRepo.GetTodo(new ObjectId(id));
            if (!todo)
                throw new Error(`Todo with Id ${id} not found`);
            var deleteResult = await repos.todoRepo.DeleteTodo(new ObjectId(id));
            if (deleteResult.deletedCount !== 1)
                throw new Error(`Error while deleting Todo with Id ${id}`);
            return id;
        }
    }
};