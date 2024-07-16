import axios from "axios";

const api = () => {
  const token = localStorage.getItem('ACC_USER_TOKEN')?.replace(/"/g, '');;
  const lang = localStorage.getItem('ACC_LANG')?.replace(/"/g, '');;
  // console.log('server api:', token);

  const apiCall = axios.create({
    // baseURL: `https://dev.api.animalcc.com/api/v1`,
    baseURL: `${import.meta.env.VITE_SERVER_API}`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept-Language': `${lang}`,
    },
  })
  return apiCall
}

export default api