import FiatUno21 from '../../Assets/Fiat-uno21.jpg';
import FiatUno22 from '../../Assets/fiat-uno22.jpg';
import FordKa from '../../Assets/FordKa.jpg';
import FordKa2 from '../../Assets/FordKa2.jpg';
import Bmw from '../../Assets/bmw.png';
import Bmw2 from '../../Assets/bmw2.JPG';
import Mercedes from '../../Assets/Mercedes.jpg';
import Mercedes2 from '../../Assets/Mercedes2.jpg';
import FiatUno from '../../Assets/fiat-uno.jpg';
import FiatUno2 from '../../Assets/Fiat-uno2.jpg';
import Tesla from '../../Assets/Tesla.jpg';
import Tesla2 from '../../Assets/Tesla2.jpg'
import Honda from '../../Assets/honda.jpg';
import Honda2 from '../../Assets/Honda2.jpeg';
 
const carros = {
   1: {
        Image: "https://dicas.olx.com.br/wp-content/uploads/2024/03/cores-de-carros.jpg",
        Image2: FiatUno2,
        modelo: "Fiat Uno",
        ano: "2014",
        dono: "Julio Cesar Mendonça",
        cidade: "Rio de Janeiro, RJ",
        preco: 120.00,
        detalhe: "Direção hidráulica, Rádio e bluetooth, , consumo médio 13km/l e câmbio manual",
        diasAlugado: [
            "10/06/2024", "11/06/2024", "12/06/2024", "13/06/2024", "14/06/2024",
            "16/05/2024", "18/05/2024", "22/05/2024", "25/05/2024", "27/05/2024",
            "02/06/2024", "05/06/2024", "07/06/2024", "16/06/2024", "20/06/2024"
          ]
    },

    2: {
        Image: FordKa,
        Image2: FordKa2,
        modelo: "Ford Ka",
        ano: "2017",
        dono: "Augusto Neves",
        cidade: "Mogi das Cruzes, SP",
        preco: 180.00,
        detalhe: "Direção Elétrica, rádio e bluetooth, motor 1.0, câmbio manual e consumo médio de 14km/l",
        diasAlugado: [
            "10/06/2024", "11/06/2024", "12/06/2024", "13/06/2024", "14/06/2024",
            "16/05/2024", "18/05/2024", "22/05/2024", "25/05/2024", "27/05/2024",
            "02/06/2024", "05/06/2024", "07/06/2024", "16/06/2024", "20/06/2024"
          ]
    },

    3: {
        Image: Mercedes,
        Image2: Mercedes2,
        modelo: "Mercedes",
        ano: "2021",
        dono: "Rogério Teixeira",
        cidade: "Volta Redonda, RJ",
        preco: 450.00,
        detalhe: "Direção autônoma, sistema multimídia MBUX, motor 2.0, câmbio automático e consumo médio de 12km/l",
        diasAlugado: [
            "10/06/2024", "11/06/2024", "12/06/2024", "13/06/2024", "14/06/2024",
            "16/05/2024", "18/05/2024", "22/05/2024", "25/05/2024", "27/05/2024",
            "02/06/2024", "05/06/2024", "07/06/2024", "16/06/2024", "20/06/2024"
          ]
    },

    4: {
        Image: Bmw,
        Image2: Bmw2,
        modelo: "BMW",
        ano: "2013",
        dono: "Marcos Pimentel",
        cidade: "Florianópolis, SC",
        preco: 690.00,
        detalhe: "Direção elétrica, Central Multimídia 7 polegadas conexão Android Auto e Apple CarPlay, Automática com modo manual de 8 marchas, motor 2.0 e consumo médio de 12km/l",
        diasAlugado: [
            "10/06/2024", "11/06/2024", "12/06/2024", "13/06/2024", "14/06/2024",
            "16/05/2024", "18/05/2024", "22/05/2024", "25/05/2024", "27/05/2024",
            "02/06/2024", "05/06/2024", "07/06/2024", "16/06/2024", "20/06/2024"
          ]
    },

    5: {
        Image: Honda,
        Image2: Honda2,
        modelo: "Honda Civic",
        ano: "2014",
        dono: "Reinaldo Barbosa",
        cidade: "Rio de Janeiro, RJ",
        preco: 300.00,
        diaAlugadoInicio: "01/06/2024",
        diaAlugadoFinal: "01/07/2024",
        consumoEstrada: "15 km/L",
        consumoCidade: "13km/L",
        motor: "2.0",
        cambio: "Automático",
        multimidia: "Central Multimídia 7 polegadas conexão Android Auto e Apple CarPlay",
        detalhe: "Controle adaptativo de velocidade de cruzeiro",
        diasAlugado: [
            "10/06/2024", "11/06/2024", "12/06/2024", "13/06/2024", "14/06/2024",
            "16/05/2024", "18/05/2024", "22/05/2024", "25/05/2024", "27/05/2024",
            "02/06/2024", "05/06/2024", "07/06/2024", "16/06/2024", "20/06/2024"
          ]
    },

    6: {
        Image: Tesla,
        Image2: Tesla2,
        modelo: "Tesla",
        ano: "2022",
        dono: "Matheus Oliveira",
        cidade: "São Paulo, SP",
        preco: 17000.00,
        diaAlugadoInicio: "01/04/2024",
        diaAlugadoFinal: "01/05/2024",
        consumoEstrada: "17,5 kWh/100km",
        consumoCidade: "17,5 kWh/100km",
        motor: "2.0",
        cambio: "Automático",
        multimidia: "Central Multimídia 12 polegadas",
        detalhe: "Sistema Autopilot",
        diasAlugado: [
            "10/06/2024", "11/06/2024", "12/06/2024", "13/06/2024", "14/06/2024",
            "03/05/2024", "06/05/2024", "09/05/2024", "15/05/2024", "19/05/2024",
            "01/06/2024", "04/06/2024", "08/06/2024", "21/06/2024", "25/06/2024"
          ]
    },

    7: {
        Image: FiatUno21,
        Image2: FiatUno22,
        modelo: "Fiat Uno",
        ano: "2017",
        dono: "José Castro",
        cidade: "Campinas, SP",
        preco: 150.00,
        diaAlugadoInicio: "12/10/2024",
        diaAlugadoFinal: "12/11/2024",
        consumoEstrada: "14 km/L",
        consumoCidade: "11km/L",
        motor: "1.0",
        cambio: "Manual",
        multimidia: "Rádio e bluetooth",
        detalhe: "Direção elétrica",
        diasAlugado: ["10/06/2024","11/06/2024","12/06/2024", "13/06/2024","14/06/2024"]
        
    },
};

export default carros;
