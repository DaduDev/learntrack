import "./Header.css"

const Navbar: React.FC = () => {
    const handleLogin = () => {
        window.location.href = '/login';
    }
    const handleSignup = () => {
        window.location.href = '/signup';
    }

    return (
      <header>
      <nav className="navbar">
          <div className="navbar-left">
              <h1>Learn Track</h1>
          </div>
          <div className="navbar-right">
              <button className="nav-btn" onClick={handleLogin}>Login</button>
              <button className="nav-btn" onClick={handleSignup}>Signup</button>
          </div>
      </nav>
  </header>
    );
};

export default Navbar;
