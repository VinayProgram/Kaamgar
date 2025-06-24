import api from "@/lib/axios";
import { loginDTO, RegisterationDTO } from "../dto/registeration";
import axios from "axios";

export const loginAPI = async (data: loginDTO) =>{
    return await api.post("/login-module", data)
    .then((response) => {
        return response;
    })
} 

