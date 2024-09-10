import axios from "axios"
import { errorMessage } from "../utils/helper"
import { AppConfig } from "../config/app.config"
import { toast } from "sonner"
import { IProduct } from "../interface/product"

export const getProducts = async (url: string) => {
    try {
        const { data } = await axios.get(`${AppConfig.API_URL}/${url}`)
        return data as IProduct[]
    }
    catch (error) {
        toast.error(errorMessage(error));
    }
}

export const getProductById = async (url:string) => {
    try {
        const { data } = await axios.get(`${AppConfig.API_URL}/${url}`);
        return data as IProduct
    }
    catch (error) {
        toast.error(errorMessage(error));
    }
}


export const getRelatedProduct = async (id:string) => {
    try {
        const { data } = await axios.get(`${AppConfig.API_URL}/related-products/${id}`);
        return data
    }
    catch (error) {
        toast.error(errorMessage(error));
    }
}
