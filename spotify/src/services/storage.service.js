import {ImageKit} from '@imagekit/nodejs/index.js'

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

const uploadFile = async (file) => {
    const response = await client.files.upload({
        file,
        fileName: "music",
        folder: "project-2/music"
    })
    return response
}

export default uploadFile