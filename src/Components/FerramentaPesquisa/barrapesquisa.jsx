import React, {useState, useRef, useEffect} from "react";
import {Card} from "reactstrap";
import { DateRange } from "react-date-range";
import { format } from "date-fns/format";
import { addDays, eachDayOfInterval } from "date-fns";
import carros from '../Carros/carros';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import useAluguelStore from "../Zustand/storeAluguel";
import { pt } from "date-fns/locale";
import "./style.css";



export default function BarraPesquisa() {
  const setBusca = useAluguelStore((state=> state.setBuscar));
  const busca = useAluguelStore((state=> state.buscar));
    const [digita, setDigita] = useState(busca);
    const onChange = (event) => {
        setDigita(event.target.value);
    }


    const onSearch = (searchTerm) => {
        setDigita(searchTerm);
        setBusca(searchTerm);
        console.log('Qual cidade', busca);
    }

      // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection'
    }
  ])

  const setDiasAluguel = useAluguelStore((state) => state.setDiasAluguel);

    const [open, setOpen] = useState(false)

    // get the target element to toggle 
    const refOne = useRef(null)
    useEffect(() => {
        // event listeners
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    
        // Atualizar os dias entre datas sempre que o intervalo for alterado
        const startDate = range[0].startDate;
        const endDate = range[0].endDate;
        const dias = eachDayOfInterval({ start: startDate, end: endDate });
        setDiasAluguel(dias);
    
      }, [range])

    // hide dropdown on ESC press
    const hideOnEscape = (e) => {
        // console.log(e.key)
        if( e.key === "Escape" ) {
        setOpen(false)
        }
    }

    // Hide on outside click
    const hideOnClickOutside = (e) => {
        // console.log(refOne.current)
        // console.log(e.target)
        if( refOne.current && !refOne.current.contains(e.target) ) {
        setOpen(false)
        }
    }

    return (
      
        <div className="pesquisa">
          <div className="pesquisa-conteudo">
          <h1 className="qual-cidade">Qual cidade e data deseja?</h1>
            <Card className="container-pesquisa">
                <div className="dentro-pesquisa">
                    <h4 className="t4">Cidade</h4> 
                    <div className="organiza">
                      <input type="text" value={digita} onChange={onChange} />
                      <button className= "botaoBuscaPesquisa" onClick={()=>onSearch(digita)}> Buscar </button>
                    </div>
                </div>
                <div className="dropdown">
                {[...new Set(Object.values(carros).map(item => item.cidade))]
                      .filter(cidade => {
                        const searchTerm = digita.toLowerCase();
                        const cidade1 = cidade.toLowerCase();
                        return searchTerm && cidade1.includes(searchTerm) && cidade1 !== searchTerm;
                      })
                      .slice(0, 4)
                      .map(cidade => (
                        <div onClick={() => onSearch(cidade)} className="dropdown-row" key={cidade}>
                          {cidade}
                          <div></div>
                        </div>
                      ))}
                </div>
                <div className="calendarWrap">
                      <h4 className="t4">Dias para alugar</h4>
                      <input
                        value={`${format(range[0].startDate, "dd/MM/yyyy")} ATÉ ${format(range[0].endDate, "dd/MM/yyyy")}`}
                        readOnly
                        className="inputBox"
                        onClick={ () => setOpen(open => !open) }
                      />

                        <div ref={refOne}>
                            {open && 
                                <DateRange
                                    onChange={item => {setRange([item.selection]);
                                                    }}
                                    editableDateInputs={true}
                                    minDate = {new Date()}
                                    moveRangeOnFirstSelection={false}
                                    ranges={range}
                                    months={1}
                                    locale={pt}
                                    direction="horizontal"
                                    className="calendarElement"
                                />
                            }
                        </div>

                </div>


            </Card>
          </div>
        </div>
        
        )
  
}