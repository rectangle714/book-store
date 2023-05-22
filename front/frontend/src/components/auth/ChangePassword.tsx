import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const ChangePassword = () => {
    let navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const exPasswordInputRef = useRef<HTMLInputElement>(null);
    const newPasswordInputRef = useRef<HTMLInputElement>(null);
    const newPasswordAgainInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredExPassword = exPasswordInputRef.current!.value;
        const enteredNewPassword = newPasswordInputRef.current!.value;
        const enteredNewPasswordAgain = newPasswordAgainInputRef.current!.value;
        if(enteredNewPassword !== enteredNewPasswordAgain) {
            alert('패스워드를 잘못 입력했습니다.');
            return;
        }
        console.log('패스워드 변경 시작');
        authCtx.changePassword(enteredExPassword, enteredNewPassword);
        console.log(authCtx.isSuccess);
        if(authCtx.isSuccess) {
            alert('다시 로그인 하세요.');
            authCtx.logout();
            navigate('/', {replace: true});
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor='ex-password'>이전 패스워드</label>
                <input type='password' id='ex-password' minLength={8} ref={exPasswordInputRef}></input>
                <label htmlFor='new-password'>새로운 패스워드</label>
                <input type='password' id='new-password' minLength={8} ref={newPasswordInputRef}></input>
                <label htmlFor='new-password'>새로운 패스워드 재입력</label>
                <input type='password' id='new-password' minLength={8} ref={newPasswordAgainInputRef}></input>
            </div>
            <div>
                <button type='submit'>패스워드 변경</button>
            </div>

        </form>
    )
}

export default ChangePassword;