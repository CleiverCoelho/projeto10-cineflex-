import styled from "styled-components"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import Assento from "../../components/Assento";
import Comprador from "../../components/Comprador";

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

            <CaptionContainer>
                <CaptionItem>
                <CaptionCircle cor="#1AAE9E" borda="#0E7D71" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle cor="#C3CFD9" borda="#7B8B99"/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle cor="#FBE192" borda="#F7C52B"/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

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

            <FooterContainer>
                <div>
                    <img src={filme.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{filme.title}</p>
                    <p>{dia} - {horario}</p>
                </div>
            </FooterContainer>

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

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${(props) => props.borda};         // Essa cor deve mudar
    background-color: ${(props) => props.cor};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`