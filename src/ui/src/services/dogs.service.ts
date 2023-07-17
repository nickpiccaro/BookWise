import http from "../http-common";

class DogDataService {
  getAll() {
    console.log("DEBUG | gettings all dogs");
    return http.get(`/dogs/`);
  }
  get(id: string) {
    return http.get(`/dogs/${id}`);
  }

}

const dogDataService = new DogDataService();
export default dogDataService;