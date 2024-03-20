export interface Login {
    username: any;
    password: any;
    ip?: any;
}

export interface UserICreate {
    username: String;
    email: String;
    password?: any;
}

export interface UserIRegister {
    username: String;
    email: String;
    password: String;
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
    role: String;
    createdAt: Date;
    updatedAt: Date;
}