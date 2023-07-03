import http from "../http-common";

class BookDataService {
  search(query: string) {
    return http.get(`/books/${query}`);
  }

}

export default new BookDataService();