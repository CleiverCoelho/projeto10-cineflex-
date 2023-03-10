import styled from "styled-components"

export default function({id, isAvailable, name, assentos, 
    setAssentosReservados, setAssentos, assentosReservados,
    setListaCompradores, listaCompradores}){

    // console.log(assentosReservados);

    function selecionarAssento (name, isAvailable){
        
        if(!isAvailable && !assentosReservados.includes(name)){
            alert("Esse assento não está disponivel");
            return null;
        }

        const assentosFor = [...assentos];
        assentosFor.forEach( assento => {
            if(assento.name === name){
                if(assento.isAvailable){
                    assento.isAvailable = false;
                    setAssentosReservados([...assentosReservados, name])
                    // coloca na lista de compradores
                    const objComprador = {nome: "", cpf: "", id: name}
                    setListaCompradores([...listaCompradores, objComprador])
                }else if(!isAvailable && assentosReservados.includes(name)){
                    assento.isAvailable = true;
                    const tirarReserva = assentosReservados.filter( idAss => name !== idAss);
                    setAssentosReservados(tirarReserva);
                    //retira objComprador da lista de compradores
                    const tiraComprador = listaCompradores.filter((objComprador) => name !== objComprador.id)
                    setListaCompradores([...tiraComprador]);
                }
            }
        })

        // seta assentos para renderizar mudanças na tela
        setAssentos(assentosFor);
    }

    function verificarSelecionado(name, propriedadeCSS){

        const verdeClaro = "#1AAE9E";
        const verdeEscuro = "#0E7D71";

        const amareloEscuro = "#F7C52B";
        const amareloClaro = "#FBE192"

        if(assentosReservados.includes(name)){
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
            color={isAvailable ? "#C3CFD9": verificarSelecionado(name, "color")} 
            borda={isAvailable ? "#7B8B99" : verificarSelecionado(name, "borda")}
            onClick={() => selecionarAssento(name, isAvailable)}
            
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