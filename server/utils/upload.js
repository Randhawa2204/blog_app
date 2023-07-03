import {GridFsStorage} from 'multer-gridfs-storage'
import dotenv from 'dotenv'
import multer from 'multer'

dotenv.config()

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

const storage = new GridFsStorage({
    url : `mongodb+srv://${user}:${password}@blog-database.rvmhavn.mongodb.net/?retryWrites=true&w=majority`,
    options : {useNewUrlParser : true},
    file : (req , file) => {
        const match = ['image/png' , 'image/jpg' , 'image/jpeg']

        if(match.indexOf(file.mimetype) === -1){
            return `${Date.now()}-blog-${file.originalname}`
        }

        return {
            bucketName : 'photos',
            filename : `${Date.now()}-blog-${file.originalname}`
        }
    }
})

export default multer({storage})