'use client'
import { ISUser, Page } from "../types/user.types";
import { $api } from "./interceptors";
export const getUsers = async(data:Page)=>{
    const limit:number = 4
    const role = localStorage.getItem('roles');
    console.log(role, 'data')
    try {
        const get =  await $api.get(`/users?q=${data?.q}&page%5Boffset%5D=${(data?.count - 1) * limit}&page%5Blimit%5D=${limit}&sort%5Bby%5D=id&sort%5Border%5D=desc&filters%5Brole%5D=${role}`)
       console.log(get)
        return get?.data
    }catch(error){
       console.log(error, 'Error')
    }
}
export const getUserId = async(data:string)=>{
    try {
        const get =  await $api.get(`/users/${data}`)
          return get?.data
    } catch (error) {
       console.log(error) 
    }
}
export const deleteUser = async (data:string)=>{
    try {
        const get =  await $api.delete(`/users/${data}`)
    } catch (error) {
       console.log(error) 
    }
}
export const addUser = async (data:ISUser)=>{
    try {
        const get =  await $api.post(`/users`, data)
    } catch (error) {
       console.log(error) 
    }
}
export const creadUser = async (data:{payload:ISUser, _id:string})=>{
    try {
        console.log(data)
        const get =  await $api.patch(`/users/${data?._id}`, data?.payload)
    } catch (error) {
       console.log(error) 
    }
}