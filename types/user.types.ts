export interface ISUser{
    _id?:string,
    first_name:string,
    last_name:string,
    age:number,
    role:string,
    description:string,
    username:string,
    password:string,
    avatar:string | File,
}
export interface PageInfo{
    limit:number,
    offset:number,
    total:number
}
export interface Page{
    q:string,
    count:number,
    rolesValue:string
}
export interface Data{
    data:ISUser,
    pageInfo:PageInfo
}

