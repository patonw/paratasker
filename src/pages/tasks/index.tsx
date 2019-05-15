import * as React from "react"
import * as _ from 'lodash'
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import { TaskSection } from "../../components/TaskSection"

export class TaskList extends React.Component {
  props: {
    data: any
  }
  constructor(props) {
    super(props)
  }

  render() {
    const { data } = this.props

    const sections = data.allMarkdownRemark.group

    return (
      <Layout>
        <div className="hero is-link">
          <div className="hero-body">
            <div className="container">
              <div className="content">
                <h1 className="title">Tasks</h1>
                Description
              </div>
            </div>
          </div>
        </div>
        <article className="tasklist content">
          {
            sections.map((section, i) =>
              <section key={section.fieldValue}>
                {i > 0 && <hr />}
                <TaskSection
                  group={"Level " + section.fieldValue}
                  tasks={section.edges.map(({ node }) => node)} />
              </section>
            )
          }
        </article>
      </Layout>
    )
  }
}


export default TaskList

export const query = graphql`
query {
  allMarkdownRemark(sort: {fields: frontmatter___level}) {
    group(field: frontmatter___level) {
      fieldValue
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            site
            level
          }
          fields {
            slug
          }
          excerpt(pruneLength: 80)
        }
      }
    }
  }
}
`
