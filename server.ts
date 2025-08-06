import dotenv from "dotenv-flow";
import express = require("express");
import bodyParser from "body-parser";
import path from "path";
import { RequestBuilder, Payload } from "yoti";
import https from 'https';
import fs from 'fs';
import morgan from 'morgan';

dotenv.config();

const rawPort = process.env.SERVER_PORT;
if (!rawPort) {
  console.error("SERVER_PORT environment variable is not set.");
  process.exit(1);
}
const PORT = parseInt(rawPort, 10);
if (isNaN(PORT) || PORT < 1 || PORT > 65535) {
  console.error(`Invalid port number: ${rawPort}. Please specify a valid port between 1 and 65535.`);
  process.exit(1);
}

const app = express();

// Add morgan for request logging
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));

interface PredictRequestBody {
  secure?: boolean;
  [key: string]: string | number | boolean | null | undefined;
}

app.post("/api/predict", (req, res) => {
  const securePayload = req.body.secure;
  const multiframe = Boolean(req.query.multiframe);

  const baseRequest = new RequestBuilder()
    .withBaseUrl(process.env.BASE_URL!)
    .withPemFilePath(process.env.PEM_FILE_PATH!)
    .withEndpoint(process.env.ENDPOINT!)
    .withPost()
    .withPayload(new Payload(req.body))
    .withQueryParam("secure", !!securePayload)

  if (process.env.SDK_ID) {
    baseRequest.withHeader("X-Yoti-Auth-Id", process.env.SDK_ID!);
  }

  if (multiframe) {
    baseRequest.withQueryParam("multiframe", 'true');
  }

  const request = baseRequest.build();

  request
    .execute()
    .then(({ parsedResponse }) => {
      return res.status(200).send(parsedResponse);
    })
    .catch((error: any) => {
      return res.status(error.status).send(error.response.text);
    });
});

// SSL certificate options
const options = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
};

// Create HTTPS server
https.createServer(options, app).listen(PORT, () =>
  console.log(`HTTPS Server started! Listening for client calls on https://localhost:${PORT}`)
);
