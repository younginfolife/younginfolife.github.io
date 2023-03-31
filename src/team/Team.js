import React from 'react'
import {Box, Card, Icon} from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import './Team.css'
import Container from "@mui/material/Container";
import map from "../images/mappa.png";
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'

const Map = () => {

    return (
        <MapContainer center={[45.116177, 7.742615]} style={{height:500}} zoom={5} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}


const Team = () => {

    return (

        <Box>

            <Navbar/>

            <Box color={"white"}>
                <Container component="main" maxWidth="lg">


                    <h1>TEAM</h1>
                    {/*<img src={map} id={"Map"}/>*/}
                <Map></Map>
                </Container>
            </Box>

            <Footer/>a
        </Box>
    )
}
export default Team