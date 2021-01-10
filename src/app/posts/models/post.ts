export class Post {
    constructor(
        public Id: number,
        public Title: string,
        public Body: string,
        public CreatedBy: string,
        public CreatedAt: Date = new Date()
    ){}
}

