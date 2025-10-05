import { clientPrometheus, coletaMetricasAPI } from "../../../prometheus";
import { app } from "../../../servidor";

coletaMetricasAPI();

export function prometheusConfigRota() {
    /**
     * @openapi
     * /metrics:
     *   get:
     *     summary: Coleta métricas do Prometheus
     *     description: Retorna métricas expostas pelo Prometheus para monitoramento.
     *     tags:
     *       - Monitoramento
     *     responses:
     *       200:
     *         description: Métricas coletadas com sucesso.
     *         content:
     *           text/plain:
     *             schema:
     *               type: string
     *               example: "# HELP http_requests_total The total number of HTTP requests.\n# TYPE http_requests_total counter\nhttp_requests_total{method=\"get\",code=\"200\"} 1027\n"
     */
    app.get("/metrics", async (req, res) => {
        res.set("Content-Type", clientPrometheus.register.contentType);
        res.end(await clientPrometheus.register.metrics());
    });
}
