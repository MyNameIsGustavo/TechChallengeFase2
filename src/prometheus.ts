import client from "prom-client";

export const coletaMetricasAPI = client.collectDefaultMetrics;
export const clientPrometheus = client;