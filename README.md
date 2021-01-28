# web-fcm-demo

Welcome to the Web FCM Demo. The purpose of this repository is to integrate the Face Capture module and perform predictions to the AI Services through Connect. The repository is ready to run in local. This way, any developer could learn how to integrate the module and make requests through Connect.

## Setup

This project need to have a configuration file in order to work. We only need to pass the configuration values as environment variables. We can follow this approach using a `.env.local` file:

Create a `.env.local` file in the root:

```bash
PEM_FILE_PATH=
SDK_ID=
BASE_URL=
ENDPOINT=
```

- **PEM_FILE_PATH:** path to the `.pem` private key needed for Connect.
- **SDK_ID:** client SDK ID needed for Connect.
- **BASE_URL:** base URL for the service to be requested.
- **ENDPOINT:** endpoint for the service to be requested.

Both `PEM_FILE_PATH` and `SDK_ID` secrets must be obtained following the instructions in [this document](https://developers.yoti.com/yoti/getting-started-hub). Specifically, under `Generate API keys` section.

The information required to fill `BASE_URL` and `ENDPOINT` variables can be found [here](https://developers.yoti.com/yoti).

## Run in local

This project was designed to run in it local as a demo. We just need to follow next steps in the root path:

1. Install all the dependencies:

    ```bash
    npm install
    ```

2. Start the server that will manage the request through Connect:

    ```bash
    node server.js
    ```

3. Start the client:

    ```bash
    npm start
    ```

Now the client is ready to use. You just need to follow the FCM instructions, take a photo and wait for the response.

## Face Capture module

The `Face Capture` module is a npm package that provides a React component which takes pictures using face detection tools.
The usage of this module can be found in `App.js`. You can find more information about how to install the dependency, the API sections, etc [here](https://www.npmjs.com/package/@getyoti/react-face-capture).

## Yoti NodeJS SDK

The `Yoti NodeJS SDK` package allows to integrate a NodeJS back-end with Yoti apps. The usage of this package to perform predictions to a Yoti app can be found in `server.js` file. For more information about this package, check [this link](https://www.npmjs.com/package/yoti).
