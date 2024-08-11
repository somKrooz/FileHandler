import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Project from './components/Projects'
import Navbar from './components/navbar'
import Manage from './components/manage'

import { HashRouter , Route , Routes } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <HashRouter>
      <div>
        <Navbar></Navbar>
        <Routes>
          <Route path="/"  element={ <App></App> }  />
          <Route path="/create"  element={ <Project></Project> } />
          <Route path="/manage"  element={ <Manage></Manage> } />
        </Routes>
      </div>
  </HashRouter>
  </React.StrictMode>
)
