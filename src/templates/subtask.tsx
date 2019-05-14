import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Leaflet from 'leaflet'
import { Helmet } from "react-helmet"
import rehypeReact from "rehype-react"
import { Map, Marker, TileLayer, Popup, Polyline } from "react-leaflet"
import _ from "lodash"
import styles from "./subtask.module.scss"

const renderAst = new rehypeReact({
    createElement: React.createElement
}).Compiler

const turnIcon = new Leaflet.Icon({
    iconUrl: require('../images/marker-icon.png'),
    iconAnchor: [12,40],
    iconSize: [24, 40],
    shadowUrl: require('../images/marker-shadow.png'),
})

// TODO just create a new PNG for this
const startIcon = Leaflet.divIcon({
    html: '<i class="fa fa-map-marker fa-3x" style="color:orange"></i>',
    iconAnchor: [12,35],
    iconSize: [23, 40],
    className: 'dummy',
    shadowUrl: require('../images/marker-shadow.png'),
})

class Waypoint {
    name: string;
    lat: number;
    lon: number;
}

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
        //const waypoints: Waypoint[] = post.frontmatter.waypoints || []
        const taskpoints: Waypoint[] = post.frontmatter.task || []
        const taskList = taskpoints.map(wp => [wp.lat, wp.lon])
        const taskPoly = Leaflet.polyline(taskList)
        const bounds = taskPoly.getBounds().pad(0.1)

        const taskWithIcons = taskpoints.map((wp) => ({
            ...wp,
            icon: turnIcon,
        }))

        taskWithIcons[0].icon = startIcon

        const waypoints = _.uniqBy(taskWithIcons, 'name')

        return (
            <Layout>
                <Helmet> { /* Ideally would like to import from node_modules */ }
                    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.css"/>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                </Helmet>

                <div className="hero is-info">
                    <div className="hero-body">
                        <h1 className="title">{post.frontmatter.title}</h1>
                        {post.frontmatter.description}
                    </div>
                </div>

                <Map bounds={bounds} className={styles.mymap}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        waypoints.map((wp) =>
                            <Marker key={wp.name} icon={wp.icon} position={[wp.lat, wp.lon]}>
                                <Popup>
                                    {wp.name}
                                </Popup>
                            </Marker>
                        )
                    }
                    <Polyline positions={taskList}/>
                </Map>

                <article>
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
                description
                waypoints {
                    name
                    lat
                    lon
                }
                task {
                    name
                    lat
                    lon
                }
            }
        }
    }
`