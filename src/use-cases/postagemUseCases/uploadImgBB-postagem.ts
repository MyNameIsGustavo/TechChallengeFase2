import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === 'PRODUCTION' ? '.env.prod' : '.env.local';
dotenv.config({ path: envFile });

export async function uploadParaImgbb(caminhoArquivo: string): Promise<string> {
    const form = new FormData();
    const arquivo = fs.readFileSync(caminhoArquivo);

    form.append("image", arquivo.toString("base64"));

    const resposta = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
        form,
        { headers: form.getHeaders() }
    );

    if (resposta.data && resposta.data.data && resposta.data.data.url) {
        return resposta.data.data.url;
    }

    throw new Error("Falha ao enviar imagem para o ImgBB");
}
