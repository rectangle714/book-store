import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, ButtonGroup, InputAdornment, Alert } from '@mui/material';
import AuthContext from "../../store/auth-context";
import Classes from '../../styles/LoginForm.module.css';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';

const LoginForm = () => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);

    const submitHandler = async(evnet: React.FormEvent) => {
        const enteredEmail = emailInputRef.current!.value;
        const enteredPasswod = passwordInputRef.current!.value;

        setIsLoading(true);
        authCtx.login(enteredEmail, enteredPasswod);
        setIsLoading(false);

        if(authCtx.isSuccess) {
            navigate("/", {replace: true});
        }
    }

    const findPasswordHandler = () => {
        navigate("/profile");
    }

    return (
        <section className={Classes.loginSection}>
            <Alert onClose={() => {}}>로그인 성공!</Alert>
            <h1>로그인</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <TextField 
                        label="이메일" 
                        variant="standard" 
                        autoComplete='true'
                        id='email' 
                        required inputRef={emailInputRef}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                        />
                </div>
                <div>
                    <TextField 
                        label="패스워드" 
                        type="password" 
                        variant="standard" 
                        id='password' 
                        required inputRef={passwordInputRef} 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <KeyIcon />
                                </InputAdornment>
                            ),
                        }}
                        />
                </div>
                <div style={{
                    paddingTop: 30,
                    paddingLeft : 20

                }}>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button type='submit'>로그인</Button>
                    {isLoading && <p>Loading</p>}
                    <Button onClick={findPasswordHandler}>패스워드 찾기</Button>
                </ButtonGroup>
                </div>
            </form>
        </section>
    )

}

export default LoginForm;