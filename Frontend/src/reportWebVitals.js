/**
 * Função para medir e relatar métricas de desempenho da aplicação.
 * Esta função importa dinamicamente o módulo 'web-vitals' e utiliza suas funções para medir métricas de desempenho
 * Se uma função de callback ('onPerfEntry') for fornecida, ela será chamada com os valores das métricas coletadas.
 * @param {Function} onPerfEntry - Função de callback que será chamada com os valores das métricas de desempenho.
 * Se não for uma função, nada será feito.
 * @returns {void}
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
