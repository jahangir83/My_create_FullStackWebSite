
const path = require('path')
const multer = require('multer')
const e = require('express')

let storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'public/uploads')
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cd) => {
        const types = /jpeg|jpg|png|gif/
        const extName = types.test(path.extname(file.originalname).toLowerCase())
        const mintype = types.test(file.mimetype)

        if (extName && mintype) {
            cd(null, true)
        } else {
           cd( new Error('Only Support images'))
        }
    }
})

module.exports = upload