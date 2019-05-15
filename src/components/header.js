import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
export class HeaderComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      burgered: false,
    }
  }
  toggleMenu() {
    this.setState({
      ...this.state,
      burgered: !this.state.burgered,
    })
  }

  render() {
    const { siteTitle } = this.props
    const { burgered } = this.state
    const menuState = burgered ? " is-active" : ""

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
                {siteTitle}
          </Link>

          <div role="button" onClick={() => this.toggleMenu() }
              className={"navbar-burger burger" + menuState}
              data-target="navbarMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="navbarMenu" className={"navbar-menu" + menuState}>
          <div className="navbar-end">
            <Link className="navbar-item" to="/about">About</Link>
            <Link className="navbar-item" to="/tasks">Tasks</Link>
          </div>
        </div>
        </div>
      </nav>
    )
  }
}

const Header = ({ siteTitle }) => (
  <HeaderComponent siteTitle={siteTitle} />
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
