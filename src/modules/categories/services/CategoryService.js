import { axiosInstance } from "./../../../api/AxiosConfig";

class CategoryService {

    /**
     * @returns categories
     * @author Mauricio Moreno @maomaoq@hotmail.com
     */

    getCategories = (id) => {
        return axiosInstance.get(`/api/categories`)
    }

}

export default new CategoryService();