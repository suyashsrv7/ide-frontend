
export interface User {
    id: number;
    email: string;
    img_url: string;
    username: string;
}

export interface UserDefault {
    id: number;
    default_code: string;
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