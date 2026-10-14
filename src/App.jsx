import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Auth/Login'
import Signup from '../../FRONTEND/src/Pages/Auth/Signup'
import ForGuestOnly from './Guards/ForGuestOnly'
import AdminLayout from './Layout/AdminLayout'
import Dashboard from './Pages/Dashboard/Dashboard'
import Orders from './Pages/Dashboard/Orders'
import OrderDetail from './Pages/Dashboard/OrderDetail'
import UserList from './Pages/Dashboard/UserList'
import ProductsPage from './Pages/Dashboard/ProductsPage'
import ProductPreview from './Pages/Dashboard/ProductPreview'
import ProductEditPage from './Pages/Dashboard/ProductEditPage'

function App() {

  return (
    <div>
      <Routes>
        {/* <Route path="/dashboard" element={<Home />} /> */}
        <Route element={<ForGuestOnly />}>
          {/* for guest users only */}
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="users" element={<UserList />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:gender/:slug" element={<ProductPreview />} />
          <Route path="products/:gender/:slug/edit" element={<ProductEditPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App