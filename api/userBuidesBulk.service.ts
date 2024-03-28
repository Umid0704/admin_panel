import { $api } from './interceptors';
export const getUserGuides = async (data:any) => {
    const limit = 0
    console.log(data)
    const id = localStorage.getItem('id')
    const check = localStorage.getItem('chek')
    try {
        const respons = await $api.get(`user-guides?page%5Boffset%5D=${limit * (data?.count -1)}&page%5Blimit%5D=${limit}&completed=${check}&user_id=${id}`);
        console.log(respons)
        return respons
    } catch (err) {
        console.log(err)
    }
}

export const getEmployee = async (data:any) => {
    console.log(data)
    // const per_page = 6
    try {
        const respons = await $api.get(`/guides?q=&page%5Boffset%5D=0&page%5Blimit%5D=10&sort%5Bby%5D=id&sort%5Border%5D=asc`)
        return respons;
    } catch (err) {
        console.log(err);
    }
}

//
export const getUserMe = async () => {
    try {
        const respons = await $api.get("/users/me")
        return respons
    } catch (err) {
        console.log(err);

    }
}

export const postUserPage = async (payload: string) => {
    try {
        const respons = await $api.post(`/user-guides/${payload}/read`)
        return respons
    } catch (err) {
        console.log(err);

    }
}