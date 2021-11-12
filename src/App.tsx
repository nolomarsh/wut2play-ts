import React from 'react'
import logo from './logo.svg'
import './styles/App.css'

import { Outlet } from 'react-router'
import TopNav from './components/TopNav'

const App = () => {
  return (
    <>
      <TopNav/>
      <main>
        <Outlet/>
      </main>
    </>
    
  )
}

export default App;
