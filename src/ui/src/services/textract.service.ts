import http from "../http-common";

class TextractDataService {
  upload(img: File) {
    const formData = new FormData();
    formData.append('image', img);
    return http.post('/yolo/upload', formData, {
        headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

}

const textractDataService = new TextractDataService();
export default textractDataService;