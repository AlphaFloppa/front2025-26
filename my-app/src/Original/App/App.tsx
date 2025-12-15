import { Editor } from "../Editor/editor";
import { UserContextProvider } from "../../hooks/user.hooks";
import { Login } from "../Login/login";
import { Home } from "../Home/home";

const route = () => {
    switch (window.location.pathname) {
        case "/login":
            return (
                <Login />
            );
        case "/dev":
            return (
                <Editor />
            );
        default:
            return <Home />
    }
};

const App = () => {
    return (
        <UserContextProvider>
            {
                route()
            }
        </UserContextProvider>
    );
}

export {
    App
}