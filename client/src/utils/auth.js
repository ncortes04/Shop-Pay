import { getRole } from "./apiRoutes";
import { getSingle } from "./apiRoutes"; 
class AuthService {
    getToken(){
        return localStorage.getItem('id_token');
    }
    setToken(token){
        localStorage.setItem('id_token', token)
    }
    login(idToken) {
        localStorage.setItem('id_token', idToken);
    }
    async getMe() {
        const token = this.getToken;
        if (!token) {
            return null;
        }
        const user = await getSingle(token)
        const data = await user.json()
        return data
    }
    logout(){
        localStorage.removeItem('id_token')
        window.location.assign('/');
    }
    loggedIn(){
        const token = this.getToken()
        if(!token){
            return false
        }
        return true
    }
}

export default new  AuthService()