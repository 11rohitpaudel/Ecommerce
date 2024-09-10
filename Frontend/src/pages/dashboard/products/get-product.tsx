import React, { useCallback, useState } from 'react'
import { getProducts } from '../../../Api/productApi'
import useSWR, { mutate } from 'swr'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../@/components/ui/table"
import Product from '../../Home/Products/Product'
import { displayImage, errorMessage } from '../../../utils/helper'
import { Link } from 'react-router-dom'
import Button from '../../../component/reusable/button/button'
import DeleteModal from '../../../component/product/delete-modal'
import axios from 'axios'
import { AppConfig } from '../../../config/app.config'
import { toast } from 'sonner'
import { IProduct } from '../../../interface/product'

type IModal = "update" | "delete"


const Getproduct = () => {
  const [modal, setModal] = useState<IModal | null>(null);
  const { data: products } = useSWR('getproduct', getProducts)
  const [product, setProduct] = useState<IProduct | null>(null)
 
  const deleteProduct =useCallback(async (id: string)=> {
    try{
      const { data } = await axios.delete(`${AppConfig.API_URL}/deleteproduct/${id}`)

      const updateProduct = products?.filter((p) => p._id !== product?._id);
      mutate('getproduct', updateProduct)

      toast.message(data.message)
      setModal(null)
    }catch (error){
      toast.error(errorMessage(error))
    }

  }, [])

  return (
    <div>
      <div className='my-2 flex justify-end'>
        <Link to={"/dashboard/add-product"}>
          <Button
            buttonType={'submit'}
            buttonColor={{
              primary: true,
            }}>
            Add Product
          </Button>
        </Link>
      </div>


      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SN</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Product Category</TableHead>
            <TableHead>Product Image</TableHead>
            <TableHead>Product Price</TableHead>
            <TableHead>Total Products </TableHead>
            <TableHead>Action </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, idx) => (
            <TableRow key={product._id}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell className="font-medium w-[400px]">
                <img
                  src={displayImage(product.productImage)}
                  alt={product.productName}
                  className='h-20 w-20'
                />
              </TableCell>
              <TableCell>{product.productCategory.categoryName}</TableCell>
              <TableCell className="">{product.productPrice}</TableCell>
              <TableCell className="">{product.totalProduct}</TableCell>
              <TableCell className="">
                <div className='flex items-center gap-2'>
                  <Link to={`/dashboard/update-product/${product._id}`}>
                    <Button
                      buttonType={'button'}
                      buttonColor={{
                        primary: true,
                      }}>
                      Update
                    </Button>
                  </Link>
                  <Button
                    buttonType={'button'}
                    buttonColor={{
                      secondary: true,
                    }}
                    onClick={() =>{ setModal("delete"); setProduct(product) }} 
                    >
                    Delete
                  </Button>

                  {/* <DeleteModal onDelete={() => deleteProduct(product._id)} /> */}

                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ..................................modal............................................. */}
      {/* <DeleteModal /> */}
      {
        product &&
        <DeleteModal
        open={modal =="delete"}
        onClose={()=> setModal(null)}
        onDelete={() => deleteProduct(product._id)} />
      }
    </div>




  )
}

export default Getproduct
