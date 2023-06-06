import {React, Fragment} from 'react'
// import {Box} from "@mui/material";
import {Box, Card, Grid} from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import './Team.css'
import Container from "@mui/material/Container";
// import map from "../images/mappa.png";
import {MapContainer, useMap } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet.markercluster'

import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";

// import * as React from 'react';
// import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
// import ListItemButton  from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';



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
        const full_name = record.nome + " " + record.cognome;
        return ReactDOMServer.renderToString(<MemberItem name={full_name} content={record.email} />);
    }


    const LoadDataPoints = () => {
        return member_list;
    }

    return (
        <MapContainer style={{height:867, width:777}}>
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

                    <Grid item xs={12} md={7} lg={4} width={"100%"}>
                        <Card sx={{
                            padding: '5%',
                            border: '3px solid',
                            borderColor: '#EEEEEE',
                            borderRadius: '5%',
                        }}>
                            <h2>Direttivo</h2>
                            <MemberItem name="Giacomo Baruzzo" content="giacomo.baruzzo@unipd.it"/>
                            <MemberItem name="Vincenzo Bonnici" content="vincenzo.bonnici@unipr.it"/>
                            <MemberItem name="Simone Pernice" content="simone.pernice@unito.it"/>
                            
                        </Card>
                        <Card sx={{
                            marginTop: "5%",
                            padding: '5%',
                            border: '3px solid',
                            borderColor: '#EEEEEE',
                            borderRadius: '5%'
                        }}>
                            <h2>Social media managers</h2>
                            <MemberItem name="Alessio Funari" content="Facebook"/>
                            <MemberItem name="Pasquale Sibilio" content="LinkedIn"/>
                            <MemberItem name="Eva Viesi" content="Telegram"/>
                            <MemberItem name="Mikele Milia" content="Twitter"/>
                            <MemberItem name="Salvatore Calderaro" content="Youtube"/>
                        </Card>
                   
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </Box>
    );
}


function MemberItem({ name, content }) {
    return (
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={name} src="ipotetico_avatar.jpg"/>
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
              {content}
              
            </Fragment>
          }
        />
      </ListItem>
    );
}

export default Team;