import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';

const App = () => {

 
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </>
  )
}

export default App