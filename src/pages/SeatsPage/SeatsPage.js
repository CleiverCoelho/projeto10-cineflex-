import styled from "styled-components"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import Assento from "../../components/Assento";
import Comprador from "../../components/Comprador";
import Caption from "./Caption";
import Footer from "./Footer";

export default function SeatsPage() {

    const {assentoId} = useParams();
    const [assentos, setAssentos] = React.useState([]);
    const [dia, setDia] = React.useState("");
    const [data, setData] = React.useState("");
    const [horario, setHorario] = React.useState("");
    const [filme, setFilme] = React.useState({});
    const [listaCompradores, setListaCompradores] = React.useState([]);
    const [assentosReservados, setAssentosReservados] = React.useState([]);


    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${assentoId}/seats`;
        const promiseSessoes = axios.get(url);

        promiseSessoes.then((response) => {
            // console.log(response.data)
            setAssentos(response.data.seats);
            setData(response.data.day.date);
            setDia(response.data.day.weekday);
            setHorario(response.data.name);
            setFilme(response.data.movie);
        })
    }, [])

    function finalizarReserva(event){
        event.preventDefault();
        if(assentosReservados.length === 0){
            alert("Selecione pelo menos um Assento");
            return null;
        }
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assentos.map(({id, name, isAvailable}) => {
                    return (
                        <Assento
                            key={id}
                            id={id}
                            listaCompradores={listaCompradores}
                            setListaCompradores={setListaCompradores}
                            isAvailable={isAvailable}
                            name={name}
                            assentos={assentos}
                            setAssentos={setAssentos}
                            setAssentosReservados={setAssentosReservados}
                            assentosReservados={assentosReservados}
                        ></Assento>
                )})}
            </SeatsContainer>

            <Caption></Caption>

            <FormCompradores onSubmit={finalizarReserva}>
                {listaCompradores.map((comprador) => {
                    return (
                        <Comprador
                            key={comprador.id}
                            nomeComprador={comprador.nome}
                            cpfComprador={comprador.cpf}
                            assentoComprador={comprador.id}
                            setListaCompradores={setListaCompradores} 
                            listaCompradores={listaCompradores}   
                        ></Comprador>
                    )
                })}    
                <button type="submit">Reservar Assento(s)</button>
            </FormCompradores>

            <Footer posterURL={filme.posterURL} title={filme.title} dia={dia} horario={horario}></Footer>

        </PageContainer>
    )
}
const FormCompradores = styled.form`
    button {
        align-self: center;
    }
`

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`