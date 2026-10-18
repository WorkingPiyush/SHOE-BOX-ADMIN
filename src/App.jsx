import './App.css'
import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'


const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'))
const Orders = lazy(() => import('./Pages/Dashboard/Orders'))
const OrderDetail = lazy(() => import('./Pages/Dashboard/OrderDetail'))
const UserList = lazy(() => import('./Pages/Dashboard/UserList'))
const ProductsPage = lazy(() => import('./Pages/Dashboard/ProductsPage'))
const ProductPreview = lazy(() => import('./Pages/Dashboard/ProductPreview'))
const ProductEditPage = lazy(() => import('./Pages/Dashboard/ProductEditPage'))
const AdminProfile = lazy(() => import('./Pages/Dashboard/AdminProfile'))

import Login from './Pages/Auth/Login'
import ForGuestOnly from './Guards/ForGuestOnly'
import AdminLayout from './Layout/AdminLayout'
import FullScreenLoader from '../../FRONTEND/src/components/FullScreenLoader'
import ForRegisteredOnly from './Guards/ForRegisteredOnly'


function App() {
  return (
    <div>
      <Suspense fallback={<FullScreenLoader />}>
        <Routes>
          <Route element={<ForGuestOnly />}>
            <Route path='/login' element={<Login />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route element={<ForRegisteredOnly />}>
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
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App