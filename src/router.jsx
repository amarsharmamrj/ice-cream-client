import React, { useState, useEffect, useMemo } from 'react'
import { Routes, Route } from "react-router-dom"
import Template from './components/partials/template';
import Home from '../src/pages/home'
import Chocobars from './components/partials/home/chocobars-section/chocbars';
import UploadFile from './components/partials/uploadFile';
import AddCategory from './components/admin/category/addCategory';
import ManageCategory from './components/admin/category/manageCategory';
import UpdateCategory from './components/admin/category/updateCategory';
import AddProduct from './components/admin/product/addProduct';
import ManageProduct from './components/admin/product/manageProduct';
import UpdateProduct from './components/admin/product/updateProduct';
import ProductDetail from './pages/productDetail';
import Cart from './pages/cart';
// import ManageSalesmanBilling from './components/admin/salesManBilling/manageSalesmanBilling'; 
import AddSalesmanBilling from './components/admin/salesManBilling/addSalesmanBilling';
import AddSalesman from './components/admin/salesman/addSalesman';
import ManageSalesman from './components/admin/salesman/manageSalesman';
import UpdateSalesman from './components/admin/salesman/updateSalesman';
import UpdateSalesmanBilling from './components/admin/salesManBilling/updateSalesmanBilling';
import ReturnSalesmanBilling from './components/admin/salesManBilling/returnSalesmanBilling';
import SalesmanBillingTabs from './components/admin/salesManBilling/salesmanBillingTabs';
import ViewReturnSalesmanBilling from './components/admin/salesManBilling/viewSalesmanBilling';
import Dashboard from './pages/dashboard';
import ManagePartyBooking from './components/admin/partyBooking/managePartyBooking';
import AddPartyBooking from './components/admin/partyBooking/addPartyBooking';
import UpdatePartyBooking from './components/admin/partyBooking/updatePartyBooking';
import ViewPartyBooking from './components/admin/partyBooking/viewPartyBooking';
import SalesmanReport from './components/admin/salesmanReport/salesmanReport';
import SignUp from './pages/signUp';
import Login from './pages/login';
import { UserContext } from './contexts/userContext';
import EditUser from './pages/editUser';
import Unauthorized from './components/partials/unauthorized';
import { getLS } from './contexts/localStorageEncryption';
import AllProducts from './pages/allProducts';
import ContactForms from './components/admin/contactForms/contactForms';
import { CartContext } from './contexts/cartContext';
 
const Router = () => {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);

    const userValue = useMemo(() => ({ user, setUser }), [user, setUser])
    const cartValue = useMemo(() => ({ cart, setCart }), [cart, setCart])

    useEffect(() => {
        console.log('cart:', cart); 
        console.log("getLS:", getLS())
        setUser(getLS())
        // window.localStorage.setItem("cart", JSON.stringify(cart));
        console.log("#@:", JSON.parse(window.localStorage.getItem("cart")))
        setCart(JSON.parse(window.localStorage.getItem("cart")))
    }, [1])

    return (
        <UserContext.Provider value={userValue}>
        <CartContext.Provider value={cartValue}>
        <Template cart={cart} setCart={setCart}>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/home" exact element={<Chocobars />} />
                <Route path="/all-products" exact element={<AllProducts />} />
                <Route path="/dashboard" exact element={<Dashboard />} />      
                
                <Route path="/signup" exact element={<SignUp />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/edit-user" exact element={<EditUser />} />
                <Route path="/unauthorized" exact element={<Unauthorized />} />

                <Route path="/salesman-report" exact element={<SalesmanReport />} />
                <Route path="/salesman-report/:name/:id" exact element={<SalesmanReport />} />

                <Route path="/upload" exact element={<UploadFile />} />

                <Route path="/contact-forms" exact element={<ContactForms />} />

                <Route path="/add-category" exact element={<AddCategory />} />
                <Route path="/manage-category" exact element={<ManageCategory />} />
                <Route path="/update-category/:id" exact element={<UpdateCategory />} />

                <Route path="/add-product/" element={<AddProduct />} />
                <Route path="/manage-product" element={<ManageProduct />} />
                <Route path="/update-product/:id" exact element={<UpdateProduct />} />

                <Route path="/product-detail/:id" exact element={<ProductDetail cart={cart} setCart={setCart} />} />
                <Route path="/cart" exact element={<Cart cart={cart} setCart={setCart} />} />
                <Route path="/product-detail/view/:id" exact element={<ProductDetail />} />

                <Route path="/add-salesman" exact element={<AddSalesman />} />
                <Route path="/manage-salesman" exact element={<ManageSalesman />} />
                <Route path="/update-salesman/:id" exact element={<UpdateSalesman />} />  

                {/* <Route path="/manage-salesman-billing" exact element={<ManageSalesmanBilling />} /> */}
                <Route path="/salesman-billing/:type" exact element={<SalesmanBillingTabs />} />
                <Route path="/add-salesman-billing" exact element={<AddSalesmanBilling />} />
                <Route path="/update-salesman-billing/:id" exact element={<UpdateSalesmanBilling />} />
                <Route path="/return-salesman-billing/:id" exact element={<ReturnSalesmanBilling />} />
                <Route path="/view-salesman-billing/:id" exact element={<ViewReturnSalesmanBilling />} />
                
                <Route path="/manage-party-booking" exact element={<ManagePartyBooking />} />
                <Route path="/add-party-booking" exact element={<AddPartyBooking />} />
                <Route path="/update-party-booking/:id" exact element={<UpdatePartyBooking />} />
                <Route path="/view-party-booking/:id" exact element={<ViewPartyBooking />} />
            </Routes>
        </Template> 
        </CartContext.Provider>
        </UserContext.Provider>
    )
}

export default Router;