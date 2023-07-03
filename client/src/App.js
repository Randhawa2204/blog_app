//import logo from './logo.svg';
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

//Components
import Login from "./components/account/Login";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import CreatePost from "./components/create/CreatePost";
import DetailView from "./components/details/DetailView";
import UpdatePost from "./components/create/UpdatePost";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
// import Error from "./components/error/Error";
// import About from "./components/about/About";

//React Context
import { DataProvider } from "./context/DataProvider";





const PrivateRoute = ({isAuthenticated}) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{marginTop : "60px"}}>
          <Routes>
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />

            <Route
              path="/"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/" element={<Home />} />
            </Route>

            <Route
              path="/about"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/about" element={<About />} />
            </Route>

            <Route
              path="/contact"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/contact" element={<Contact />} />
            </Route>

            <Route
              path="/create"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/create" element={<CreatePost />} />
            </Route>

            <Route path="/details/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/details/:id" element={<DetailView />} />
            </Route>

            <Route path="/update/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/update/:id" element={<UpdatePost />} />
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
