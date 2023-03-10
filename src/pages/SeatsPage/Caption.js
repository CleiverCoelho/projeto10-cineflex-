import styled from "styled-components"

export default function Caption (){
    return (
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
    )
}

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