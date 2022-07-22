import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <>

      <Router>
        <nav className='nav'>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/a"}>A</Link>
            </li>
            <li>
              <Link to={"/b"}>B</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<div>"/" route</div>} />
          <Route path="/a" element={<div>"a" route</div>} />
          <Route path="/b" element={<div>"b" route</div>} />
          <Route path='*' element={<div>404 - Not Found</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
