import config from '../../../config/api.config'

const URL_PRODUCTS = config.URL_API_PRODUCTS;

module.exports = {
    /**
     * 
     * @param {string} search Value search products
     * @return {Array} Return list products
     */
    async getProducts(search) {
        try {
            const res = await fetch(`${URL_PRODUCTS}/products?filter=${search}`, {
                method: 'GET'
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}