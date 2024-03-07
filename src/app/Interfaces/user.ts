export interface Login {
    username: any;
    password: any;
}

export interface RegisterIUser {
    username: String;
    email: String;
    password: String;
    password2: String;
}

export interface Dialog {
    username: String;
    email: String;
    role: String;
}

export interface User {
    _id: String;
    username: String;
    email: String;
    password: String;
    status: Number;
    createdAt: Date;
    updatedAt: Date;
}