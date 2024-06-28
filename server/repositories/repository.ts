import {
    MongoClient,
    ObjectId
} from 'mongodb'
import 'dotenv'

// const connString = process.env.CONNECTION_STRING
const connString = "mongodb://127.0.0.1:27017";
const mongo = new MongoClient(connString);
const mongoTodo = mongo.db("todo").collection("todos");

export const listDbs = async () => {
    try {
        await mongo.connect();
        var databasesList = await mongo.db().admin().listDatabases();
        return databasesList
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await mongo.close()
    }
}

export const todoRepo = {
    GetTodos: async () => {
        try {
            await mongo.connect();
            var todos = await mongoTodo.find().toArray();
            return todos;
        }
        catch (e) {
            console.error(e)
        }
        finally {
            await mongo.close();
        }
    },
    GetTodo: async (id: ObjectId) => {
        try {
            await mongo.connect();
            var todo = await mongoTodo.findOne({_id: id});
            return todo;
        }
        catch (e) {
            console.error(e);
        }
        finally {
            await mongo.close();
        }
    },
    InsertTodo: async (todo) => {
        try {
            await mongo.connect();
            var result = await mongoTodo.insertOne(todo);
            todo._id = result.insertedId;
            return todo;
        }
        catch(e) {
            console.error(e);
        }
        finally {
            await mongo.close();
        }
    },
    UpdateTodo: async (todo) => {
        try {
            await mongo.connect();
            var result = await mongoTodo.updateOne(
                {_id: todo._id},
                {$set: {title: todo.title, items: todo.items}});
            return result;
        }
        catch (e) {
            console.error(e);
        }
        finally {
            await mongo.close();
        }
    },
    DeleteTodo: async (id) => {
        try {
            await mongo.connect();
            return await mongoTodo.deleteOne({_id: id})
        }
        catch(e) {
            console.error(e);
        }
        finally {
            await mongo.close();
        }
    }
}