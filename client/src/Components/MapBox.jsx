import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";



class MapBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: 47.59809,
            lon: -122.33097
        }
    }
    render() {
        console.log("LAT ______------->", this.state.lat)
        console.log("LONG ______------->", this.state.lon)
        const Map = new ReactMapboxGl({
            // accessToken: process.env.REACT_APP_MAPBOX_API_KEY,
            accessToken: 'pk.eyJ1IjoiZ2FycmV0dG1vb3JlIiwiYSI6ImNqdG9rbThqNDAwNDI0OXFzaTBrejhwc24ifQ.-5ioP17Oh9hNK3QfqNU4kw',
            center: [ this.state.lon, this.state.lat],
        });
        return (
            <>
            <h1>MAP</h1>
            <Map
            style='mapbox://styles/garrettmoore/cjtou2gc86i4l1fnhxx633gtf'
            zoom={[10]}
            center={[this.state.lon, this.state.lat]}
            containerStyle={{
                height: "40em"
              }}>

            <Map style="mapbox://styles/mapbox/streets-v8"/>
            
              <Layer
                type="symbol"
                id="marker"
                layout={{ "icon-image": "marker-15" }}>
                <Feature coordinates={[this.state.lon, this.state.lat]}/>
              </Layer>
           </Map>
          </>
        )
    }
}

export default MapBox;