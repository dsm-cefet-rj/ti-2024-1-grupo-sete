import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import "./style.css"; 
import useUserStore from "../../Components/Zustand/storeUser";
import { Button } from "reactstrap";

/**
 * Componente de perfil do usuário, exibindo informações pessoais e opções de configuração.
 * @returns {React.ReactElement} O componente de perfil, que inclui informações do usuário, opções de edição e exclusão de conta, e o cabeçalho e 
 * rodapé da página.
 * @description
 * O componente 'Perfil' utiliza o hook 'useUserStore' para acessar as informações do usuário a partir do estado global.
 * Ele renderiza um layout de perfil com detalhes pessoais, como nome, email, telefone e endereço.
 * O layout inclui:
 * - 'HeaderMain': O cabeçalho da página.
 * - Seção de perfil contendo:
 *   -> Nome do usuário.
 *   -> Email do usuário.
 *   -> Telefone do usuário (opcional).
 *   -> Endereço do usuário.
 *   -> Botões para editar a conta e excluir a conta (o botão de exclusão redireciona para uma URL externa).
 * - 'Footer': O rodapé da página.
 *
 * @component
 */
export default function Perfil() {
  const user = useUserStore((state) => state.usuario);

  return (
    <div className="page-container">
      <HeaderMain />
        <div className="profile">
            <h1>Perfil</h1>
        </div>
    <div className = "profile-container">
        <div class="col-lg-4 col-xl-3">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-9">
                      <h6 class="mb-0">Nome</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {user.name}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-9">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {user.email}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-9">
                      <h6 class="mb-0">Telefone</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {user?.telefone}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-9">
                      <h6 class="mb-0">Endereço</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {user.endereco}
                    </div>
                  </div>
                  <div class="row"></div>
                  <div class="row">
                    <div class="col-sm-12">
                    <div className = "button-config">
                        <Button> Editar conta</Button>
                    </div>
                    <div class="row"></div>
                    <div className = "button-config">                   
                      <a class="btn btn-danger  btn-sm" target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Excluir conta</a>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              </div>



      <footer>
        <Footer />
      </footer>
    </div>
  );
}