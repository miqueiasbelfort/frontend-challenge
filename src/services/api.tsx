import axios from "axios";

export const apiRandamUser = axios.create({
    baseURL: "https://randomuser.me/api/?exc=id,nat,registered,cell,phone,location"
})
export const apiRandomDogs = axios.create({
    baseURL: 'https://random.dog'
})
export const apiClients = axios.create({
    baseURL: 'https://backend-challenge-api.onrender.com'
})