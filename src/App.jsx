import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Auth/Login'
import ForGuestOnly from './Guards/ForGuestOnly'
import AdminLayout from './Layout/AdminLayout'
import Dashboard from './Pages/Dashboard/Dashboard'
import Orders from './Pages/Dashboard/Orders'
import OrderDetail from './Pages/Dashboard/OrderDetail'
import UserList from './Pages/Dashboard/UserList'
import ProductsPage from './Pages/Dashboard/ProductsPage'
import ProductPreview from './Pages/Dashboard/ProductPreview'
import ProductEditPage from './Pages/Dashboard/ProductEditPage'
import AdminProfile from './Pages/Dashboard/AdminProfile'

function App() {

  return (
    <div>
      <Routes>
        <Route element={<ForGuestOnly />}>
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
          <Route path="profile" element={<AdminProfile />} />
          <Route path="*" element={<Login />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App