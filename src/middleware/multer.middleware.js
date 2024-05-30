import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./public/temp')  //call back function which indicate the where to store files that path, null shoing error 
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    }
})

export const upload = multer({storage})