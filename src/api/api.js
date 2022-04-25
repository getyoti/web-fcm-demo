import axios from "axios";

export class Api {
  predict = async (body) => {
    return axios.post("/api/predict", body);
  };
}
