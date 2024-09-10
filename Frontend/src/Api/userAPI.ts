import axios from "axios";
import { AppConfig } from "../config/app.config";
import { ICategory } from "../interface/product";
import { toast } from "sonner";
import { errorMessage } from "../utils/helper";
import Cookies from "js-cookie";
import { IUser } from "../interface/user";

export const getAllUser = async (url: string )=> {
    const accessToken = Cookies.get("accessToken");
    try{
        const {data} =await axios.get(`${AppConfig.API_URL}/${url}`,  {
            headers:{
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });
        console.log(data)
        return data as IUser[]
    }catch(error){
        toast.error(errorMessage(error));
    }
}
