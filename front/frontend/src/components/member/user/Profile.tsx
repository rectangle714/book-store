import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, TextField, InputAdornment } from '@mui/material';
import { useAppSelect } from "../../../store/configureStore";
import { User } from "../../../store/modules/user";
import store from "../../../store/configureStore";
import { userUpdate } from '../../../store/modules/user';

const Profile = () => {

    const email = useAppSelect((state) => state.userReducer.email);
    const phone = useAppSelect((state) => state.userReducer.phone);
    const nickname = useAppSelect((state) => state.userReducer.nickname);
    const navigate = useNavigate();

    const passwordInputRef = useRef<HTMLInputElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const nicknameInputRef = useRef<HTMLInputElement>(null);
    const [validationText, setvalidationText] = useState('');
    const user = useRef<User>({ email: '', password: '', nickname: '', phone:'', loading:'', isLogin: false, role: ''});

    const onClickBtn = async (event: React.MouseEvent) => {
        event.preventDefault();

        const enteredPassword = passwordInputRef.current?.value;
        const enteredPhone = phoneInputRef.current?.value;
        const enteredNickname = nicknameInputRef.current?.value;

        if(!!!enteredPassword) {
            setvalidationText('');
            return;
        }

        if(!!!enteredPhone) {
            setvalidationText('');
            return;
        }

        if(!!!enteredNickname) {
            setvalidationText('');
            return;
        }

        user.current = { email: email, password: enteredPassword, nickname: enteredNickname, phone:enteredPhone, isLogin: false, loading:'', role:''};;

        const result = await store.dispatch(userUpdate(user.current));
        if(result.payload == '200') {
            alert('정보를 수정하였습니다.');
            navigate('/', {replace:true});
        } else {
            alert('실패');
            return;
        }

    }

    return (
        <>
            <div style={{paddingTop: '80px', borderBottom: 'solid 3px black', height:'80px'}} >
                <div style={{textAlign:'center'}}>
                    <span style={{fontWeight: '500', fontSize: '24px', color: 'rgb(51, 51, 51)', lineHeight:'48px'}}>마이페이지</span>
                </div>
                <div style={{textAlign:'center', borderBottom:'solid 3px black'}}>
                    <table style={{width: '490px', marginLeft: 'auto', marginRight: 'auto', borderCollapse: 'separate', borderSpacing: '10px 20px', paddingTop:'50px'}}>
                        <colgroup>
                                <col width={'30%'} />
                                <col width={'70%'}/>
                        </colgroup>
                        <tbody>
                            <tr>
                                <td>이메일</td>
                                <td>
                                    <TextField 
                                        variant='outlined'
                                        sx={{width:'100%', input: {textAlign: "center"}}}
                                        disabled
                                        defaultValue={ email }
                                        id='email'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>패스워드</td>
                                <td>
                                    <TextField 
                                        type='password'
                                        variant='outlined'
                                        sx={{width:'100%', input: {textAlign: "center"}}}
                                        placeholder="패스워드를 입력해주세요"
                                        id='password'
                                        inputRef={ passwordInputRef } 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>휴대폰</td>
                                <td>
                                    <TextField 
                                        variant='outlined'
                                        sx={{width:'100%', input: {textAlign: "center"}}}
                                        defaultValue={ phone }
                                        inputRef={ phoneInputRef }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>닉네임</td>
                                <td>
                                    <TextField 
                                        variant='outlined'
                                        sx={{width:'100%', input: {textAlign: "center"}}}
                                        defaultValue = { nickname }
                                        inputRef={ nicknameInputRef }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <Button style={{width: '100%', height:'50px', marginTop:'28px'}} color='success' variant='contained' onClick={onClickBtn}>정보 수정</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Profile;