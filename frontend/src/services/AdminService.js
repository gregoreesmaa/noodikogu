import Axios from 'axios';
import Constants from '../Constants';

const api = Axios.create({ baseURL: Constants.SERVER_URL + '/api/admin', withCredentials: true });
export default {
  api,
  getPillimehed: () => api.get('pillimehed'),
  getPartiid: (partituur) => api.get('partiid/' + partituur),
  getPartituurid: () => api.get('partituurid'),
  getRepertuaarid: () => api.get('repertuaarid'),
  search: (query) => api.get('otsi/' + encodeURIComponent(query))
}
