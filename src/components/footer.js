import { Link } from "gatsby"
import React from "react"

const Footer = () => (
    <footer className="footer">
    <div className="columns">
      <div className="column is-3">
        <Link to="/">Home</Link>
        <div>
          <div>Site Map:</div>
          <div>TODO</div>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer