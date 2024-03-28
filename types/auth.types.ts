
interface data{token:string, role:string}
export interface ISignIn {
    id?:string,
    username:string
    password:string
}
export interface ISignUpPayload{
    message:string,
    token:string
} 
export interface ISignInPayload{
    message:string,
    admin:ISignIn,
    data:data
} 