import styled from "styled-components"
import React from "react";

export default function Comprador({listaCompradores, setListaCompradores, 
        nomeComprador, cpfComprador, assentoComprador}){

    const [nome, setNome] = React.useState(nomeComprador)
    const [cpf, setCpf] = React.useState(cpfComprador);

    function setNomeComprador(novoNome){
        setNome(novoNome);

        const edicaoCompradores = [...listaCompradores]
        edicaoCompradores.forEach(comprador => {
            if(comprador.id === assentoComprador){
                comprador.nome = novoNome;
            }
        });
        setListaCompradores(edicaoCompradores);
    }

    function setCpfComprador(novoCpf){  
        setCpf(novoCpf);
        const edicaoCompradores = [...listaCompradores]
        edicaoCompradores.forEach(comprador => {
            if(comprador.id === assentoComprador){
                comprador.cpf = novoCpf;
            }
        })
        setListaCompradores(edicaoCompradores);
    }

    // console.log(listaCompradores.listaCompradores);
    return (
            <FormContainer>
                Nome do Comprador {assentoComprador}:
                <input 
                    type="text"
                    required
                    placeholder="Digite seu nome..."
                    onChange={(event) => setNomeComprador(event.target.value)}
                    value={nomeComprador}
                    />

                CPF do Comprador {assentoComprador}:
                <input 
                    type="text"
                    required
                    placeholder="Digite seu CPF..." 
                    onChange={(event) => setCpfComprador(event.target.value)}
                    value={cpfComprador}
                />
            </FormContainer>
    )
    
}

const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    input {
        width: calc(100vw - 60px);
    }
`