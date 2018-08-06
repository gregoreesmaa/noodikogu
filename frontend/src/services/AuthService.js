import Axios from 'axios';
import Constants from '../Constants';

const api = Axios.create({ baseURL: Constants.SERVER_URL + '/api/auth', withCredentials: true });
export default {
  api,
  authenticate: (credentials) => api.post('/login', credentials)
}
