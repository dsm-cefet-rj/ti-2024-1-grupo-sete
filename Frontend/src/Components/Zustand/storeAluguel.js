import { create } from 'zustand';

/**
 * Cria e exporta um store Zustand para gerenciar o estado relacionado a aluguéis de carros.
 * O store gerencia o estado global da aplicação, incluindo dados sobre a busca, informações do carro, 
 * período de aluguel, dados do usuário e registros de aluguéis.
 * @typedef {Object} AluguelStore
 * @property {string} buscar - Termo de busca atual para carros.
 * @property {string|null} carroId - ID do carro selecionado.
 * @property {Date[]} diasAluguel - Intervalo de datas selecionado para o aluguel.
 * @property {Object} dados - Dados relacionados ao aluguel do carro.
 * @property {string|null} dados.carro - Modelo do carro selecionado.
 * @property {string} dados.nome - Nome do usuário.
 * @property {number|null} dados.valorDiario - Valor diário do aluguel do carro.
 * @property {number} dados.quantDias - Quantidade de dias para o aluguel.
 * @property {string} dados.formPagamento - Método de pagamento escolhido.
 * @property {Object[]} registros - Lista de registros de aluguéis.
 * @property {Function} setBuscar - Função para atualizar o termo de busca.
 * @property {Function} setCarroId - Função para atualizar o ID do carro selecionado.
 * @property {Function} setDiasAluguel - Função para atualizar o intervalo de datas de aluguel.
 * @property {Function} setDados - Função para atualizar os dados do aluguel.
 * @property {Function} adicionarRegistro - Função para adicionar um novo registro de aluguel.
 */

/**
 * Cria o store Zustand com o estado e funções relacionadas ao gerenciamento de aluguéis de carros.
 * @returns {AluguelStore} O store Zustand com o estado e funções para gerenciar aluguéis.
 */
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
