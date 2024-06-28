interface Repository<T> {
    all(): Promise<T>[];
    find(id: string): Promise<T>;
    create(data: T): Promise<T>;
}

export default Repository;