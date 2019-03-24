import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";



class MapBox extends Component {
    componentDidMount() {
        const Map = new ReactMapboxGl({
            accessToken: process.env.MAP_BOX_KEY
        });
    }
    render() {
        return (
            <h1>MAP</h1>
        )
    }
}

export default MapBox