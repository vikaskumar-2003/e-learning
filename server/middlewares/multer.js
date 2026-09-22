import multer from "multer"
import {v4 as uuid} from "uuid"
import fs from "fs";


const uploadDir = "upload";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,"upload")
    },
    filename(req,file,cb){
        const id=uuid()

        const extName=file.originalname.split(".").pop()
         
        const fileName=`${id}.${extName}`

        cb(null,fileName)
    }
})

export const uploadFiles=multer({storage}).single("file")