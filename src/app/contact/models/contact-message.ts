export class ContactMessage {
    constructor(
        public Id: number,
        public Name: string,
        public Email: string,
        public Subject: string,
        public MessageBody: string,
        public CreatedAt: Date = new Date()
    ){}
}

