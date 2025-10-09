import { useState } from 'react'  
import User from './components/User/User'
import Menu from './components/Menu/Menu'
import Login from './components/Login/Login'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      {/* <User/> */}
      <Menu/><br/>
      <Login/>
    </>
  )
}

export default App
