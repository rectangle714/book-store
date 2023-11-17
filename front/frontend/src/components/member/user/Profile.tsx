import { useRef, useState } from 'react';
import { Button, TextField, InputAdornment } from '@mui/material';

const Profile = () => {
    const emailInputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div style={{marginTop:'50px'}}>
                <div>이메일</div>
                <div>
                    <TextField 
                    variant='standard'
                    autoComplete='true'
                    id='email'
                    inputRef={emailInputRef}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position='start'>
                        {/* <EmailIcon /> */}
                        </InputAdornment>
                        ),
                    }}
                    />
                </div>
            </div>
        </>
    );
}

export default Profile;