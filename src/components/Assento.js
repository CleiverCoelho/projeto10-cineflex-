import styled from "styled-components"

export default function({id, isAvailable, name, assentos, setAssentosReservados, setAssentos, assentosReservados}){

    console.log(assentosReservados);

    function selecionarAssento (id, isAvailable){
        
        const assentosFor = [...assentos];
        assentosFor.forEach( assento => {
            if(assento.id === id){
                if(assento.isAvailable){
                    assento.isAvailable = false;
                    setAssentosReservados([...assentosReservados, id])
                }else if(!isAvailable && assentosReservados.includes(id)){
                    assento.isAvailable = true;
                    const tirarReserva = assentosReservados.filter( idAss => id !== idAss);
                    setAssentosReservados(tirarReserva);
                }
            }
        })
    
        setAssentos(assentosFor);
    }

    function verificarSelecionado(id, propriedadeCSS){

        const verdeClaro = "#1AAE9E";
        const verdeEscuro = "#0E7D71";

        const amareloEscuro = "#F7C52B";
        const amareloClaro = "#FBE192"

        if(assentosReservados.includes(id)){
            if(propriedadeCSS === "borda"){
                return verdeEscuro;
            }else{
                return verdeClaro;
            }
        }else{
            if(propriedadeCSS === "borda"){
                return amareloEscuro;
            }else{
                return amareloClaro;
            }
        }
    }
    
    
    return (
        <SeatItem 
            color={isAvailable ? "#C3CFD9": verificarSelecionado(id, "color")} 
            borda={isAvailable ? "#7B8B99" : verificarSelecionado(id, "borda")}
            onClick={() => selecionarAssento(id, isAvailable)}
            
            >
                {name} 
        </SeatItem>
    )
}


const SeatItem = styled.div`
    border: 1px solid ${(props) => props.borda};         // Essa cor deve mudar
    background-color: ${(props) => props.color};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`