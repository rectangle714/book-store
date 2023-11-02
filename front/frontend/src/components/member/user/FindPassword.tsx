import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, ButtonGroup, InputAdornment, Alert } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import { Container } from "@mui/joy";

const FindPassword = () => {

    return (
        <>
           <Container maxWidth="lg" fixed>
                <section >
                    <div style={{fontWeight:800, fontSize:'20px', lineHeight:'20px', textAlign:'center'}}>패스워드 찾기</div>
                        <form style={{marginTop:'20px'}} >
                            <div>
                                <TextField 
                                    label='이메일'
                                    variant='standard'
                                    autoComplete='true'
                                    style={{width:'290px', height: '60px'}}
                                    placeholder="이메일을 입력해주세요"
                                    id='email'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                            <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    />
                            </div>
                            <div>
                                <TextField 
                                    label='패스워드'
                                    type='password'
                                    variant='standard'
                                    style={{width:'290px'}}
                                    placeholder="패스워드를 입력해주세요"
                                    id='password'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                            <KeyIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    />
                            </div>
                        </form>
                        <div style={{
                                paddingTop: 20,
                            }}>
                        </div>
                        <div style={{
                                paddingTop: 10,
                                fontSize: 12, 
                                color: 'red',
                                textAlign: 'center',
                                paddingLeft: 30
                            }}>
                        </div>
                </section>
            </Container>
        </>
    )
}

export default FindPassword;