export interface Post {
    title: string;
    category: Category;
    tags: string[];
}

export enum Category {
    movies,
    music,
    art,
    misc
}