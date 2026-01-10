import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import AssistantSetup from './pages/AssistantSetup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Header from './component/Header.jsx'
import Footer from './component/Footer.jsx'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={
        <Layout>
          <SignUp />
        </Layout>
      } />
      <Route path="/signin" element={
        <Layout>
          <SignIn />
        </Layout>
      } />
      <Route path="/dashboard" element={
        <Layout>
          <Dashboard />
        </Layout>
      } />
      <Route path="/profile" element={
        <Layout>
          <Profile />
        </Layout>
      } />
      <Route path="/assistant-setup" element={
        <Layout>
          <AssistantSetup />
        </Layout>
      } />
      <Route path="/" element={
        <Layout>
          <Home />
        </Layout>
      } />
    </Routes>
  )
}

export default App
