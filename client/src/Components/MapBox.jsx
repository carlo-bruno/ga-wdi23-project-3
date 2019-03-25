import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";



class MapBox extends Component {
    
    render() {
        const Map = new ReactMapboxGl({
            accessToken: process.env.MAP_BOX_KEY
        });

        return (
            <>
            <h1>MAP</h1>
            <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "100vh",
              width: "100vw"
            }}>
              <Layer
                type="symbol"
                id="marker"
                layout={{ "icon-image": "marker-15" }}>
                <Feature coordinates={[47.59809, -122.33097]}/>
              </Layer>
          </Map>
          </>
        )
    }
}

export default MapBox