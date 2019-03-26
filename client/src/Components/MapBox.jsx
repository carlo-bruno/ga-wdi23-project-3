import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";


class MapBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: this.props.lat,
            lon: this.props.long
        }
    }
    render() {
        console.log(this.props);
        console.log("LAAATTTTT ---->", this.state.lat)
        console.log("LOOONNNN ---->", this.state.lon)
        const Map = new ReactMapboxGl({
            accessToken: process.env.REACT_APP_MAPBOX_API_KEY,
            center: [ this.state.lon, this.state.lat],
        });
        return (
            <>
            <h1>MAP</h1>
            <Map
              height='200px'
              style='mapbox://styles/garrettmoore/cjtou2gc86i4l1fnhxx633gtf'
              zoom={[13.5]}
              center={[this.state.lon, this.state.lat]}
              containerStyle={{height: "40em"}}>
              <Marker
                  coordinates={[this.state.lon, this.state.lat]}
                  anchor="bottom">
                  <img src={'https://www.shareicon.net/download/2015/12/05/682942_map.svg'} width="42px" height="42px"/>
              </Marker>
           </Map>
          </>
        )
    }
}

export default MapBox;