import React from 'react'
import UpdateProductForm from './update-product-form'
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getProductById } from '../../../../Api/productApi';

const UpdateProductPage = () => {
    const {id} = useParams();

    const { data: product } = useSWR(`product/${id}`, getProductById)
  return (
    <div>{
        product &&
        <UpdateProductForm product={product} />
        }
    </div>
  )
}

export default UpdateProductPage
