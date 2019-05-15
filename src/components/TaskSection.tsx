import * as React from "react"
import * as _ from 'lodash'
import { Link } from "gatsby"

export class TaskSection extends React.Component {
  props: {
	group: string,
    tasks: any[],
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { tasks } = this.props
    return (
      <div className="container">
        <div className="title tl-head">{this.props.group}</div>
        <div className="columns tasks is-multiline">
          { tasks.map( node =>
              <Link key={node.id} className="column is-3" to={node.fields.slug}>
                <div className="card">
                  <header className="card-header is-block has-background-light">
                      <div className="title is-5">
                        {node.frontmatter.title}
                      </div>
                      <div className="subtitle media">
                        <div className="media-content">
                          {node.frontmatter.site}
                        </div>
                        <span className="tag media-right is-info">{node.frontmatter.level}</span>
                      </div>
                  </header>
                  <div className="content">
                    {node.excerpt}
                  </div>
                </div>
              </Link>
            )}
          </div>
      </div>
    )
  }
}
