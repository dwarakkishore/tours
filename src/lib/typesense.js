import { Client } from "typesense";

const masterKey = process.env.TYPESENSE_API_KEY || "xyz";

const typesenseClient = new Client({
  nodes: [
    {
      host:
        process.env.TYPESENSE_HOST ||
        "typesense-707350399508.asia-south1.run.app",
      port: parseInt(process.env.TYPESENSE_PORT || "8108", 10),
      protocol: process.env.TYPESENSE_PROTOCOL || "http",
    },
  ],
  apiKey: masterKey,
  connectionTimeoutSeconds: 10,
});

export { typesenseClient };
