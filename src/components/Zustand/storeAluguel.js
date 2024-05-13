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
  setBuscar: (busca) => set({ buscar: busca }),
  setCarroId: (carro) => set({ carroId: carro }),
  setDiasAluguel: (dias) => set({ diasAluguel: dias }),
  setDados: (novosDados) => set((state) => ({ dados: { ...state.dados, ...novosDados } })),
  registros: [{
    carro: 'Ford KA',
    nome: 'João da Silva',
    valorDiario: 500,
    quantDias: 4,
    formPagamento: 'Pix',
  },
  {
    carro: 'Ford Fiesta',
    nome: 'João da Silva',
    valorDiario: 300,
    quantDias: 2,
    formPagamento: 'Cartão',
  },],
  adicionarRegistro: (novoRegistro) => set((state) => ({ registros: [...state.registros, novoRegistro] })),
}));


export default useAluguelStore;
