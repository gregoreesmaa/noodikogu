import Axios from "axios/index";

const api = Axios.create({baseURL: 'http://192.168.1.154:8080/'});
export default {
  getRepertuaarid: () => api.get('repertuaarid'),
  getRepertuaar: (id) => api.get('repertuaarid/' + id),
  search: (query) => api.get('otsi/' + encodeURIComponent(query))
}
