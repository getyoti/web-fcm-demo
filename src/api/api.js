import axios from "axios";

export class Api {
  predict = async (body, multiframe) => {
    return axios.post(`/api/predict?multiframe=${multiframe}`, { ...body });
  };
}
