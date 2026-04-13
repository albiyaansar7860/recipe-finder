import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import RecipeDetails from "./pages/RecipeDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Pages
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AddRecipe from "./pages/AddRecipe";
import ManageRecipes from "./pages/ManageRecipes";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <BrowserRouter>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'glass',
          duration: 3000,
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            border: '1px solid var(--border)',
            fontWeight: '600',
            borderRadius: '16px',
          },
        }}
      />
      
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="main-content">
        <Routes>
          {/* Main Application Routes */}
          <Route path="/" element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Protected Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="add-recipe" element={<AddRecipe />} />
            <Route path="manage" element={<ManageRecipes />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;