import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import rehypeReact from "rehype-react"

const renderAst = new rehypeReact({
  createElement: React.createElement
}).Compiler

export class AboutPage extends React.Component {
  props: {
    data: any
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { data } = this.props
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

        <div className="hero is-link">
          <div className="hero-body">
            <div className="container">
              <div className="content">
                <h1 className="title">About</h1>
                <div className="subtitle">
                  Small tasks to help progression
                </div>
              </div>
            </div>
          </div>
        </div>

        <article className="container">
          <div className="content">
            {renderAst(data.markdownRemark.htmlAst)}
          </div>
        </article>
      </Layout>
    )
  }
}

export default AboutPage

export const query = graphql`
{
  markdownRemark(fields: { collection: {eq: "content"}}) {
    htmlAst
  }
}
`
