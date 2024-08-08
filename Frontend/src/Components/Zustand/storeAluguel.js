import { create } from "zustand";
import FordKa from "./../../Assets/FordKa.jpg";
import FiatUno from "./../../Assets/Fiat-uno21.jpg";

const useAluguelStore = create((set) => ({
  buscar: "",
  carroId: null,
  diasAluguel: [],
  dados: {
    carro: null,
    nome: "João da Silva",
    valorDiario: null,
    quantDias: 0,
    formPagamento: "Cartão"
  },
  setBuscar: (busca) => set({ buscar: busca }),
  setCarroId: (carro) => set({ carroId: carro }),
  setDiasAluguel: (dias) => set({ diasAluguel: dias }),
  setDados: (novosDados) =>
    set((state) => ({ dados: { ...state.dados, ...novosDados } })),
  registros: [
    {
      carro: "Ford KA",
      nome: "João da Silva",
      valorDiario: 500,
      quantDias: 4,
      formPagamento: "Pix",
      status: "Alugado",
      imageUrl: FordKa
    },
    {
      carro: "Fiat Uno",
      nome: "João da Silva",
      valorDiario: 300,
      quantDias: 2,
      formPagamento: "Cartão",
      status: "Devolvido",
      imageUrl: FiatUno
    }
  ],
  adicionarRegistro: (novoRegistro) =>
    set((state) => ({ registros: [...state.registros, novoRegistro] })),
  renovarAluguel: (index, dias) =>
    set((state) => {
      const updatedRegistros = [...state.registros];
      updatedRegistros[index] = {
        ...updatedRegistros[index],
        quantDias: updatedRegistros[index].quantDias + dias
      };
      return { registros: updatedRegistros };
    })
}));

export default useAluguelStore;
