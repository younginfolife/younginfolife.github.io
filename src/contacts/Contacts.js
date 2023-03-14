import React from 'react'
import {Box, Card, TextField} from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import axios from 'axios';

const Contacts = () => {

    function sendMail(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.post('https://formsubmit.co/younginfolife@gmail.com', {
            Email: data.get('email'),
            Testo: data.get('message')
        }).then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.error(error);
            });
    }


    return (
        <Box>

            <Navbar/>

            <Box>

                <Container component="main" maxWidth="sm">
                    <h1>Contattaci</h1>

                    <Card sx={{
                        padding: '3%',
                        textAlign: 'center',
                        border: '3px solid',
                        borderColor: '#EEEEEE',
                        borderRadius: '12%'
                    }}>
                        <p>Compilare questo <a href={"https://docs.google.com/forms/d/e/1FAIpQLScnU4WZapdWtZn5Bl6r6adntj8XL7MRhsWFyfsCKNon72xxmQ/viewform?usp=sf_link"}>form</a> per iscriverti al gruppo.</p>
                    </Card>

                    <h3>Scrivici un messaggio</h3>

                    <Card sx={{
                        padding: '5%',
                        border: '3px solid',
                        borderColor: '#EEEEEE',
                        borderRadius: '5%'
                    }}>
                        <Box sx={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                        }}>
                            <Box component="form" onSubmit={sendMail} noValidate sx={{mt: 1}}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label={"email"}
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="message"
                                    label="message"
                                    type="message"
                                    id="message"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 2, textTransform: 'none', color: 'white', fontWeight: 'bold'}}
                                >
                                    Invia
                                </Button>
                            </Box>
                        </Box>
                    </Card>

                </Container>
            </Box>

            <Footer/>
        </Box>
    )
}
export default Contacts