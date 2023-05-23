import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Button from '@mui/material/Button';
import Classes from '../../styles/CreateAccountForm.module.css';
import TextField from '@mui/material/TextField';

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

        if(authCtx.isSuccess) {
            return navigate("/", { replace:true });
        }
    }

    return (
        <section className={Classes.AccountSection}>
            <h1>회원가입</h1>
            <form onSubmit={submitHandler}>
                <div>
                   <TextField label="이메일" variant="standard" id='email' helperText="이메일을 입력해주세요" required inputRef={emailInputRef} />
                </div>
                <div>
                    <TextField label="패스워드" type="password" variant="standard" helperText="패스워드를 입력해주세요" required inputRef={passwordInputRef} />
                </div>
                <div>
                    <TextField label="닉네임" variant="standard" id='nickname' helperText="닉네임을 입력해주세요" required inputRef={nicknameInputRef} />
                </div>
                <div style={{
                    paddingTop: 30
                }}>
                    <Button variant="contained" type='submit'>등록</Button>
                </div>
            </form>
        </section>
    )
}

export default CreateAccountForm;