import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, User, isExistEmail } from "store/modules/user";
import store from "store/configureStore";
import Button from '@mui/material/Button';
import Styles from 'styles/auth/CreateAccountForm.module.css';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import Face5Icon from '@mui/icons-material/Face5';

const CreateAccountForm = () => {

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const nicknameInputRef = useRef<HTMLInputElement>(null);
    const [signupResultText, setSignupResultText] = useState('');
    const user = useRef<User>({ email: '', password: '', nickname: '', phone:'', loading:'', isLogin: false, role: ''});
    const navigate = useNavigate();

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current!.value;
        const enteredPassword = passwordInputRef.current!.value;
        const enteredPhone = phoneInputRef.current!.value;
        const enteredNickname = nicknameInputRef.current!.value;

        if(!!!enteredEmail) {
            setSignupResultText('이메일을 입력해주세요.');
            return;
        }

        if(!!!emailValidation(enteredEmail)) {
            setSignupResultText('이메일을 정확하게 입력해주세요.');
            return;
        }

        const email = enteredEmail;
        const path= '';
        const isExist = await store.dispatch(isExistEmail({email, path}));
        if(!isExist.payload) {
            setSignupResultText('이미 존재하는 이메일입니다.');
            return;
        }

        if(!!!enteredPassword) {
            setSignupResultText('패스워드를 입력해주세요.');
            return;
        }

        if(!!!enteredPhone) {
            setSignupResultText('휴대폰 번호를 입력해주세요.');
            return;
        }

        if(!!!isCellPhone(enteredPhone)) {
            setSignupResultText('휴대폰 번호가 정확한지 확인해 주세요.');
            return;
        }

        if(!!!enteredNickname) {
            setSignupResultText('닉네임을 입력해주세요.');
            return;
        }

        user.current = { email: enteredEmail, password: enteredPassword, nickname: enteredNickname, phone: enteredPhone, isLogin: false, loading:'', role:''};
        const result = await store.dispatch(signup(user.current));
        if(result.payload == '200') {
            alert('회원가입에 성공했습니다.');
            navigate('/', {replace:true});
        } else {
            setSignupResultText('이미 등록되어있는 이메일 입니다.');
            return;
        }
    
    }

    /* 이메일 validation 체크 */
    const emailValidation = (email:string) => {
        const regEmail = /^[a-zA-Z]+[!#$%&'*+-/=?^_`(){|}~]*[a-zA-Z0-9]*@[\w]+\.[a-zA-Z0-9-]+[.]*[a-zA-Z0-9]+$/;
        return regEmail.test(email);
    }

    /* 휴대폰 validation 체크 */
    const isCellPhone = (phoneNum:string) => {
        phoneNum = phoneNum.split('-').join('');
        const regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
        return regPhone.test(phoneNum);
    }

    return (
        <section className={Styles.AccountSection}>
            <div style={{fontWeight:800, fontSize:'20px', lineHeight:'20px', textAlign:'center'}}>회원가입</div>
            <form style={{marginTop:'20px'}} onSubmit={submitHandler}>
                <div>
                   <TextField 
                        label="이메일"
                        variant="standard"
                        id='email'
                        autoComplete='true'
                        style={{width:'290px', height: '60px'}}
                        placeholder="이메일을 입력해주세요"
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
                        style={{width:'290px', height: '60px'}}
                        placeholder="패스워드를 입력해주세요"
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
                        label="휴대폰"
                        variant="standard"
                        id='phone'
                        style={{width:'290px', height: '60px'}}
                        placeholder="휴대폰 번호를 입력해주세요."
                        inputRef={phoneInputRef}
                        inputProps={{
                            maxLength: 11
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <SmartphoneIcon />
                                </InputAdornment>
                            ),
                        }}/>
                </div>
                <div>

                </div>
                <div>
                    <TextField 
                        label="닉네임"
                        variant="standard"
                        id='nickname'
                        style={{width:'290px', height: '60px'}}
                        placeholder="닉네임을 입력해주세요"
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
                <div style={{ paddingTop: 30}}>
                <Button style={{width: '100%', height:'50px'}} variant="contained" color="success" type='submit'>등록</Button>
                </div>
            </form>
        </section>
    )
}

export default CreateAccountForm;