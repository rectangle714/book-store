import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleLoginButton = () => {
    const clientId = '84998757323-j3om0scseph72tgal0lbhjvcb6l0dsnh.apps.googleusercontent.com';

    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin  size="medium"
                    onSuccess={(res) => {
                        console.log(res);
                    }}
                    onError={() => {
                        console.log('실패');
                    }}
                />
            </GoogleOAuthProvider>
        </>
    )
}

export default GoogleLoginButton;