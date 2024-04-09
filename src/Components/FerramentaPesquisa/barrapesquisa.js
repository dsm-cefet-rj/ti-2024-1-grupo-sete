import React, {useState, useRef, useEffect} from "react";
import {Card} from "reactstrap";
import { Calendar } from "react-date-range";
import { format } from "date-fns/format";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
var data = require("../../cidades.json");



export default function BarraPesquisa({busca, setBusca, calendar, setCalendar}) {
    const [digita, setDigita] = useState(busca);
    const onChange = (event) => {
        setDigita(event.target.value);
    }

    const onSearch = (searchTerm) => {
        setDigita(searchTerm);
        setBusca(searchTerm);
        console.log('Qual cidade', busca);
    }

    const [open, setOpen] = useState(false)

    // get the target element to toggle 
    const refOne = useRef(null)

    useEffect(() => {
        // set current date on component load
        setCalendar(format(new Date(), 'dd/MM/yyyy'))
        // event listeners
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

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

        // on date change, store date in state
        const handleSelect = (date) => {
            console.log(date)
            console.log(format(date, 'MM/dd/yyyy'))
            setCalendar(format(date, 'dd/MM/yyyy'))
            
            const exactDateTimestamp = new Date(date).getTime();
            console.log(exactDateTimestamp)
        }
    return (
      
        <div className="pesquisa">
          <div className="pesquisa-conteudo">
            <h1>Qual cidade e data deseja?</h1>
            <Card className="container-pesquisa">
                <div className="dentro-pesquisa">
                    <input type="text" value={digita} onChange={onChange} />
                    <button onClick={()=>onSearch(digita)}> Buscar </button>
                </div>
                <div className="dropdown">
                   {data.filter(item => 
                   {const searchTerm = digita.toLowerCase(); 
                    const cidade = item.cidade.toLowerCase();
                         return searchTerm && cidade.includes(searchTerm) && cidade !== searchTerm              
                })
                .slice(0,4).map((item)=> <div onClick={()=>onSearch(item.cidade)} className="dropdown-row" key = {item.cidade}>
                        {item.cidade}
                        <div></div>
                    </div>)} 
                </div>
                <div className="calendarWrap">

                        <input
                            value={ calendar }
                            readOnly
                            className="inputBox"
                            onClick={ () => setOpen(open => !open) }
                        />

                        <div ref={refOne}>
                            {open && 
                            <Calendar
                                date={ new Date() }
                                minDate={new Date()}
                                onChange = { handleSelect }
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