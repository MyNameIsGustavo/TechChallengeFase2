import fs from "fs";
import path from "path";
import FormData from "form-data";
import axios from "axios";
import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "PRODUCTION" ? ".env.prod" : ".env.local";
dotenv.config({ path: envFile });

export async function uploadImagem(arquivo?: Express.Multer.File): Promise<string | null> {
    if (!arquivo) return null;

    if (process.env.NODE_ENV === "PRODUCTION") {
        const imgbbKey = process.env.IMGBB_API_KEY;
        if (!imgbbKey) throw new Error("IMGBB_API_KEY não definido");

        const formData = new FormData();

        formData.append("image", fs.createReadStream(arquivo.path), arquivo.originalname);

        const respostaImgBB = await axios.post(
            `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
            formData,
            { headers: formData.getHeaders() }
        );

        return respostaImgBB.data.data.url;
    }

    if (process.env.NODE_ENV === "DEVELOPMENT") {
        const pastaDestino = path.resolve(__dirname, "../../uploads");

        if (!fs.existsSync(pastaDestino)) {
            fs.mkdirSync(pastaDestino, { recursive: true });
        }

        const caminhoFinal = path.join(pastaDestino, arquivo.originalname);

        fs.copyFileSync(arquivo.path, caminhoFinal);

        return caminhoFinal;
    }

    return null;
}
