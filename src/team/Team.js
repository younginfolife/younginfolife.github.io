import {React, useState, useRef, useEffect} from 'react'
// import {Box} from "@mui/material";
import {Box, Card, Grid} from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import './Team.css'
import Container from "@mui/material/Container";
// import map from "../images/mappa.png";
import {MapContainer, useMap, GeoJSON, TileLayer} from 'react-leaflet'
import L, { marker, LatLngExpression } from 'leaflet';
import 'leaflet.markercluster'


import {member_list} from "./members"



const MapComponent = () => {

    const InitMap = () => {
        const italyBounds = L.latLngBounds(
            L.latLng(35.29, 6.62), // Southwest coordinates of Italy
            L.latLng(47.09, 18.78) // Northeast coordinates of Italy
        );
        const map = useMap(); 

        map.setZoom(6);
        map.panTo([41.9, 12.5]); 
        map.setMaxBounds(italyBounds);
        map.bounds=italyBounds;
        map.scrollWheelZoom=true;

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);     

        PutPeopleOnMap( map ); 
    }


    const PutPeopleOnMap = ( map ) => {
        var markers = new L.markerClusterGroup({
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true, 
            // maxClusterRadius: 80
            singleMarkerMode: true
        });

        
        LoadDataPoints().forEach(( record ) => {
            markers.addLayer(
                new L.CircleMarker(
                    L.latLng(record.latitude, record.longitude), {
                        title: record.citta, 
                        radius: 5, 
                        weight: 1, 
                        fillOpacity: 0.5, 
                        fillColor: "green"
                    }
                ).bindPopup( GetPopup( record ) )
            );
        });

        map.addLayer( markers );
    }

    


    const GetPopup = ( record ) => {
        return  "<h3>"+record.nome + " " + record.cognome+"</h3>";
    }


    const LoadDataPoints = () => {
        return member_list;
    }

    return (
        <MapContainer style={{height:777, width:777}}>
            <InitMap/>
        </MapContainer>
    );
}


const Team = () => {
    return (
        <Box>
            <Navbar/>
            <Container component="main" maxWidth="lg">
                <Grid container spacing={3} sx={{paddingTop:"2%"}}>
                    <Grid>
                        <MapComponent/>
                    </Grid>
                    <Grid item xs={12} md={7} lg={4} color={"red"} width={"100%"}>
                        <Card sx={{
                            padding: '5%',
                            border: '3px solid',
                            borderColor: '#EEEEEE',
                            borderRadius: '5%', 
                            // backgroundColor: "red"
                        }}>
                            <h2>Direttivo</h2>
                            <ul>
                                <li>Giacomo Baruzzo: giacomo.baruzzo@unipd.it</li>
                                <li>Vincenzo Bonnici: vincenzo.bonnici@unipr.it </li>
                                <li>Simone Pernice: simone.pernice@unito.it</li>
                            </ul>
                        </Card>
                        <Card sx={{
                            marginTop: "5%",
                            padding: '10%',
                            border: '3px solid',
                            borderColor: '#EEEEEE',
                            borderRadius: '5%'
                        }}>
                            <h2>Social media managers</h2>
                            <ul>
                                <li>Mikele Milia: Facebook</li>
                                <li>Alessio Funari: LinkedIn</li>
                                <li>Eva Viesi: Telegram</li>
                                <li>Pasquale Sibilio: Twitter</li>
                                <li>Salvatore Calderaro: Youtube</li> 
                            </ul>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </Box>
    );
}


export default Team