export class Api {
  predict = async (body) => {
    return fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  };
}
