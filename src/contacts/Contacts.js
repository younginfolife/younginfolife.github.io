import React, {useState} from 'react'
import {Box, Card, CircularProgress, TextField} from "@mui/material";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const Contacts = () => {

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false);

    function sendMail(event){
        setLoading(true)
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        fetch('https://formsubmit.co/ajax/younginfolife@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: data.get('email'),
                message: data.get('message')
            })
        }).then(function (response) {
                console.log(response);
                setLoading(false)
                setSuccess(true)
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const buttonSx = {
        ...(success && {
            bgcolor: 'green',
            '&:hover': {
                bgcolor: 'green',
            },
            mt: 2, textTransform: 'none', color: 'white', fontWeight: 'bold',
        }),
    };


    return (
        <Box>

            <Navbar/>

            <Box color={"white"}>

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
                                <Box sx={{ m: 1, position: 'relative' }}>
                                    <Button
                                        sx={buttonSx}
                                        disabled={loading}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                    >
                                        Invia
                                    </Button>
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                color: 'green',
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                marginTop: '-12px',
                                                marginLeft: '-12px',
                                            }}
                                        />
                                    )}
                                </Box>
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