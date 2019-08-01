import ApiService from "./Api";
const ConfigService = {
  get: async function(request) {
    try {
      const response = await ApiService.get("config/detail");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

};

export default ConfigService;

export { ConfigService };
