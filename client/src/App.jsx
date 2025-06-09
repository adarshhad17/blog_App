import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import MyPosts from './pages/MyPosts'
import PostDetail from './pages/PostDetail'
import NoPage from './pages/NoPage'

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/createpost' element={<CreatePost />} />
        <Route path='/edit/:id' element={<EditPost />} />
        <Route path='/myposts' element={<MyPosts />} />
        <Route path='/posts/:id' element={<PostDetail />} />
        <Route path='*' element={<NoPage />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
