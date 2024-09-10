import { useParams, Link } from 'react-router-dom';
import HeaderMain from "../../Components/Header";
import { useState } from 'react';
import Footer from "../../Components/Footer/footer";
import "./style.css"; 
import useUserStore from "../../Components/Zustand/storeUser";
import { Button } from "reactstrap";
import styles from "../Atualizardadoscarro/Atualizardadoscarro.module.css";
import FormUser from '../FormUser/FormUser';
import { updateUserByUser } from '../Services/userServices';
import { ToastContainer, toast } from 'react-toastify';

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
  const [showUserForm, setShowUserForm] = useState(false);

  function toggleUserForm() {
    setShowUserForm(!showUserForm);
  }

  async function editPost(user) {
    try {
      let body = {
        name: user.name,
        email: user.email,
        telefone: user.telefone,
        endereco: user.endereco
      };
      console.log("\n\nBody:", body);
      const response = await updateUserByUser(user.id, body);
      console.log("\n\nUPDATE USER", response);
      setShowUserForm(false);
      toast.success('Seu usuário foi atualizado com sucesso!',
        {
          position: "top-center",
          autoClose: 2700,
          containerId: "shared-toast-container"
        }
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000); 
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error("Erro ao editar usuário:", error.response.data.message);
      toast.error('Erro ao atualizar usuário. Tente novamente mais tarde.');
    }
  }

  return (
    <div className="page-container">
      <HeaderMain />
      <div className="profile">
        <h1>Perfil</h1>
      </div>
      <div className="profile-container">
        {!showUserForm ? (
          <div className="col-lg-4 col-xl-3">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-9">
                    <h6 className="mb-0">Nome</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user.name}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-9">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user.email}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-9">
                    <h6 className="mb-0">Telefone</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user?.telefone}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-9">
                    <h6 className="mb-0">Endereço</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user.endereco}
                  </div>
                </div>
                <div className="row"></div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="button-config">
                      <Button onClick={toggleUserForm}> Editar conta</Button>
                    </div>
                    <div className="row"></div>
                    <div className="button-config">                   
                      <a className="btn btn-danger btn-sm" target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Excluir conta</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.carro_info}>
            <FormUser handleSubmit={editPost} botaotxt={"Concluir edição"} userData={user} />
          </div>
        )}
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
