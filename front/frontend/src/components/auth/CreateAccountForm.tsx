import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Button from '@mui/material/Button';
import Classes from '../../styles/CreateAccountForm.module.css';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';
import Face5Icon from '@mui/icons-material/Face5';

const CreateAccountForm = () => {
    let navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const nicknameInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current!.value;
        const enteredPassword = passwordInputRef.current!.value;
        const enteredNickname = nicknameInputRef.current!.value;

        authCtx.signup(enteredEmail, enteredPassword, enteredNickname);

        alert('회원가입 완료');

        return navigate("/", { replace:true });
    }

    return (
        <section className={Classes.AccountSection}>
            <h1>회원가입</h1>
            <form onSubmit={submitHandler}>
                <div>
                   <TextField 
                        label="이메일"
                        variant="standard"
                        id='email'
                        autoComplete='true'
                        required inputRef={emailInputRef}
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
                        required inputRef={passwordInputRef} 
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
                        required inputRef={nicknameInputRef}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <Face5Icon />
                                </InputAdornment>
                            ),
                        }}/>
                </div>
                <div style={{
                    paddingTop: 30,
                    paddingLeft: 40
                }}>
                    <Button style={{
                    width: 120
                }} variant="contained" type='submit'>등록</Button>
                </div>
            </form>
        </section>
    )
}

export default CreateAccountForm;