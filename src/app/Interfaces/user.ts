export interface Login {
    username: any;
    password: any;
}

export interface UserIRegister{
    username: any;
    email: any;
    password: any;
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