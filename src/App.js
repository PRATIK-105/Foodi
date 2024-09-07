import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useContext } from "react";
import { AuthContext } from "./context/Authprovider";
import Spinner from "./components/Spinner";

function App() {
  const { loading } = useContext(AuthContext);
  return (
    <>
      {loading ? (
        <div className=''>
          <Spinner />
        </div>
      ) : (
        <>
          <Navbar /> 
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
