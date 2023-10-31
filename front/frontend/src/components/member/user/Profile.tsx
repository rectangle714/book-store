import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import store from "../../../store/configureStore";
import { registerItem } from '../../../store/modules/item';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Item } from '../../../store/modules/item';

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