import ApiService from "./Api";
import qs from "qs";
const AuthService = {
  login: async function(request) {
    const data = qs.stringify({
      email: request.email,
      password: request.password
    });

    try {
      const response = await ApiService.post(data, "user/login");
      return response.data;
    } catch (error) {
      return error;
    }
  }
};

export default AuthService;

export { AuthService };
