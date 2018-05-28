import Axios from "axios/index";
import Constants from "../Constants";

const api = Axios.create({baseURL: Constants.SERVER_URL + '/api', withCredentials: true});
export default {
  api,
  getRepertuaarid: () => api.get('repertuaarid'),
  getPartituurid: (repertuaar) => api.get('repertuaar/' + repertuaar + '/partituurid'),
  getPartiid: (partituur) => api.get('partituur/' + partituur + '/partiid'),
  search: (query) => api.get('otsi/' + encodeURIComponent(query))
}
