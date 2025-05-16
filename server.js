require("dotenv-flow").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { RequestBuilder, Payload } = require("yoti");
const https = require('https');
const fs = require('fs');
const morgan = require('morgan');

const PORT = process.env.SERVER_PORT || 5000;

const app = express();
// Add morgan for request logging
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb", extended: true }));

app.post("/api/predict", function (req, res) {
  const secure = req.body.secure;

  const request = new RequestBuilder()
    .withBaseUrl(process.env.BASE_URL)
    .withPemFilePath(process.env.PEM_FILE_PATH)
    .withEndpoint(process.env.ENDPOINT)
    .withPayload(new Payload(req.body))
    .withMethod("POST")
    .withHeader("X-Yoti-Auth-Id", process.env.SDK_ID)
    .withQueryParam("secure", !!secure)
    .build();

  request
    .execute()
    .then(({ parsedResponse }) => {
      return res.status(200).send(parsedResponse);
    })
    .catch((error) => {
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
