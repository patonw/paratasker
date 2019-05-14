import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

    <div className="hero is-link">
        <div className="hero-body">
            <h1 className="title">Tasks</h1>
            Description
        </div>
    </div>

    <article>
      <div className="columns tasks">
        {
          data.allMarkdownRemark.edges.map(({node}) => (
            <div key={node.id} className="column is-one-third">
              <div className="card">
                <Link to={node.fields.slug}>
                  <div className="title is-4">
                    {node.frontmatter.title}
                  </div>
                </Link>
                <div className="content">
                  {node.excerpt}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </article>
  </Layout>
)

export default IndexPage

export const query = graphql`
query {
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
        }
        fields {
          slug
        }
        excerpt
      }
    }
  }
}
`