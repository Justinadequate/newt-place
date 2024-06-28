import {
    MongoClient,
    ObjectId
} from 'mongodb'
import 'dotenv'

abstract class BaseRepository {

    mongoClient: MongoClient;
    mongoCollection: any;
    constructor(collectionName: string) {
        try {
            this.initializeMongo(collectionName);
        }
        catch(e) {
            throw new Error("error initializing mongo");
        }
    }

    initializeMongo(collectionName: string) {
        this.mongoClient = new MongoClient(process.env.CONNECTION_STRING ?? '');
        this.mongoCollection = this.mongoClient.db("default").collection(collectionName);
    }
}

export default BaseRepository;