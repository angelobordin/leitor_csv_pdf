import multer from "multer";
const storageConfig = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "src/assets/tmp");
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    },
});

export const middlewareUploadPDF = multer({ 
    storage: storageConfig, 
    fileFilter(req, file, callback) {
        getFileExt(file) == 'pdf' ? callback(null, true) : callback(new Error("Apenas arquivos PDF serão aceitos!"));
    }, 
}).single('file');

export const middlewareUploadCSV = multer({
    fileFilter(req, file, callback) {
        getFileExt(file) == 'csv' ? callback(null, true) : callback(new Error("Apenas arquivos CSV serão aceitos"));
    },
}).single('file');

function getFileExt(file: Express.Multer.File) {
    return (file.originalname.split('.').pop()) ?? '';
}