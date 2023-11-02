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
                <section style={{
                    minHeight:'84.8vh',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center',
                    fontSize:'calc(10px + 2vmin)'
                }}>
                    <div style={{fontWeight:800, fontSize:'28px', lineHeight:'20px', textAlign:'center', marginBottom:'20px'}}>패스워드 찾기</div>
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
                                    label='휴대폰 번호'
                                    type='text'
                                    variant='standard'
                                    style={{width:'290px'}}
                                    placeholder="패스워드를 입력해주세요"
                                    id='phone'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                            <KeyIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    />
                            </div>
                            <Button style={{width: '100%', height:'50px', marginTop:'28px'}} color='success' variant='contained' type='submit'>인증번호 받기</Button>
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