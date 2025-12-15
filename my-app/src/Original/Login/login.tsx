import { useUser } from "../../hooks/user.hooks";
import { useState } from "react";
import { verify } from "../../Store/Services/editFunctions";

const Login = () => {
    const { login, register, logout } = verify(useUser());
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <section>
            <h1>Login or register</h1>
            <form>
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
                <div>
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
                                register(email, password)
                            }
                        }
                    >
                        Register
                    </button>
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
                </div>
            </form>
        </section>
    );
}

export { 
    Login
}