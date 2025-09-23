import axios from 'axios';

const getFactService = async () => {
    const response = await axios.get('https://meowfacts.herokuapp.com/?lang=esp');
    console.log('Datos obtenidos:', response.data);
    return response.data.data[0];
}

export { getFactService }
