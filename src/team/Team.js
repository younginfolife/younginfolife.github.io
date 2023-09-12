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


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




import {member_list} from "./members"


// function TableOfMembers() {
//     const DisplayData=member_list.map( (record) => {
//             return(
//                 <tr>
//                     <td>{record.nome} {record.cognome}</td>
//                     <td>{record.citta}</td>
//                     <td>{record.ruolo}</td>
//                 </tr>
//             )
//         }
//     )
 
//     return(
//         <div>
//             <table class="table table-striped">
//                 <thead>
//                     <tr>
//                     <th>Nome completo</th>
//                     <th>Città</th>
//                     <th>Ruolo</th>
                //     </tr>
                // </thead>
                // <tbody>
                 
                    
//                     {DisplayData}
                    
//                 </tbody>
//             </table>
             
//         </div>
//     )
// }

// function createData(
//     name: string,
//     calories: number,
//     fat: number,
//     carbs: number,
//     protein: number,
//   ) {
//     return { name, calories, fat, carbs, protein };
//   }
  
//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//   ];


// function TableOfMembers() {
//     return (
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 333 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Nome</TableCell>
//               <TableCell align="right">Ruolo</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <TableRow
//                 key={row.name}
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row">
//                   {row.name}
//                 </TableCell>
//                 <TableCell align="right">{row.calories}</TableCell>
//                 <TableCell align="right">{row.fat}</TableCell>
//                 {/* <TableCell align="right">{row.carbs}</TableCell>
//                 <TableCell align="right">{row.protein}</TableCell> */}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }





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
                            <MemberItemWithAvatar name="Giacomo Baruzzo" content="giacomo.baruzzo@unipd.it"/>
                            <MemberItemWithAvatar name="Vincenzo Bonnici" content="vincenzo.bonnici@unipr.it"/>
                            <MemberItemWithAvatar name="Simone Pernice" content="simone.pernice@unito.it"/>
                            
                        </Card>
                        <Card sx={{
                            marginTop: "5%",
                            padding: '5%',
                            border: '3px solid',
                            borderColor: '#EEEEEE',
                            borderRadius: '5%'
                        }}>
                            <h2>Social media managers</h2>
                            <MemberItemWithAvatar name="Alessio Funari" content="Facebook"/>
                            <MemberItemWithAvatar name="Pasquale Sibilio" content="LinkedIn"/>
                            <MemberItemWithAvatar name="Eva Viesi" content="Telegram"/>
                            <MemberItemWithAvatar name="Mikele Milia" content="Twitter"/>
                            <MemberItemWithAvatar name="Salvatore Calderaro" content="Youtube"/>
                        </Card>
                   
                    </Grid>
                </Grid>
            </Container>
            {/* <TableOfMembers/>  */}
            <Footer/>
        </Box>
    );
}


function MemberItemWithAvatar({ name, content, avatar="ipotetico_avatar.jpg" }) {
  // TODO: use custom avatars
  return (
    <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar alt={name} src={avatar} />
    </ListItemAvatar>
    <MemberItem name={name} content={content}></MemberItem>
  </ListItem>
);
}

function MemberItem({ name, content }) {
    return (
        <ListItemText
          primary={name}
          secondary={
            <Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              />
              {content}
              
            </Fragment>
          }
        />
    );
}

export default Team;