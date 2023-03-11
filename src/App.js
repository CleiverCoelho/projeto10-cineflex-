import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react"

export default function App() {

    const [assentos, setAssentos] = React.useState([]);
    const [dia, setDia] = React.useState("");
    const [data, setData] = React.useState("");
    const [horario, setHorario] = React.useState("");
    const [filme, setFilme] = React.useState({});
    const [listaCompradores, setListaCompradores] = React.useState([]);
    const [assentosReservados, setAssentosReservados] = React.useState([]);

    return (
        <BrowserRouter>
           <NavContainer >
                CINEFLEX
            </NavContainer>
            <Routes>
                <Route path="/" element={<HomePage 
                    setAssentos={setAssentos}
                    setDia={setDia}
                    setData={setData}
                    setHorario={setHorario}
                    setFilme={setFilme}
                    setListaCompradores={setListaCompradores}
                    setAssentosReservados={setAssentosReservados}
                />}></Route>
                <Route path="/assentos/240/:assentoId" element={<SeatsPage 
                    assentos={assentos}
                    setAssentos={setAssentos}
                    dia={dia}
                    setDia={setDia}
                    data={data}
                    setData={setData}
                    horario={horario}
                    setHorario={setHorario}
                    filme={filme}
                    setFilme={setFilme}
                    listaCompradores={listaCompradores}
                    setListaCompradores={setListaCompradores}
                    assentosReservados={assentosReservados}
                    setAssentosReservados={setAssentosReservados}
                />}></Route>
                <Route path="/sessoes/37/:filmeId" element={<SessionsPage />}></Route>
                <Route path="/sucesso" element={<SuccessPage 
                    filme={filme}
                    horario={horario}
                    data={data}
                    listaCompradores={listaCompradores}
                />}></Route>
            </Routes>
            
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }

`
