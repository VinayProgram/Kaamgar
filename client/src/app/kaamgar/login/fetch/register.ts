import api from "@/lib/axios";
import { RegisterationDTO } from "../dto/registeration";


export const registerationAPI = async (data: RegisterationDTO) =>{
    return await api.post("users/kaamgar-register", data)
    .then((response) => {
        return response;
    })
} 