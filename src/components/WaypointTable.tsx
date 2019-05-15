import * as React from "react"
import { graphql } from "gatsby"

export class Waypoint {
    name: string;
    abbr: string;
    lat: number;
    lon: number;
    coord: number[];

    constructor(obj) {
        obj && Object.assign(this, obj)
        this.name = this.name || this.abbr
        this.abbr = this.abbr || this.name
    }

    getAbbr() {
        return this.abbr || this.name
    }

    getLat() {
        return this.lat || this.coord[0]
    }

    getLon() {
        return this.lon || this.coord[1]
    }

    getCoord() {
        return this.coord || [this.lat, this.lon]
    }
}

export class WaypointTable extends React.Component {
    props: {
        waypoints: Waypoint[]
    }

    state: {
        hoverRow: string
    }
    constructor(props) {
        super(props)
        this.state = {
            hoverRow: ""
        }
    }

    doClick(name) {
        this.setState({
            ...this.state,
            hoverRow: name,
        })

    }

    render() {
        const {waypoints} = this.props
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th><abbr title="Latitude">Lat</abbr></th>
                        <th><abbr title="Longitude">Lon</abbr></th>
                    </tr>
                </thead>
                <tbody>
                    {waypoints.map((wp) => (
                        <tr onClick={() => this.doClick(wp.getAbbr())} key={wp.getAbbr()} className={this.state.hoverRow == wp.name ? "is-selected" : ""}>
                            <td><abbr title={wp.name}>{wp.getAbbr()}</abbr></td>
                            <td>{wp.getLat()}</td>
                            <td>{wp.getLon()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}

export default WaypointTable