import klLogo from '../assets/kl-logo.png'
import './Header.css'

function Header() {
  return (
    <header id="site-header">
      <div className="header-container">
        <div className="header-logo">
          <img src={klLogo} alt="KL CSE-4 Department Handbook Logo" />
          <div className="logo-text">
            <span className="logo-title">KL CSE-4</span>
            <span className="logo-subtitle">Department Handbook</span>
          </div>
        </div>
        <div className="header-center">
          <h1>Koneru Lakshmaiah Education Foundation</h1>
          <p className="header-tagline">Department Handbook</p>
          <p className="header-dept">Department of CSE-4</p>
        </div>
      </div>
    </header>
  )
}

export default Header
