import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, ButtonGroup, InputAdornment, Alert } from '@mui/material';
import Styles from './LoginForm.module.css';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import { Container } from "@mui/joy";
import store from "../../store/configureStore";
import { useAppSelect, useAppDispatch } from "../../store/configureStore";
import { login, User  } from "../../store/modules/user";

const LoginForm = () => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const user = useRef<User>({ email: '', password: '', nickname: '', loading: '', isLogin: false});
    const dispatch = useAppDispatch();

    let navigate = useNavigate();
    const [loginText, setLoginText] = useState('');

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

        user.current = { email:enteredEmail, password:enteredPassword, nickname:'', loading:'', isLogin: false  };

        const result = await dispatch(login(user.current));
        if(result.payload != undefined) {
            navigate('/');
            console.log('이거 확인 - ',store.getState());
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
                <h1>로그인</h1>
                    <form onSubmit={submitHandler}>
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
                            paddingLeft : 20
                        }}>
                        <ButtonGroup variant='outlined' color='success' aria-label='outlined button group'>
                            <Button color='success' type='submit'>로그인</Button>
                            <Button onClick={findPasswordHandler}>패스워드 찾기</Button>
                        </ButtonGroup>
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