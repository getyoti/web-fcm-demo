import dotenv from "dotenv-flow";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import path from "path";
import { RequestBuilder, Payload } from "yoti";
import https from 'https';
import fs from 'fs';
import morgan from 'morgan';

dotenv.config();

const PORT: number = parseInt(process.env.SERVER_PORT || '5000', 10);

const app = express();

// Add morgan for request logging
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));

interface PredictRequestBody {
  secure?: boolean;
  [key: string]: any;
}

app.post("/api/predict", (req: Request<{}, any, PredictRequestBody>, res: Response) => {
  const secure = req.body.secure;
  const multiframe = req.query.multiframe;

  const request = new RequestBuilder()
    .withBaseUrl(process.env.BASE_URL!)
    .withPemFilePath(process.env.PEM_FILE_PATH!)
    .withEndpoint(process.env.ENDPOINT!)
    .withPayload(new Payload(req.body))
    .withMethod("POST")
    .withHeader("X-Yoti-Auth-Id", process.env.SDK_ID!)
    .withQueryParam("secure", !!secure)
    .withQueryParam("multiframe", multiframe === 'true')
    .build();

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
