import { useState } from "react";
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Preview = () => {

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

    const [imageSrc, setImegeSrc]: any = useState(null);

    const onUpload = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise<void>((resolve) => {
            reader.onload = () => {
                setImegeSrc(reader.result || null);
                resolve();
            }
        })

    }

    return (
        <>
            <div style={{clear:"both", border:""}}><img width={'20%'} src={imageSrc}/></div>
            <div>
            <Button color='success' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload
                <VisuallyHiddenInput 
                accept="image/*" 
                multiple type="file"
                onChange={e => onUpload(e)}
                />
            </Button>
            </div>
        </>
    )
}

export default Preview;