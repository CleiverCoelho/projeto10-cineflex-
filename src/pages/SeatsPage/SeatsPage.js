import styled from "styled-components"
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import Assento from "../../components/Assento";
import Comprador from "../../components/Comprador";
import Caption from "./Caption";
import Footer from "./Footer";

export default function SeatsPage({assentos, setAssentos, dia, setDia,
        data, setData, horario, setHorario, filme, setFilme, listaCompradores,
        setListaCompradores, assentosReservados, setAssentosReservados}) {

    const {assentoId} = useParams();
    const navigate = useNavigate();

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

        const idAssentos = [];
        const infosCompradores = listaCompradores.map(comprador => {
            idAssentos.push(Number(comprador.id));
            return ({idAssento: Number(comprador.id), nome: comprador.nome, cpf: comprador.cpf})
        })

        const postSucesso = {ids: idAssentos, compradores: infosCompradores};
        // console.log(postSucesso);
        const url = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
        const promisseSucesso = axios.post(url, postSucesso);
        promisseSucesso.then(() => {
            navigate("/sucesso");
        })

        promisseSucesso.catch((err) => {
            console.log(err)
        })
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
                <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>
            </FormCompradores>

            <Footer posterURL={filme.posterURL} title={filme.title} dia={dia} horario={horario}></Footer>

        </PageContainer>
    )
}
const FormCompradores = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
        margin: auto 0px;
        align-self: center;
        margin-bottom: 22px;
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