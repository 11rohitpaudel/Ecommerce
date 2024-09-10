import { toast } from "sonner"
import { errorMessage } from "../utils/helper"
import { AppConfig } from "../config/app.config"
import axios from "axios"
import { ICategory } from "../interface/product"





export const getCategory =async(url: string) =>{
    try{
        const {data} =await axios.get(`${AppConfig.API_URL}/${url}`);
        console.log(data)
        return data as ICategory[]
    }catch(error){
        toast.error(errorMessage(error));
    }
}

