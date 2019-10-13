import {apiClient} from '../utils/ApiClient';
import {isObjectEmpty} from '../utils/Helpers';

export default {
    get(resource, id = null, query_params = null) {
        if (id) {
            resource += '/' + id;
        }
        if (query_params) {
            resource += '?';
            for (let key in query_params) {
                if (Array.isArray(query_params[key])) {
                    var find = '"';
                    var re = new RegExp(find, 'g');
                    resource += key + '=' + (JSON.stringify(query_params[key])).replace(re, '');
                } else {
                    resource += key + '=' + query_params[key];
                }
                delete query_params[key];
                if (!isObjectEmpty(query_params)) {
                    resource += '&';
                }
            }
        }
        return apiClient.get(resource);
    }
}