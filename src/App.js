import GlobalStyle from "./GlobalStyle"
import ScreenLogin from "./ScreenLogin"
import ScreenCadastro from "./ScreenCadastro"
import ScreenHome from "./ScreenHome"
import ScreenNovaTransiction from "./ScreenNovaTransaction"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthProvider from "./AuthContext"


export default function App() {
    return (
        <>
            <AuthProvider>
                <GlobalStyle />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ScreenLogin />} />
                        <Route path="/cadastro" element={<ScreenCadastro />} />
                        <Route path="/home" element={<ScreenHome />} />
                        <Route path="/transactions/:type" element={<ScreenNovaTransiction />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}
