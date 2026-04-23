import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

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
import UserRoles from "./pages/UserRoles";
import Settings from "./pages/Settings";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'premium-toast',
            duration: 4000,
            style: {
              background: '#ffffff',
              color: '#1e293b',
              border: '1px solid #f1f5f9',
              fontWeight: '600',
              borderRadius: '24px',
              padding: '16px 24px',
            },
          }}
        />
        
        <div className="flex flex-col min-h-screen">
          <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
          <main className="flex-1">
            <Routes>
              {/* Main Application Routes */}
              <Route path="/" element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Protected Routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="add-recipe" element={<AddRecipe />} />
                <Route path="manage" element={<ManageRecipes />} />
                <Route path="users" element={<UserRoles />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;