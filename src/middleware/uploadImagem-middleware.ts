import multer from "multer";
import path from "path";
import fs from "fs";

const pastaUploads = path.resolve(__dirname, "../../../../../uploads");

if (!fs.existsSync(pastaUploads)) {
  fs.mkdirSync(pastaUploads, { recursive: true });
}

const armazenamentoLocal = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pastaUploads);
  },
  filename: (req, file, cb) => {
    const nomeArquivo = `${Date.now()}-${file.originalname}`;
    cb(null, nomeArquivo);
  },
});

export const uploadImagemMiddleware = multer({
  storage: armazenamentoLocal,
});
