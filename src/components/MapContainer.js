import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
let mapStyles = {}

if (window.screen.width > 800) {
mapStyles = {
  position: 'relative',
  width: '250px',
  height: '350px',
  borderRadius: '10px'
}
}else {
  mapStyles = {
  position: 'relative',
  width: '250px',
  height: '250px',
  borderRadius: '10px',
  zIndex: '10'
}
}
const MapContainer = props => {
  console.log(window.screen.width)
  console.log({ lat: 40.1181327, lng: -111.6398019 })

  return (
    <>
      {props.showMap && (
        <Map
          google={props.google}
          zoom={10}
          style={mapStyles}
          initialCenter={props.pos}>
          <Marker
          // position={props.pos}
          />
        </Map>
      )}
    </>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBzGH1h2ELCuxYGyESEc5Lepr0SFKLwQ6g'
})(MapContainer)
