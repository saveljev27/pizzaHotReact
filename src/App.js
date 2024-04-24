import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './scss/app.scss'

import Header from './components/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import SearchContext from './context/SearchContext'

function App() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Router>
      <div className="App">
        <div className="wrapper">
          <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <Header />
            <div className="content">
              <div className="container"></div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </SearchContext.Provider>
        </div>
      </div>
    </Router>
  )
}

export default App
