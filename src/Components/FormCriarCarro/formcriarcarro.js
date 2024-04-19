function formcriarcarro() {
    return(
        <form>
            <input type="text" placeholder="Insira o seu nome" />
            <input type="text" placeholder="Insira o modelo do carro"/>
            <input type="text" placeholder="Insira o ano de fabricação"/>
            <input type="text" placeholder="Insira o custo por dia de aluguel"/>
            <input type="text" placeholder="Insira o tipo de câmbio"/>
            <div>
                <input type="submit" value="Cadastrar carro" />
            </div>
        </form>
    )
}

export default formcriarcarro