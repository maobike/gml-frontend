import { axiosInstance, axiosInstanceExtern } from "./../../../api/AxiosConfig";

class UserService {

    /**
     * @returns un empleado
     * @author Mauricio Moreno @maomaoq@hotmail.com
     */

    getEmployee = (id) => {
        return axiosInstance.get(`/api/employees/${id}`)
    }

    /**
     * @returns users
     * @author Mauricio Moreno @maomaoq@hotmail.com
     */

    getUsers = () => {
        return axiosInstance.get('/api/users')
    }

    /**
     * @returns country of Americas
     * @author Mauricio Moreno @maomaoq@hotmail.com
     */

    getCountriesUsers = () => {
        return axiosInstanceExtern.get('/v3.1/region/americas?fields=name')
    }

    /**
     * @returns empleados
     * @author Mauricio Moreno @maomaoq@hotmail.com
     */

    addUser = (data) => {
        return axiosInstance.post('/api/users', data)
    }

    /**
     * @returns empleados
     * @author Mauricio Moreno @maomaoq@hotmail.com
     */

    editUser = (id, data) => {
        return axiosInstance.put(`/api/users/${id}`, data)
    }

}

export default new UserService();