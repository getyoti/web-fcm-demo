# web-fcm-demo

Welcome to the Web FCM Demo. The purpose of this repository is to demo the Face Capture Module npm package integration and use the output image to perform a prediction calling Yoti AI Services.

## Setup

This project needs to have a configuration file in order to work. We only need to pass the configuration values as environment variables. We can follow this approach using the `.env` or `.env.local` file:

```bash
PEM_FILE_PATH=
SDK_ID=
ENDPOINT=
```

- **PEM_FILE_PATH:** path to the `.pem` private key needed to request Yoti Services.
- **SDK_ID:** client SDK ID needed to request Yoti Services.
- **ENDPOINT:** endpoint for the service to be requested.

Both `PEM_FILE_PATH` and `SDK_ID` secrets are obtained from following the instructions in [this document](https://developers.yoti.com/yoti/getting-started-hub). Specifically, under `Generate API keys` section.

The information required to fill the `ENDPOINT` variable can be found [here](https://developers.yoti.com/age-estimation/integration-guide). The `BASE_URL` (base URL for the service to be requested) is set in the `.env` file (check the value to fill the `ENDPOINT` field).

You can also update the port that the local server is running on, by modifying `SERVER_PORT` environment variable. The default port is `5001`.

Set the `clientSdkId` in the [FaceCapture component](https://github.com/getyoti/web-fcm-demo/blob/04738a2a43258594872c28b6bced669c6789ad49/src/App.js#L117) with `SDK_ID` value in the `.env.local` file.

## SSL Certificate Setup

This application now runs on HTTPS for both the client and server. Before running the app, you'll need to generate SSL certificates:

```bash
# Generate self-signed certificates for development
npm run generate-certs
```

This will create an `ssl` folder with self-signed certificates that will be used by both the server and the Vite development server.

### Windows Users

If you're using Windows, you might need to:

1. Manually create the `ssl` folder in the project root directory
2. Generate self-signed certificates manually using:

```powershell
# Create the ssl directory if it doesn't exist
mkdir ssl

# Generate the certificates using OpenSSL
openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes -subj "/CN=localhost"
```

Note: Windows users need to have OpenSSL installed. You can install it using [Chocolatey](https://chocolatey.org/): `choco install openssl`.

## Run locally

This demo was designed to be run locally. To get started, follow the below steps in the root directory:

1. Install all the dependencies:

    ```bash
    npm install
    ```

2. Generate SSL certificates (if you haven't already):

    ```bash
    npm run generate-certs
    ```

3. Start the server that will manage the requests:

    ```bash
    # For development (with TypeScript hot-reload):
    npm run dev:server
    ```

4. Start the client in a different terminal window:

    ```bash
    npm run dev
    ```

Now the client is ready to use. You just need to follow the FCM instructions, take a photo and wait for the response.

### Windows

If the client browser does not start automatically or the given address in the terminal does not work, replace `0.0.0.0` by `127.0.0.1`.

When using HTTPS, your browser may show security warnings. This is normal because you're using self-signed certificates. You can proceed by accepting the security warning in your browser.

## Face Capture module

The `Face Capture` module is a npm package that provides a React component which takes pictures using face detection tools.
The usage of this module can be found in `App.js`. You can find more information about how to install the dependency, the API sections, etc [here](https://www.npmjs.com/package/@getyoti/react-face-capture).

Use the secure flag to ensure the image can't be changed once is taken. Have in mind this will make some additional calls to the Yoti servers in order to secure the request.

### Secure mode

[Secure mode](./docs/secure-mode.md)

## Yoti NodeJS SDK

The `Yoti NodeJS SDK` package allows to integrate a NodeJS back-end with Yoti apps. The usage of this package to perform predictions to a Yoti app can be found in the `server.ts` file (TypeScript source) or `dist/server.js` (compiled JavaScript). For more information about this package, check [this link](https://www.npmjs.com/package/yoti).

Level of assurance is an optional parameter of the Yoti antispoofing API used to determine the strictness of the check.
