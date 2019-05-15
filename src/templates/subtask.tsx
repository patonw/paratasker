import * as _ from "lodash"
import * as React from "react"

import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import rehypeReact from "rehype-react"

import Layout from "../components/layout"
import { Waypoint, WaypointTable } from "../components/WaypointTable"
import { TaskMap } from "../components/TaskMap"

import styles from "./subtask.module.scss"

const renderAst = new rehypeReact({
    createElement: React.createElement
}).Compiler

class Subtask extends React.Component {
    state: {}

    props: {
        data: any,
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { data } = this.props
        const post = data.markdownRemark
        const front = post.frontmatter

        const waypoints: Waypoint[] = front.waypoints.map(it => new Waypoint(it)) || []
        const taskpoints: Waypoint[] = front.task.map( it => new Waypoint(it) ) || []

        return (
            <Layout>
                <Helmet> { /* Ideally would like to import from node_modules */}
                    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.css" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                </Helmet>

                <div className="hero is-link">
                    <div className="hero-body">
                    <div className="container">
                        <h1 className="title">{post.frontmatter.title}</h1>
                        {post.frontmatter.description}
                    </div>
                    </div>
                </div>

                <article className="content container">
                    <div className="tile is-ancestor">
                        <div className="tile">
                            <div className="tile is-parent is-8">
                                <div className="tile is-child">
                                    <TaskMap
                                        className={styles.mymap}
                                        waypoints={waypoints}
                                        taskpoints={taskpoints}/>
                                </div>
                            </div>
                            <div className="tile is-parent is-vertical">
                                <div className="tile is-child">
                                <h4>Waypoints</h4>
                                    <WaypointTable waypoints={waypoints} />
                                </div>
                                <div className="tile is-child">
                                    <h4>Task</h4>
                                    <ol>
                                        {taskpoints.map((wp,i) => <li key={i}>{wp.name}</li>)}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    {renderAst(post.htmlAst)}
                </article>
            </Layout>
        )
    }
}

export default Subtask

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: {slug: {eq: $slug}}) {
            htmlAst
            frontmatter {
                title
                waypoints {
                    abbr
                    coord
                    lat
                    lon
                }
                task {
                    abbr
                    coord
                    lat
                    lon
                }
            }
        }
    }
`
