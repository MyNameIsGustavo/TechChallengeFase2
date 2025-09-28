import { clientPrometheus, coletaMetricasAPI } from "../../../prometheus";
import { app } from "../../../servidor";

coletaMetricasAPI()

export function prometheusConfigRota() {
    /**
    * @openapi
    * /metrics:
    *   get:
    *     summary: Coleta métricas do Prometheus
    *     responses:
    *       200:
    *         description: Métricas coletadas com sucesso.
    */
    app.get("/metrics", async (req, res) => {
        res.set("Content-Type", clientPrometheus.register.contentType);
        res.end(await clientPrometheus.register.metrics());
    });
}