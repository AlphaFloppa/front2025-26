import { useUser } from "../hooks/user.hooks";
import { useState } from "react";
import style from "./style.module.css"

const Login = () => {
    const { user, login, register, logout } = useUser();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <section className={ style.section }>
            <h1 className={style.message}>Login or register</h1>
            <form
                className={style.form}
            >
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={
                        (event) => {
                            setEmail(event.target.value);
                        }
                    }
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={
                        (event) => {
                            setPassword(event.target.value);
                        }
                    }
                />
                <div
                    className={ style.buttonContainer }
                >
                    <button
                        className="button"
                        type="button"
                        onClick={
                            () => {
                                login(email, password)
                            }
                        }
                    >
                        Login
                    </button>
                    <button
                        className="button"
                        type="button"
                        onClick={
                            () => {
                                register(email, password);
                                login(email, password)
                            }
                        }
                    >
                        Register
                    </button>
                    {
                        user && (
                            <button
                                type="button"
                                onClick={
                                    () => {
                                        logout()
                                    }
                                }
                            >
                                Logout
                            </button>
                        )
                    }
                </div>
            </form>
        </section>
    );
}

export { 
    Login
}