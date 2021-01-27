import axios from "axios";

export class Api {
  predict = async (img) => {
    return axios.post("/api/predict", { img: img });
  };
}
