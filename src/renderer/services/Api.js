import axios from "axios";

const ApiService = {
	init(baseURL) {
		axios.defaults.baseURL = baseURL;
	},
	removeHeader() {
		axios.defaults.headers.common = {};
	},
	get(resource = "") {
		return axios.get(resource);
	},
	post(data, resource = "") {
		return axios.post(resource, data);
	},
	put(data, resource = "") {
		return axios.put(resource, data);
	},
	delete(resource = "") {
		return axios.delete(resource);
	},
	customRequest(data) {
		return axios(data);
	}
};

export default ApiService;
