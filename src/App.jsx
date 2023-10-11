import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/account/Login'
import Home from './components/home/Home'
import DataProvider from './context/DataProvider'

function App() {

  return (
    <DataProvider>


      <BrowserRouter>
        <div style={{ marginTop: '64px' }}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
