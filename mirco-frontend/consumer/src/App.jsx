import React, { lazy , Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
const Provider1 = lazy(() => import("provider1/Provider1"));
const Provider2 = lazy(() => import("provider2/Provider2"));

export default function () {
    return (<>
        <Suspense fallback={<div>Fallback</div>}>
            <Router>
                <nav className='nav'>
                    <ul>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"/provider1"}>Provider1</Link>
                        </li>
                        <li>
                            <Link to={"/provider2"}>Provider2</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<div>Home</div>} />
                    <Route path="/provider1" element={<Provider1/>} />
                    <Route path="/provider2" element={<Provider2/>} />
                    <Route path='*' element={<div>404 - Not Found</div>} />
                </Routes>
            </Router>
        </Suspense>

    </>);
}