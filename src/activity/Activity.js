import React, {useState} from 'react'
import {Box, Card, Grid} from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import paper from "../images/Anonymous_Paper_4_icon.png";
import video from "../images/video.png";
import Container from "@mui/material/Container";

const Activity = () => {

    return (
        <Box>

            <Navbar/>

            <Box color={"white"}>

                <Container component="main" maxWidth="lg">

                    <Grid container sx={{marginTop: "3%"}}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Card sx={{
                                padding: '2%',
                                textAlign: 'center',
                                border: '3px solid',
                                borderColor: '#EEEEEE',
                                borderRadius: '12%'
                            }}>
                                <h1>Iscriviti a Young InfoLife</h1>
                                <p>Compila questo <a href={"https://docs.google.com/forms/d/e/1FAIpQLScnU4WZapdWtZn5Bl6r6adntj8XL7MRhsWFyfsCKNon72xxmQ/viewform?usp=sf_link"}>form</a> per iscriverti al gruppo.</p>
                            </Card>
                        </Grid>
                    </Grid>

                    <Grid container sx={{marginTop: "3%"}}>
                        <Grid item xs={12} md={5} lg={5} color={"white"} >
                            <Card sx={{
                                padding: '5%',
                                border: '3px solid',
                                borderColor: '#EEEEEE',
                                borderRadius: '5%'
                            }}>
                                <h3>
                                    Entra a far parte dei revisori di Young Infolife.
                                </h3>
                                <img src={paper} height={150}/>
                            </Card>
                        </Grid>
                        <Grid item xs={0} md={2} lg={2}>

                        </Grid>
                        <Grid item xs={12} md={5} lg={5} color={"white"}>
                            <Card sx={{
                                padding: '5%',
                                border: '3px solid',
                                borderColor: '#EEEEEE',
                                borderRadius: '5%'
                            }}>
                                <h3>
                                    Proponi un video
                                </h3>
                                <img src={video} height={150}/>

                            </Card>
                        </Grid>
                    </Grid>

                </Container>

            </Box>

            <Footer/>
        </Box>
    )
}
export default Activity