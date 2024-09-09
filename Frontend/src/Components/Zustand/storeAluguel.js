import { create } from 'zustand';


const useAluguelStore = create((set) => ({
  buscar: "",
  carroId: null,
  diasAluguel: [],
  dados: {
    carro: null,
    nome: "João da Silva",
    valorDiario: null,
    quantDias: 0,
    formPagamento: "Cartão",
  },
  setBuscar: (busca) => set({buscar: busca}),
  setCarroId: (carro) => set({ carroId: carro }),
  setDiasAluguel: (dias) => set({ diasAluguel: dias })
}));


export default useAluguelStore;
