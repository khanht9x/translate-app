import ApiService from "./Api";

const AuthService = {
  login: async function(request) {
    const data = {
      email: request.email,
      password: request.password
    };

    try {
      const response = await ApiService.post(data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
};

export default AuthService;

export { AuthService };
