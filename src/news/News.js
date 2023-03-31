import React from 'react';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {TwitterTimelineEmbed} from "react-twitter-embed";

function News() {

    return (
        <Box>

            <Navbar/>

            <Box>

                <Container component="main" maxWidth="lg" sx={{color:"white", paddingTop:"3%"}}>
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="QbioGroup"
                        options={{height: 500}}
                    />
                </Container>
            </Box>


            <Footer/>
        </Box>
    );
}

export default News;