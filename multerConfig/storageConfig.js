const multer = require("multer");

//storage
const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}-${file.originalname}`)
    }
})

//file filtering
const fileFilter=(req,file,callback)=>{
    if(file.mimetype=='image/jpg' || file.mimetype=='image/png' || file.mimetype=='image/jpeg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error('only accept jpg or png or jpeg type files'))
    }
}

//define upload
const upload=multer({storage,fileFilter})

//export upload
module.exports=upload