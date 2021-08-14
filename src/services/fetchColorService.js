import axiosWithAuth from '../helpers/axiosWithAuth';

const fetchColorService = () => {

    return axiosWithAuth()
    .get('/colors')
    .then(res => {
        return res
    })
    .catch(err => {
        return err
    })
}

export default fetchColorService;