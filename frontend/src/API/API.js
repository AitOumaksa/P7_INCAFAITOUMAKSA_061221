import axios from 'axios';
//L'url des requete envoyer au backend
export default axios.create({
    baseURL: `http://localhost:3000/api/`,
   
    })