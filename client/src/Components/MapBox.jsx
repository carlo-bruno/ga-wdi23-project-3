import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import Mark from '../images/map-marker-alt-solid.svg';




class MapBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: 47.59809,
            lon: -122.33097
        }
    }
    render() {
        console.log("KEY LEY KEY", process.env.REACT_APP_MAPBOX_API_KEY)
        console.log("LAT ______------->", this.state.lat)
        console.log("LONG ______------->", this.state.lon)
        const Map = new ReactMapboxGl({
            accessToken: process.env.REACT_APP_MAPBOX_API_KEY,
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
            
              {/* <Layer
                type="symbol"
                id="marker"
                layout={{ "icon-image": "marker-15" }}> */}
                <Marker
                    coordinates={[this.state.lon, this.state.lat]}
                    anchor="bottom">
                    
                    <img src={'https://lh3.googleusercontent.com/ADnoUS0UpYtulnGx641eCu5bwjBapBgqwQniw93dSwROaEYGbvmChmpeWcoaA11i4t4c'} width="50px" height="50px"/>
                </Marker>
                {/* <Feature coordinates={[this.state.lon, this.state.lat]}/> */}
              {/* </Layer> */}
           </Map>
          </>
        )
    }
}

export default MapBox;