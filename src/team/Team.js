import {React, useState, useRef} from 'react'
import {Box} from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import './Team.css'
import Container from "@mui/material/Container";
// import map from "../images/mappa.png";
import {MapContainer, useMap} from 'react-leaflet'
import L from 'leaflet';
import 'leaflet.markercluster'

import {member_list} from "./members"



const MapComponent = () => {
    

    const LoadPoints = ( map ) => {
        var markers = new L.markerClusterGroup({
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true
        });


        LoadDataPoints().forEach(( coord ) => {
            markers.addLayer( 
                new L.CircleMarker( coord.slice(2, 4), {
                    title: coord.at(1),
                    radius: 5,
                    // color: '#FFFFFF',
                    weight: 1, //coord.at(2),
                    fillOpacity: 0.5,
                    fillColor: 'green'
                } ).bindPopup( coord.at(0)  )
            );
        });

        map.addLayer( markers );
    }


    const LoadDataPoints = () => {
        //TODO: load data from excel file 
        const city_coordinates = member_list;
 
        return city_coordinates;
    }


    const InitMap = () => {
        const map = useMap(); 

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);     

        LoadPoints( map ); 
    }


    const defaultPosition = [ 41.902782, 12.496366]; //Rome coordinates
    return (
        <MapContainer center={defaultPosition} style={{height:666}} zoom={6} scrollWheelZoom={true}>
            <InitMap/>
        </MapContainer>
    );
}





const Team = () => {

    return (

        <Box>

            <Navbar/>

            <Box color={"white"}>
                <Container component="main" maxWidth="lg">
                    <h1>TEAM</h1>
                    {/* <img src={map} id={"Map"}/> */}
                <MapComponent/>
                <h2>Direttivo esecutivo supremo</h2>
                <ul>
                    <li>Giacomo Baruzzo: </li>
                    <li>Vincenzo Bonnici </li>
                    <li>Simone Pernice</li>
                </ul>
                
                </Container>
            </Box>

            <Footer/>a
        </Box>
    )
}
export default Team