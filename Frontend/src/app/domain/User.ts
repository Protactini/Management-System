export class User {
    id: number;
    userName: string;
    email: string;
    password: string;
    createDate: string;

    constructor(id: number, userName: string, email: string, password: string, createDate: string) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.createDate = createDate;
    }
}