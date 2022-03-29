import axios from "axios";

export class Api {
  predict = async (fcmResponse, levelOfAssurance, metadataDevice) => {
    return axios.post("/api/predict", {
      fcmResponse: fcmResponse,
      levelOfAssurance: levelOfAssurance ? levelOfAssurance : undefined,
      metadata: metadataDevice ? { device: metadataDevice } : undefined,
    });
  };
}
