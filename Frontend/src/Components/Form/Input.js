import './Input.css'

/**
 * Componente de input reutilizável para formulários.
 * @component
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.type - Tipo do input (ex: "text", "password", "email").
 * @param {string} props.text - Texto do rótulo associado ao input.
 * @param {string} props.name - Nome do input, utilizado para o atributo `name` e `id`.
 * @param {string} props.placeholder - Texto exibido quando o input está vazio.
 * @param {Function} props.handleOnChange - Função chamada quando o valor do input muda.
 * @param {string} props.value - Valor atual do input.
 * @returns {JSX.Element} Retorna um campo de input estilizado com um rótulo.
 */
function Input({ type, text, name, placeholder, handleOnChange, value }) {
    return (
        <div className="form_control">
            <label htmlFor={name}>{text}:</label>
            <input 
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={handleOnChange}
            value={value}/>
        </div>
    )
}

export default Input