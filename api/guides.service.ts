import { ISGuide } from "../types/guides.types";
import { Page } from "../types/user.types";
import { $api } from "./interceptors";
//get
export const getGuides = async(data:Page)=>{
    const role = localStorage.getItem('rolesguides')
    const limit = 4
    try {
        const get =  await $api.get(`guides?q=${data?.q}&page%5Boffset%5D=${limit * (data?.count - 1)}&page%5Blimit%5D=${limit}&sort%5Bby%5D=id&sort%5Border%5D=${role}`)
        return get
    } catch (error) {
       console.log(error) 
    }
}
//get/id
export const addGuidesId = async(data:ISGuide)=>{
    try {
        const get =  await $api.get(`/guides/${data}`)
          return get?.data
    } catch (error) {
       console.log(error) 
    }
}
//delete
export const deleteGuides = async (data:any)=>{
    try {
        const get =  await $api.delete(`/guides/${data}`)
    } catch (error) {
       console.log(error) 
    }
}
//add
export const addGuides = async (data:ISGuide)=>{
    try {
        const get =  await $api.post(`/guides`, data)
        console.log(get)
    } catch (error) {
       console.log(error) 
    }
}
//update
export const creadGuides = async (data:{payload:ISGuide, id:string})=>{
    try {
        console.log(data)
        const get =  await $api.patch(`guides/${data?.id}`, data?.payload)
    } catch (error) {
       console.log(error) 
    }
}       