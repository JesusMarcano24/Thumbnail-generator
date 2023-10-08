import axios from 'axios'

const imagesApi = axios.create({
    baseURL: 'http://localhost:3000'
})

export const getImages = async  () => {
    const res = await imagesApi.get('/images')
    return res.data
}