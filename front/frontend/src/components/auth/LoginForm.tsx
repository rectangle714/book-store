import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, ButtonGroup, InputAdornment, Alert } from '@mui/material';
import Styles from '../../styles/auth/LoginForm.module.css';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import { Container } from "@mui/joy";
import { useAppDispatch } from "../../store/configureStore";
import { login, logout, User } from "../../store/modules/user";

let logoutTimer:NodeJS.Timeout;

const LoginForm = () => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const user = useRef<User>({ email: '', password: '', nickname: '', loading: '', isLogin: false, role: '' });
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

        user.current = { email:enteredEmail, password:enteredPassword, nickname:'', loading:'', isLogin: false, role:'' };

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
                <div style={{fontWeight:800, fontSize:'20px', lineHeight:'20px', textAlign:'center'}}>로그인</div>
                    <form style={{marginTop:'20px'}} onSubmit={submitHandler}>
                        <div>
                            <TextField 
                                label='이메일'
                                variant='standard'
                                autoComplete='true'
                                style={{width:'290px', height: '60px'}}
                                placeholder="이메일을 입력해주세요"
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
                                style={{width:'290px'}}
                                placeholder="패스워드를 입력해주세요"
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
                        <div style={{display:"flex", justifyContent:'flex-end', marginTop: '10px', fontSize:'13px'}}>
                                <a style={{cursor:'pointer'}}>아이디찾기 </a>
                                <span style={{
                                    width:'1px',
                                    height: '13px',
                                    margin: '3px 6px 0px',
                                    backgroundColor: 'rgb(51, 51, 51)'
                                }}></span>
                                <a style={{cursor:'pointer'}}> 패스워드 찾기</a>
                        </div>
                        <div style={{ paddingTop: '10px' }}>
                        <Button style={{width: '100%', height:'50px', marginTop:'28px'}} color='success' variant='contained' type='submit'>로그인</Button>
                        <Button style={{width: '100%', height:'50px', marginTop:'10px'}} color='success' variant='outlined' onClick={() => {navigate('/signup')}}>회원가입</Button>
                        </div>
                    </form>
                    <div style={{
                            paddingTop: 20,
                        }}>
                        <a style={{cursor:'pointer'}} href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=XDGBtoL9xSpef9ollyL5&state=test&redirect_url=http://localhost:3000/auth/naver-login"><img src='/images/auth/naverLoginButton.png' style={{width:140}}/></a>
                        <a style={{cursor:'pointer'}} href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=af340241291df4f8ed0c64fd9c971b33&redirect_uri=http://localhost:3000/auth/kakao-login"><img src='/images/auth/kakaoLoginButton.png' style={{width:150, marginLeft:5}}/></a>
                    </div>
                    <div style={{
                            paddingTop: 10,
                            fontSize: 12, 
                            color: 'red',
                            textAlign: 'center',
                            paddingLeft: 30
                        }}>
                        {loginText}
                    </div>
            </section>
        </Container>
    )

}

export default LoginForm;