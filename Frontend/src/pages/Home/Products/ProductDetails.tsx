import React from 'react'
import ProductDetail from '../../../component/product/product-details'
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
    const params = useParams();
    const id = params.id

    console.log(params)
  return (
    <div>
      {
        id&&
      <ProductDetail id={id} />
      }
    </div>
  )
}

export default SingleProduct
