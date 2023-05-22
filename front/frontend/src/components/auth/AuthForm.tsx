import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);

    const submitHandler = async(evnet: React.FormEvent) => {
        const enteredEmail = emailInputRef.current!.value;
        const enteredPasswod = passwordInputRef.current!.value;

        setIsLoading(true);
        authCtx.login(enteredEmail, enteredPasswod);
        setIsLoading(false);

        if(authCtx.isSuccess) {
            navigate("/", {replace: true});
        }

    }

    return (
        <section>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor='email'>이메일</label>
                    <input type='email' id='email' required ref={emailInputRef}></input>
                </div>
                <div>
                    <label htmlFor='password'>패스워드</label>
                    <input type='password' id='password' required ref={passwordInputRef}></input>
                </div>
                <div>
                    <button type='submit'>Login</button>
                    {isLoading && <p>Loading</p>}
                    <p>계정 생성</p>
                </div>
            </form>
        </section>
    )

}

export default AuthForm;