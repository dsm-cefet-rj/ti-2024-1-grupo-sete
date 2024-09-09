import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { Card } from "reactstrap";
import { DateRange } from "react-date-range";
import { format } from "date-fns/format";
import { addDays, eachDayOfInterval } from "date-fns";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import useAluguelStore from "../Zustand/storeAluguel";
import { pt } from "date-fns/locale";
import "./style.css";

/**
 * Componente de pesquisa de carros para aluguel que permite selecionar a cidade e o intervalo de datas.
 * @component
 * @returns {JSX.Element} Retorna um elemento JSX que contém um campo de busca para a cidade e um seletor de intervalo de datas.
 */
export default function BarraPesquisa() {
  const setBusca = useAluguelStore((state) => state.setBuscar);
  const busca = useAluguelStore((state) => state.buscar);
  const [digita, setDigita] = useState(busca);
  const [carros, setCarros] = useState([]);
  

  /**
   * Função para lidar com mudanças no campo de busca de cidade.
   * @param {Object} event - O evento do campo de entrada.
   */
  const onChange = (event) => {
    setDigita(event.target.value);
  }

  /**
   * Função para definir o termo de busca e ativar a busca na aplicação.
   * @param {string} searchTerm - O termo de busca selecionado ou digitado.
   */
  const onSearch = (searchTerm) => {
    setDigita(searchTerm);
    setBusca(searchTerm);
    console.log('Qual cidade', busca);
  }

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection'
    }
  ]);

  const setDiasAluguel = useAluguelStore((state) => state.setDiasAluguel);
  const [open, setOpen] = useState(false);
  const refOne = useRef(null);

  /**
   * Hook useEffect para adicionar eventos de teclado e clique, e calcular os dias de aluguel.
   */
  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);

    const startDate = range[0].startDate;
    const endDate = range[0].endDate;
    const dias = eachDayOfInterval({ start: startDate, end: endDate });
    setDiasAluguel(dias);
  }, [range]);

  /**
   * Função para fechar o calendário ao pressionar a tecla "Escape".
   * @param {Object} e - O evento de teclado.
   */
  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  }

  /**
   * Função para fechar o calendário ao clicar fora dele.
   * @param {Object} e - O evento de clique.
   */
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
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
              <button className="botaoBuscaPesquisa" onClick={() => onSearch(digita)}> Buscar </button>
            </div>
          </div>
          <div className="dropdown">
            {[...new Set(carros.map(item => item.cidade))]
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
              onClick={() => setOpen(open => !open)}
            />
            <div ref={refOne}>
              {open &&
                <DateRange
                  onChange={item => { setRange([item.selection]); }}
                  editableDateInputs={true}
                  minDate={new Date()}
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
  );
}
