import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
    dsn: "",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });

ReactDOM.render(<App />, document.getElementById("root"));
