import axios from 'axios'

function axiosWithAuth() {
    return axios.create({
        baseURL: 'https://localhost:5000',
        headers: {
            authorization: localStorage.getItem('token')
        },
    })
}

export default axiosWithAuth