import { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, TextField, InputAdornment } from '@mui/material';
import { useAppSelect } from "../../../store/configureStore";
import { User } from "../../../store/modules/user";
import store from "../../../store/configureStore";
import { updateUserInfo, userInfo } from '../../../store/modules/user';

const Profile = () => {

    const navigate = useNavigate();
    const email = useAppSelect((state) => state.userReducer.email);
    const phone = useAppSelect((state) => state.userReducer.phone);
    const nickname = useAppSelect((state) => state.userReducer.nickname);

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
            setvalidationText('변경할 패스워드를 입력해주세요');
            return;
        }

        if(!!!enteredPhone) {
            setvalidationText('변경할 휴대폰 번호를 입력해주세요.');
            return;
        }

        if(!!!isCellPhone(enteredPhone)) {
            setvalidationText('휴대폰 번호가 정확한지 확인해 주세요.');
            return;
        }


        if(!!!enteredNickname) {
            setvalidationText('변경할 닉네임을 입력해주세요.');
            return;
        }

        user.current = { email: email, password: enteredPassword, nickname: enteredNickname, phone:enteredPhone, isLogin: false, loading:'', role:''};;

        const result = await store.dispatch(updateUserInfo(user.current));
        if(result.payload == '200') {
            alert('정보를 수정하였습니다.');
            window.location.replace('/');
        } else {
            alert('정보 수정을 실패했습니다.');
            return;
        }
    }

    /* 휴대폰 validation 체크 */
    const isCellPhone = (phoneNum:string) => {
        phoneNum = phoneNum.split('-').join('');
        const regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
        return regPhone.test(phoneNum);
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
                                <td colSpan={2} style={{height:'30px'}}>
                                    <span style={{color:'red'}}>{validationText}</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <Button style={{width: '50%', height:'50px', marginTop:'28px'}} color='success' variant='contained' onClick={onClickBtn}>정보 수정</Button>
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