import { useState } from 'react'  
import User from './components/User/User'
import Menu from './components/Menu/Menu'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <h1>Hello it's meee</h1>
      {/* <User/> */}
      <Menu/>
    </>
  )
}

export default App
