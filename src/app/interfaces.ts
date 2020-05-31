
export interface User {
    id: number;
    email: string;
    imgUrl: string;
    username: string;
}

export interface UserDefault {
    id: number;
    defaultCode: string;
    font: string;
    language: string;
    theme: string;
}

export interface UserCode {
    id: string;
    content:string;
    title: string;
    language: string;
    sharable:boolean;
    type:number;
}

export interface UserDetails {
    id: number;
    email: string;
    img_url: string;
    username: string;
    userCodes: Array<UserCode>;
    userDefaults: UserDefault;
}

export interface RegisterUser {
    username: string;
    password: string;
    email: string;
}

export interface TaskRequest {
    language: string;
    code: string;
    inputs: Array<string>;
    timeLimit: number;
}

export interface Testcase {
    id: string;
    input: string;
    output: string;
    answer: string;
    status: number;
    statusText: string;
    timeExec: any;
    verdict: string;
}