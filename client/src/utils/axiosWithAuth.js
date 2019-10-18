import axios from 'axios'

function axiosWithAuth() {
    return axios.create({
        baseURL: 'http://localhost:5000',
        headers: {
            authorization: localStorage.getItem('token')
        },
    })
}

export default axiosWithAuth