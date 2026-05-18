import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, res, cb) {
        //This is important later
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, this.filename.fieldname + '-' + uniqueSuffix)
        cb(null, this.file.originalname)
    }
})

export const upload = multer({
    storage,
})