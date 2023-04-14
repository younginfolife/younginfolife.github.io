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
                        Il gruppo CINI Young-InfoLife fornisce una piattaforma per gli studenti, dottorandi e giovani ricercatori nel campo dell'informatica, che sono appassionati e coinvolti nelle tematiche trattate dal laboratorio nazionale InfoLife del CINI (Consorzio Interuniversitario Nazionale di Informatica). 
                        CINI Young-InfoLife è gestito da giovani (bio)informatici per giovani (bio)informatici, e promuove il networking e la formazione dei propri affiliati attraverso diverse azioni che includono l’organizzazione di eventi/conferenze, l’erogazione di corsi/seminari, la pubblicazione di offerte/opportunità (tesi, progetti, conferenze, posizioni lavorative, ecc.), la divulgazione di contenuti scientifici, ecc.
                        <br/>
                        <br/>
                        In un campo fortemente interdisciplinare come la bioinformatica, CINI Young-InfoLife si distingue da iniziative simili per la forte impronta metodologica e informatica e, pur rimanendo aperto agli essenziali aspetti più applicativi e biologici, vuole concentrarsi sulle metodologie informatiche e sul loro ruolo nell’ambito delle scienze della vita.
                        <br/>
                        <br/>
                        CINI Young-InfoLife vuole essere un piccolo ma dinamico tassello nel più ampio mosaico che è il CINI, e dare un importante contributo nelle attività del CINI, del laboratorio InfoLife e della bioinformatica in Italia
                        <br/>
                        <br/>
                        Se sei un giovane bioinformatico seguici sui nostri canali social oppure richiedi la tua partecipazione tramite il form sul nostro sito web.
                        Altrimenti, contattaci per promuovere le tue attività, proposte di formazione o lavorative ai membri del nostro gruppo.

                    </Box>
                </Grid>
                <Grid item xs={12} md={5} lg={4}>
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="young_infolife"
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
