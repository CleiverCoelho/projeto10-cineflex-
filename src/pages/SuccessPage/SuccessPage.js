import styled from "styled-components"
import { useNavigate } from "react-router-dom"


export default function SuccessPage({filme, horario, data, listaCompradores}) {

    const navigate = useNavigate();

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{filme.title}</p>
                <p>{data} - {horario}</p>
            </TextContainer>

            <TextContainer >
                <strong><p>Ingressos</p></strong>
                {listaCompradores.map(comprador => (
                    <p data-test="seats-info" key={comprador.cpf}>Assento {comprador.id}</p>
                ))}
            </TextContainer>

            <TextContainer>
                <strong><p>Compradores</p></strong>
                {listaCompradores.map((comprador) => {
                    return (
                        <Compradores data-test="client-info" key={comprador.cpf}>
                            <p>Nome: {comprador.nome}</p>
                            <p>CPF: {comprador.cpf}</p>
                        </Compradores>
                    )
                })}
            </TextContainer>

            <button data-test="go-home-btn" onClick={() => navigate("/")}>Voltar para Home</button>
        </PageContainer>
    )
}

const Compradores = styled.div`
    margin-bottom: 9px;
`

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
    p{
        margin-bottom: 5px;
    }
`