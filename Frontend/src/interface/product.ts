export interface IProduct {
   productCategory: ICategory
   productDescription: string
   productName: string
   productRating: string
   productPrice:string
   totalProduct: number
   cretedAt: string
   productImage: string
   _id: string
  }

  export interface ICategory{
    _id: string
    categoryName: string
  }