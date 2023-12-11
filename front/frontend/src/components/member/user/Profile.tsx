import { useRef, useState } from 'react';
import { Button, TextField, InputAdornment } from '@mui/material';
import { useAppSelect } from "../../../store/configureStore";
import { ClassNames } from '@emotion/react';
import Container from '@mui/material/Container';

const Profile = () => {

    const email = useAppSelect((state) => state.userReducer.email);
    const nickname = useAppSelect((state) => state.userReducer.nickname);

    const passwordInputRef = useRef<HTMLInputElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const nicknameInputRef = useRef<HTMLInputElement>(null);

    const onClickBtn = () => {
        const password = passwordInputRef.current?.value;
        const phone = phoneInputRef.current?.value;
        const nickname = nicknameInputRef.current?.value;

        
    }

    return (
        <>
            <div style={{paddingTop: '80px', borderBottom: 'solid 3px black', height:'80px'}} >
                <div>
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
                                        value={email}
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
                                        inputRef={passwordInputRef} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>휴대폰</td>
                                <td>
                                    <TextField 
                                        variant='outlined'
                                        sx={{width:'100%', input: {textAlign: "center"}}}
                                        inputRef={phoneInputRef} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>닉네임</td>
                                <td>
                                    <TextField 
                                        variant='outlined'
                                        sx={{width:'100%', input: {textAlign: "center"}}}
                                        defaultValue = {nickname}
                                        inputRef={nicknameInputRef}
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