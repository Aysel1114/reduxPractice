import React from 'react'
import Nav from './components/Nav/Nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Hour from './pages/Hour/Hour'
import Stopwatch from './pages/Stopwatch/Stopwatch'
import Taymer from './pages/Taymer/Taymer'
import { Provider } from 'react-redux'
import { store } from './app/store'

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div>
            <Nav/>
            <Routes>
                <Route path="/" element={<Hour />} />
                <Route path = "/stopwatch" element = {<Stopwatch/>} />
                <Route path = "/taymer" element = {<Taymer/>} />
            </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  )
}
