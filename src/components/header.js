import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item" to="/">
            {siteTitle}
      </Link>

      <div role="button" className="navbar-burger burger" data-target="navbarMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div id="navbarMenu" className="navbar-menu">
      <div className="navbar-end">
        <Link className="navbar-item" to="/">Tasks</Link>
      </div>
    </div>
  </nav>

)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
