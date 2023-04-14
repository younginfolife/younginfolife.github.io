import React from 'react';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {TwitterTimelineEmbed} from "react-twitter-embed";
import {Card, Grid} from "@mui/material";

function Events() {

    return (
        <Box>

            <Navbar/>

            <Box>

                <Grid container spacing={3} style={{paddingLeft: "3%", paddingTop: "3%"}}>
                    <Grid item xs={12} md={7} lg={2} color={"white"}>
                            <p style={{color:"white", fontSize:"30px"}}>6-8/09/2023</p>
                    </Grid>
                    <Grid item xs={12} md={5} lg={5}>
                        <p style={{color:"white", fontSize:"30px"}}>CIBB 2023</p>
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{paddingLeft: "3%"}}>
                    <Grid item xs={12} md={7} lg={2} color={"white"}>
                        <p style={{color:"white"}}></p>
                    </Grid>
                    <Grid item xs={12} md={5} lg={7}>
                        <p style={{color:"white", fontSize:"15px"}}>18th Computational Intelligence Methods
                            for Bioinformatics and Biostatistics Conference</p>
                        <a href={"https://cibb2023.dei.unipd.it/"} style={{color:"white"}}>Web site</a>
                    </Grid>
                </Grid>

                <Grid container spacing={3} style={{paddingLeft: "3%", paddingTop: "3%"}}>
                    <Grid item xs={12} md={7} lg={2} color={"white"}>
                        <p style={{color:"white", fontSize:"30px"}}>23/06/2023</p>
                    </Grid>
                    <Grid item xs={12} md={5} lg={5}>
                        <p style={{color:"white", fontSize:"30px"}}>BITS 2023</p>
                    </Grid>
                </Grid>
                <Grid container spacing={3} style={{paddingLeft: "3%"}}>
                    <Grid item xs={12} md={7} lg={2} color={"white"}>
                        <p style={{color:"white"}}></p>
                    </Grid>
                    <Grid item xs={12} md={5} lg={7}>
                        <p style={{color:"white", fontSize:"15px"}}>19th Annual Meeting of the Bioinformatics Italian Society</p>
                        <a href={"https://bioinformatics.it/bits2023"} style={{color:"white"}}>Web site</a>
                    </Grid>
                </Grid>

            </Box>


            <Footer/>
        </Box>
    );
}

export default Events;