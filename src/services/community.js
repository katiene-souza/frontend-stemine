import api from './api'; // Importe a instância do Axios configurada

const COMMUNITY_API_BASE_URL = '/community-posts'; 

class CommunityService {
  getAllPosts() {
    return api.get(COMMUNITY_API_BASE_URL);
  }

  getPostById(id) {
    return api.get(COMMUNITY_API_BASE_URL + `/${id}`);
  }

  createPost(postData) {
    return api.post(COMMUNITY_API_BASE_URL, postData);
  }

  updatePost(id, postData) {
    return api.put(COMMUNITY_API_BASE_URL + `/${id}`, postData);
  }

  deletePost(id) {
    return api.delete(COMMUNITY_API_BASE_URL + `/${id}`);
  }
}

export default new CommunityService();