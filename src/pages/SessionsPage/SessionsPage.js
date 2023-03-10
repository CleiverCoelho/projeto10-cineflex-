import styled from "styled-components"
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SessionsPage() {

    const [sessao, setSessao] = React.useState([undefined])
    const [imageURL, setImageURL] = React.useState("");
    const [tituloFilme, setTituloFIlme] = React.useState("");

    const {filmeId} = useParams();

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${filmeId}/showtimes`;
        const promiseSessoes = axios.get(url);

        promiseSessoes.then((response) => {
            setSessao(response.data.days)
            setImageURL(response.data.posterURL);
            setTituloFIlme(response.data.title);
        })
    }, [])

    if(sessao.length === 0 || sessao === undefined){
        return (
            <>Loading...</>
        )
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {sessao.map( dia => {
                    if(dia === undefined){
                        return null;
                    }
                    return (
                        <SessionContainer key={dia.id}>
                            {dia.weekday} - {dia.date}
                            <ButtonsContainer>
                            {dia.showtimes.map( ({name, id}) => {
                                return (
                                    <Link key={id} to={`/assentos/240/${id}`}>
                                        <button key={id}>{name}</button>
                                    </Link>
                                    
                                )
                            } )}
                            </ButtonsContainer>
                        </SessionContainer>
                    )
                } )}
                

            </div>

            <FooterContainer>
                <div>
                    <img src={imageURL} alt="poster" />
                </div>
                <div>
                    <p>{tituloFilme}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
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