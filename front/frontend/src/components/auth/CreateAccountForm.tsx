import { useRef, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Button from '@mui/material/Button';
import Styles from './CreateAccountForm.module.css';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';
import Face5Icon from '@mui/icons-material/Face5';
import { signup, User } from "../../store/modules/user";
import store from "../../store/configureStore";

const CreateAccountForm = () => {

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const nicknameInputRef = useRef<HTMLInputElement>(null);
    const [signupResultText, setSignupResultText] = useState('');
    const user = useRef<User>({ email: '', password: '', nickname: '', loading:'', isLogin: false});
    let navigate = useNavigate();

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current!.value;
        const enteredPassword = passwordInputRef.current!.value;
        const enteredNickname = nicknameInputRef.current!.value;

        if(!!!enteredEmail) {
            setSignupResultText('이메일을 입력해주세요.');
            return;
        }

        if(!!!enteredPassword) {
            setSignupResultText('패스워드를 입력해주세요.');
            return;
        }

        if(!!!enteredNickname) {
            setSignupResultText('닉네임을 입력해주세요.');
            return;
        }

        user.current = { email: enteredEmail, password: enteredPassword, nickname: enteredNickname, isLogin: false, loading:'' };
        const result = await store.dispatch(signup(user.current));
        if(result.payload == '200') {
            alert('회원가입에 성공했습니다.');
            navigate('/');
        } else {
            setSignupResultText('이미 등록되어있는 이메일 입니다.');
            return;
        }
    
    }

    return (
        <section className={Styles.AccountSection}>
            <h1>회원가입</h1>
            <form onSubmit={submitHandler}>
                <div>
                   <TextField 
                        label="이메일"
                        variant="standard"
                        id='email'
                        autoComplete='true'
                        inputRef={emailInputRef}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <EmailIcon />
                                </InputAdornment>
                            ),
                        }}/>
                </div>
                <div>
                    <TextField 
                        label="패스워드" 
                        type="password" 
                        variant="standard" 
                        inputRef={passwordInputRef} 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <KeyIcon />
                                </InputAdornment>
                            ),
                        }}/>
                </div>
                <div>
                    <TextField 
                        label="닉네임"
                        variant="standard"
                        id='nickname'
                        inputRef={nicknameInputRef}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <Face5Icon />
                                </InputAdornment>
                            ),
                        }}/>
                </div>
                <div style={{
                    paddingTop: 10,
                    fontSize: 12, 
                    color: 'red',
                    textAlign: "center"
                }}>{signupResultText}</div>
                <div style={{ paddingTop: 30, paddingLeft: 60 }}>
                <Button style={{ width: 120 }} variant="outlined" color="success" type='submit'>등록</Button>
                </div>
            </form>
        </section>
    )
}

export default CreateAccountForm;