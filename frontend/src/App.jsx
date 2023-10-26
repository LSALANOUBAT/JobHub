import Advertisements from "./pages/advertisements/advertisements";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/login/login";
import SignUp from "./pages/signUp/signUp";
import ForgotPassword from "./pages/forgotPassword/forgotPassword";
import Header from "./component/header/header";
import AdvertisementMonitor from "../src/pages/monitor/pages/Advertisement";
import CompanyMonitor from "../src/pages/monitor/pages/Company";
import UserMonitor from "../src/pages/monitor/pages/User";
import ApplicationMonitor from "../src/pages/monitor/pages/Application";

import { Toaster } from "sonner";

function App() {
    return (
        <BrowserRouter basename="/">
            <Header />
            <Toaster position="bottom-right" richColors={true} />
            <Routes>
                <Route path="/" Component={Advertisements} />
                <Route path="/login" Component={Login} />
                <Route path="/sign-up" Component={SignUp} />
                <Route path="/forgot-password" Component={ForgotPassword} />
                <Route
                    path="/monitor/advertisement"
                    element={<AdvertisementMonitor />}
                />
                <Route path="/monitor/company" element={<CompanyMonitor />} />
                <Route path="/monitor/user" element={<UserMonitor />} />
                <Route
                    path="/monitor/application"
                    element={<ApplicationMonitor />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
