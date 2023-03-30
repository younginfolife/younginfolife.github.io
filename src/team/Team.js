import React from 'react'
import {Box, Card} from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import './Team.css'
import Container from "@mui/material/Container";
import map from "../images/mappa.png";

const Team = () => {

    return (
        <Box>

            <Navbar/>

            <Box color={"white"}>
                <Container component="main" maxWidth="sm">


                    <h1>TEAM</h1>
                    <img src={map} id={"Map"}/>

                </Container>
            </Box>

            <Footer/>
        </Box>
    )
}
export default Team