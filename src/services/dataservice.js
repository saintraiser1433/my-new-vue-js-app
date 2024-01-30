import http from './http'

class DataService {

    fetchData() {
        return http.get('/data');
    }

    addData(post) {
        return http.post('/data',post);
    }

    updateData(id,post) {
        return http.put(`/data/${id}`,post);
    }

    deleteData(id) {
        return http.delete(`/data/${id}`);
    }

    getDataById(id) {
        return http.get(`/data/${id}`);
    }

}

export default new DataService()