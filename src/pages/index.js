import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import rehypeReact from "rehype-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignal, faMountain } from '@fortawesome/free-solid-svg-icons'

const renderAst = new rehypeReact({
  createElement: React.createElement
}).Compiler

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

    <div className="hero is-link is-medium">
      <div className="hero-body">
        <div className="container">
          <div className="content">
            <h1 className="title">Paragliding Mini-tasks</h1>
            <div className="subtitle">
              Small tasks to help progression
            </div>
            <div>
              <Link className="button" to="/about">Learn More</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <article className="container">
      <div className="content focus">
        <div className="columns is-multiline">
          <Link to="/tasks" className="column has-text-centered is-block has-background-light">
            <p className="title is-4">Levels</p>
            <p className="subtitle is-6">Tasks by level</p>
            <p className=""><FontAwesomeIcon size="4x" icon={faSignal} /></p>
          </Link>
          <Link to="/sites" className="column has-text-centered is-block has-background-light">
            <p className="title is-4">Sites</p>
            <p className="subtitle is-6">Tasks by site</p>
            <p className=""><FontAwesomeIcon size="4x" icon={faMountain} /></p>
          </Link>
        </div>
        {renderAst(data.markdownRemark.htmlAst)}
      </div>
    </article>
  </Layout>
)

export default IndexPage

export const query = graphql`
{
  markdownRemark(fields: { collection: {eq: "index"}}) {
    htmlAst
  }
}
`
