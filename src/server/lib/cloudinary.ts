import { v2 as cloudinary } from 'cloudinary'
import { env as envClient } from '../../env/client.mjs'
import { env as envServer } from '../../env/server.mjs'

cloudinary.config({ 
    cloud_name: envClient.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: envClient.NEXT_PUBLIC_CLOUDINARY_PUBLIC_KEY, 
    api_secret: envServer.CLOUDINARY_SECRET_KEY,
    secure: true
})

export const uploadImage = async (url: string) => {
    return (await cloudinary.uploader.upload(url)).url
}

export const deleteImage = async (url: string) => {
    return await cloudinary.uploader.destroy(url, (result) => {
        return result.toString()
    })
}