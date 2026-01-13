import { Editor } from "../Editor/editor";
import { UserContextProvider } from "../../hooks/user.hooks";
import { Login } from "../Login/login";
import { Home } from "../Home/home";
import { Viewer } from "../Viewer/viewer";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dev" element={<Editor/>} />
                    <Route path="/overview" element={<Viewer />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
    );
}

export {
    App
}