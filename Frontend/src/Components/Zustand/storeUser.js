import { create } from 'zustand';

// Recupera o estado inicial do localStorage, se disponível
const getStoredState = () => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  return {
    usuario: storedUser ? JSON.parse(storedUser) : {
      userId: '',
      name: '',
      email: '',
      telefone: '',
      endereco: '',
      isAdm: ''
    },
    token: storedToken || '',
    isAuthenticated: !!storedToken,
  };
};

const useUserStore = create((set) => ({
  ...getStoredState(),
  setUser: (novosDados) => set((state) => {
    const updatedUser = { ...state.usuario, ...novosDados };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return {
      usuario: updatedUser,
      isAuthenticated: true,
    };
  }),
  setToken: (newToken) => {
    localStorage.setItem('token', newToken);
    set({ token: newToken, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({
      usuario: {
        userId: '',
        name: '',
        email: '',
        telefone: '',
        endereco: ''
      },
      token: '',
      isAuthenticated: false
    });
  },
}));

export default useUserStore;
