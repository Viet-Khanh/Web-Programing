import Home from "./main-component/home";
import { BrowserRouter as Router, Route, Routes  ,useNavigate } from 'react-router-dom'
import Login from "./main-component/login";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import Bill from "./main-component/bill";


function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bill/:id" element={<Bill />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
