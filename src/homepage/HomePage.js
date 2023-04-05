import React from 'react';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./HomePage.css"
import slide from '../images/MainLogoHome.png'
import {TwitterTimelineEmbed, TwitterTweetEmbed} from "react-twitter-embed";
import {Card, Grid} from "@mui/material";

function HomePage() {
    return (
        <Box>

            <Navbar/>

        <body>
        {/*<Grid container spacing={2}>*/}
        {/*    <Grid item xs={8}>*/}
        {/*        <Item>xs=8</Item>*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={4}>*/}
        {/*        <Item>xs=4</Item>*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={4}>*/}
        {/*        <Item>xs=4</Item>*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={8}>*/}
        {/*        <Item>xs=8</Item>*/}
        {/*    </Grid>*/}
        {/*</Grid>*/}
        <Container component="main" maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} md={7} lg={7} color={"white"}>
                    <Box>

                        <h1>Chi Siamo?</h1>
                        <p>
                            Il laboratorio nazionale InfoLife del CINI (Consorzio Interuniversitario Nazionale di Informatica) promuove iniziative di networking tra ricercatori di formazione informatica che conducono ricerche rilevanti in bioinformatica e tematiche correlate, insieme ai loro partner internazionali
                        </p>
                        <p>
                            Il laboratorio nazionale InfoLife del CINI (Consorzio Interuniversitario Nazionale di Informatica) promuove iniziative di networking tra ricercatori di formazione informatica che conducono ricerche rilevanti in bioinformatica e tematiche correlate, insieme ai loro partner internazionali
                        </p>
                        <p>
                            Il laboratorio nazionale InfoLife del CINI (Consorzio Interuniversitario Nazionale di Informatica) promuove iniziative di networking tra ricercatori di formazione informatica che conducono ricerche rilevanti in bioinformatica e tematiche correlate, insieme ai loro partner internazionali
                        </p>
                        <p>
                            Il laboratorio nazionale InfoLife del CINI (Consorzio Interuniversitario Nazionale di Informatica) promuove iniziative di networking tra ricercatori di formazione informatica che conducono ricerche rilevanti in bioinformatica e tematiche correlate, insieme ai loro partner internazionali
                        </p>
                    </Box>
                </Grid>
                <Grid item xs={12} md={5} lg={4}>
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="QbioGroup"
                        options={{height: 600}}
                    />
                </Grid>
            </Grid>
        </Container>
        </body>
            <Footer/>
        </Box>
    );
}

export default HomePage;