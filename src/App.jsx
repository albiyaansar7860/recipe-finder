import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import RecipeDetails from "./pages/RecipeDetails";

import {
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

        <Route
          path="/recipe/:id"
          element={<RecipeDetails />}
        />

      </Routes>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

    </BrowserRouter>

  );
}

export default App;