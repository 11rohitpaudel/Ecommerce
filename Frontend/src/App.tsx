import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './layout/Header'
import Home from './pages/Home/Home'
import Product from './pages/Home/Products/Product'
import Pricing from './pages/Home/pricing/Pricing'
import Contact from './pages/Home/contact/Contact'
import SingleProduct from './pages/Home/Products/ProductDetails'
import PostDetail from './pages/Home/Post/PostDetails'
import Post from './component/Post/Post'
import Signin from './pages/Home/Signin/signin'
import Register from './pages/register/Register'
import NotFound from './pages/not-found/NotFound'
import AuthLayout from './layout/auth-layout/auth'
import Getproduct from './pages/dashboard/products/get-product'
import GetCategory from './pages/dashboard/category/get-category'
import Getorder from './pages/dashboard/orders/get-order'
import Getcustomer from './pages/dashboard/customers/get-customer'
import Dashboard from './pages/dashboard/dashboard'
import AddProductForm from './pages/dashboard/products/add-products'
import DefaultLayout from './layout/deafault/default'
import UpdateProductForm from './pages/dashboard/products/update-product/update-product-form'
import UpdateProductPage from './pages/dashboard/products/update-product/update-product'
import UserLayout from './layout/user-layout/userLayout'
import AdminLayout from './layout/user-layout/admin-layout'
import UserDashboard from './pages/dashboard/user-dashboard/user-dashboard'
import Cart from './pages/dashboard/carts/Cart'
import Shipping from './pages/dashboard/shipping/shipping'
import OrderRequests from './pages/dashboard/shipping/order-request'



const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<DefaultLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/products" element={<Product />} />
                        <Route path="/products/:id" element={<SingleProduct />} />
                        <Route path="/Post/:id" element={<PostDetail />} />
                        <Route path="/Post" element={<Post />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/contact" element={<Contact />} />
                    </Route>
                    {/* Authentication layout */}
                    <Route element={<AuthLayout />}>



                        <Route element={<AdminLayout />}>




                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/dashboard/add-product" element={<AddProductForm />} />
                            <Route path="/dashboard/products" element={<Getproduct />} />
                            <Route path="/dashboard/update-product/:id" element={<UpdateProductPage />} />



                            <Route path="/dashboard/customers" element={<Getcustomer />} />

                            <Route path="/dashboard/orders" element={<Getorder />} />

                            <Route path="/dashboard/category" element={<GetCategory />} />
                        </Route>
                        <Route element={<UserLayout />}>
                            <Route path="/user-dashboard" element={<UserDashboard /> } />
                            <Route path="/carts" element={<Cart /> } />

                            <Route path="/shipping" element={<OrderRequests />} />
                            <Route path="/shipping/:id" element={<Shipping />} />
                        </Route>

                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
