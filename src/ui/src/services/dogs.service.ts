import http from "../http-common";

class DogDataService {
  getAll() {
    return http.get(`/dogs/`);
  }
  get(id: string) {
    return http.get(`/dogs/${id}`);
  }

}

const dogDataService = new DogDataService();
export default dogDataService;