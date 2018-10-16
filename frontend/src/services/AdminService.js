import Axios from 'axios';
import Constants from '../Constants';

const api = Axios.create({
  baseURL: Constants.SERVER_URL + '/api/admin',
  withCredentials: true
});
export default {
  api,
  getPillimehed: () => api.get('pillimehed'),
  getPartiid: (partituur) => api.get('partituur/' + partituur + '/partiid'),
  getPartituurid: () => api.get('partituurid'),
  getRepertuaarid: () => api.get('repertuaarid'),
  deleteScore: (id) => api.delete('partii/' + id),
  deletePiece: (id) => api.delete('partituur/' + id),
  search: (query) => api.get('otsi/' + encodeURIComponent(query)),
  addPartituur: (form) => api.post('partituur', form, {headers: {'content-type': 'multipart/form-data'}}),
  addNewPlayer: (newPlayer) => api.post('pillimehed', newPlayer),
  getFlutePlayers: () => api.get('flutePlayers'),
}
