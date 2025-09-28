import { clientPrometheus, coletaMetricasAPI } from "../../../prometheus";
import { app } from "../../../servidor";

coletaMetricasAPI()

export function prometheusConfigRota() {
    app.get("/metrics", async (req, res) => {
        res.set("Content-Type", clientPrometheus.register.contentType);
        res.end(await clientPrometheus.register.metrics());
    })
}