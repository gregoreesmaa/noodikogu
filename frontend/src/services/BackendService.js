import Axios from "axios/index";
import Constants from "../Constants";

const api = Axios.create({baseURL: Constants.SERVER_URL + '/api', withCredentials: true});
export default {
  api,
  getRepertuaarid: () => api.get('repertuaarid'),
  getRepertuaar: (id) => api.get('repertuaarid/' + id),
  search: (query) => api.get('otsi/' + encodeURIComponent(query))
}
