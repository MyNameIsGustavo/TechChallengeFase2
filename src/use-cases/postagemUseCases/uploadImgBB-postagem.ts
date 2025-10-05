import fs from "fs";
import path from "path";
import FormData from "form-data";
import axios from "axios";

export async function uploadImagem(arquivo?: Express.Multer.File): Promise<string> {
    if (!arquivo) return "";

    let caminhoImagem = "";

    if (process.env.NODE_ENV === "PRODUCTION") {
        const imgbbKey = process.env.IMGBB_API_KEY;
        const formData = new FormData();
        formData.append("image", fs.createReadStream(arquivo.path));

        const respostaImgBB = await axios.post(
            `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
            formData,
            { headers: formData.getHeaders() }
        );

        caminhoImagem = respostaImgBB.data.data.url;
    }

    if (process.env.NODE_ENV === "DEVELOPMENT") {
        const pastaDestino = path.resolve(__dirname, "../../uploads");
        if (!fs.existsSync(pastaDestino)) fs.mkdirSync(pastaDestino, { recursive: true });

        const caminhoFinal = path.join(pastaDestino, arquivo.filename);
        fs.copyFileSync(arquivo.path, caminhoFinal);

        caminhoImagem = caminhoFinal;
    }

    return caminhoImagem;
}
