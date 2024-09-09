import HeaderMain from "../../Components/Header";
import Footer from "../../Components/Footer/footer";
import "./style.css"; 
import useUserStore from "../../Components/Zustand/storeUser";
import { Button } from "reactstrap";

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