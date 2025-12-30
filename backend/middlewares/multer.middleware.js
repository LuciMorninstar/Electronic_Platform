import multer from "multer"



const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, "backend/public/temp");  //store in this folder
    },
    filename:function(req,file,cb){
        const uniqueName = Date.now() + Math.floor(Math.random()*2);
        cb(null, file.originalname + "_" + uniqueName);

    }

})

const upload = multer ({storage});
export default upload;  