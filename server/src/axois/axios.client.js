import axios from "axios";

const get= async(url) =>{
    const reponse = await axios.get(url);
    return reponse.data;
}

export default {get};
