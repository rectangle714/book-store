import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ChangeUsername = () => {
    let navigate = useNavigate();
    const nicknameInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredNickname = nicknameInputRef.current!.value;
        // authCtx.changeNickname(enteredNickname);
        // if(authCtx.isSuccess) {
        //     alert('변경 되었습니다');
        //     authCtx.getUser();
        //     navigate('/', {replace:true});
        // }
    }

    return (
        <form onSubmit={submitHandler} >
            <div>
                <label htmlFor='username'>새로운 닉네임</label>
                <input type='text' id="username" minLength={3} required ref={nicknameInputRef}></input>
            </div>
            <div>
                <button type='submit'>변경</button>
            </div>
        </form>
    )

}
export default ChangeUsername;