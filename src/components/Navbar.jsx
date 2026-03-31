import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";

<DarkMode />

function Navbar() {
  return (
    <nav className="navbar">
      <h2>🍲 Recipe Finder</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/favorites">
          Favorites ❤️
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;