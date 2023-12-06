import { useRef, useState } from 'react';
import { Button, TextField, InputAdornment } from '@mui/material';
import { useAppSelect } from "../../../store/configureStore";

const Profile = () => {

    const emailInputRef = useRef<HTMLInputElement>(null);
    const email = useAppSelect((state) => state.userReducer.email);
    //const phone = useAppSelect((state) => state.userReducer.phone);

    return (
        <>
            <div style={{marginTop:'50px', paddingTop:'160px'}}>
                <div>
                    <div>이메일</div>
                    <div>
                        <TextField 
                        variant='standard'
                        sx={{width:'490px', textAlign:'center !important'}}
                        disabled
                        value={email}
                        id='email'
                        />
                    </div>
                </div>
                <div style={{paddingTop:'50px'}}>
                    <div>패스워드</div>
                    <div>
                        <TextField 
                        variant='standard'

                        sx={{width:'490px'}}
                        />
                    </div>
                </div>                
                <div style={{paddingTop:'50px'}}>
                    <div>핸드폰 번호</div>
                    <div>
                        <TextField 
                        variant='standard'
                        sx={{width:'490px'}}
                        />
                    </div>
                </div>
                <div style={{paddingTop:'50px'}}>
                    <div>닉네임</div>
                    <div>
                        <TextField 
                        variant='standard'
                        sx={{width:'490px'}}
                        />
                    </div>
                </div>
            </div>
            <div style={{textAlign:'center', paddingTop:'80px'}}>
                <Button>수정</Button>
            </div>
        </>
    );
}

export default Profile;