import { Link } from "gatsby"
import React from "react"

const Footer = () => (
    <footer className="footer">
    <div className="container">
    <div className="columns content container">
      <div className="column is-3">
        <div>
          <h2 className="fh2">Site Map</h2>
          <div><Link to="/">Home</Link></div>
          <div><Link to="/tasks">Tasks</Link></div>
        </div>
      </div>
    </div>
    </div>
  </footer>
)

export default Footer
