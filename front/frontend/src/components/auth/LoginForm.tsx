import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, ButtonGroup, InputAdornment, Alert } from '@mui/material';
import Styles from './LoginForm.module.css';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import { Container } from "@mui/joy";
import { useAppDispatch } from "../../store/configureStore";
import { login, logout, User } from "../../store/modules/user";

let logoutTimer:NodeJS.Timeout;

const LoginForm = () => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const user = useRef<User>({ email: '', password: '', nickname: '', loading: '', isLogin: false, authority: '' });
    const dispatch = useAppDispatch();
    const [loginText, setLoginText] = useState('');
    let navigate = useNavigate();

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current!.value;
        const enteredPassword = passwordInputRef.current!.value;

        if(enteredEmail == '') {
            setLoginText('이메일을 입력해주세요.');
            return false;
        }

        if(enteredPassword == '') {
            setLoginText('패스워드를 입력해주세요.');
            return false;
        }

        user.current = { email:enteredEmail, password:enteredPassword, nickname:'', loading:'', isLogin: false, authority:'' };

        const result = await dispatch(login(user.current));
        if(result.payload != undefined) {
            setLoginText('');
            const expirationTime:number = result.payload.refreshTokenExpiresIn;
            const currentTime = new Date().getTime();
            const adjExpirationTime = new Date(expirationTime).getTime();
            const remainingDuration = adjExpirationTime - currentTime;
            logoutTimer = setTimeout(() =>{
                dispatch(logout());
                navigate('/');
            }, remainingDuration);

            navigate('/', {replace:true, state:logoutTimer});
        } else {
            setLoginText('아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.');
            return false;
        }

    }

    const findPasswordHandler = () => {
        navigate('/profile');
    }

    return (
        <Container maxWidth="lg" fixed>
            <section className={Styles.loginSection}>
                    <form style={{border:2}} onSubmit={submitHandler}>
                        <div>
                            <TextField 
                                label='이메일'
                                variant='standard'
                                autoComplete='true'
                                id='email' 
                                inputRef={emailInputRef}
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
                                id='password' 
                                inputRef={passwordInputRef} 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                        <KeyIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                />
                        </div>
                        <div style={{
                            paddingTop: 10,
                            paddingLeft : 80
                        }}>
                        <Button color='success' variant='contained' size="large" type='submit'>로그인</Button>
                        </div>
                    </form>
                    <div style={{
                            paddingTop: 10,
                            fontSize: 12, 
                            color: 'red',
                            textAlign: 'center'
                        }}>
                        {loginText}
                    </div>
            </section>
        </Container>
    )

}

export default LoginForm;