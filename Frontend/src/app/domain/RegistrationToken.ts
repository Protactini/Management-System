export class RegistrationToken {
    id: number;
    token: string;
    validDuration: number;
    email: string;
    createdBy: number;

    constructor(id: number, token: string, validDuration: number, email: string, createdBy: number) {
        this.id = id;
        this.token = token;
        this.validDuration = validDuration;
        this.email = email;
        this.createdBy = createdBy;
    }
}