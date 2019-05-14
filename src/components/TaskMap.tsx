import * as _ from "lodash"
import * as React from "react"

import Leaflet from 'leaflet'
import { Map, Marker, TileLayer, Popup, Polyline } from "react-leaflet"
import { Waypoint } from "./WaypointTable";


export const turnIcon = new Leaflet.Icon({
    iconUrl: require('../images/marker-icon.png'),
    iconAnchor: [12,40],
    iconSize: [24, 40],
    shadowUrl: require('../images/marker-shadow.png'),
})

// TODO just create a new PNG for this
export const startIcon = Leaflet.divIcon({
    html: '<i class="fa fa-map-marker fa-3x" style="color:orange"></i>',
    iconAnchor: [12,35],
    iconSize: [23, 40],
    className: 'dummy',
    shadowUrl: require('../images/marker-shadow.png'),
})

export const LAYERS = {
    STAMEN_TERRAIN: <TileLayer 
        //url="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png"
        url='https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}'
        subdomains="abcd"
        minZoom={0}
        maxZoom={15}
        ext="png"
        attribution={[
            'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ',
            'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ',
            'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ',
            'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
        ].join("")}/>
}

class MarkedWaypoint extends Waypoint {
    icon: Leaflet.Marker

    constructor(obj) {
        super(obj)
    }
}

export class TaskMap extends React.Component {
    props: {
        className: string,
        waypoints: any[],
        taskpoints: any[],
    }

    constructor(props) {
        super(props)
    }

    render() {
        const { className, taskpoints } = this.props
        const taskLatLon = taskpoints.map(wp => wp.getCoord())
        const taskPoly = Leaflet.polyline(taskLatLon)
        const bounds = taskPoly.getBounds().pad(0.1)

        const taskWithIcons = taskpoints.map((wp) => new MarkedWaypoint({
            ...wp,
            icon: turnIcon,
        }))

        taskWithIcons[0].icon = startIcon

        const waypoints = _.uniqBy(taskWithIcons, 'name')

        return (
            <Map bounds={bounds} className={className}>
                { LAYERS.STAMEN_TERRAIN }
                {
                    waypoints.map((wp) =>
                        <Marker key={wp.name} icon={wp.icon} position={wp.getCoord()}>
                            <Popup>
                                {wp.name}
                            </Popup>
                        </Marker>
                    )
                }
                <Polyline positions={taskLatLon}/>
            </Map>
        )
    }
}

export default TaskMap