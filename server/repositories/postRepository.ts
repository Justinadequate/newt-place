import Repository from "../interfaces/repository";
import { Post } from "../models/post";
import BaseRepository from "./baseRepository";

class PostRepository extends BaseRepository implements Repository<Post> {
    
    constructor() {
        super('posts');
    }

    all(): Promise<Post>[] {
        throw new Error("Method not implemented.");
    }

    find(id: string): Promise<Post> {
        throw new Error("Method not implemented.");
    }

    create(data: Post): Promise<Post> {
        throw new Error("Method not implemented.");
    }
    
}

export default PostRepository;