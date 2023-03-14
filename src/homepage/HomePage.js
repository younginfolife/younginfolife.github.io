import React from 'react';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import slide from '../images/MainLogoHome.png'
import {TwitterTweetEmbed} from "react-twitter-embed";

function HomePage() {
    return (
        <Box>

            <Navbar/>

            <Box>

                <Box maxWidth={"xs"}>
                    <img  style={{ width: "100%", height: 150 }} src={slide}/>
                </Box>

                <Container component="main" maxWidth="sm">
                    <h1>Chi Siamo?</h1>
                    <p>
                        Il laboratorio nazionale InfoLife del CINI (Consorzio Interuniversitario Nazionale di Informatica) promuove iniziative di networking tra ricercatori di formazione informatica che conducono ricerche rilevanti in bioinformatica e tematiche correlate, insieme ai loro partner internazionali
                    </p>

                    {/*<TwitterTweetEmbed*/}
                    {/*    onLoad={function noRefCheck(){}}*/}
                    {/*    tweetId="933354946111705097"*/}
                    {/*/>*/}
                </Container>
            </Box>

            <Footer/>
        </Box>
    );
}

export default HomePage;