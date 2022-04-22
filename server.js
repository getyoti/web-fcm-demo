require("dotenv-flow").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { RequestBuilder, Payload } = require("yoti");

const app = express();
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

app.listen(5000, () =>
  console.log("Server started! Listening for client calls...")
);
