import ApiService from "../services/ApiService";

export default {
    fetchConnections(queryParams) {
        return ApiService.get('connections', null, queryParams);
    },
}