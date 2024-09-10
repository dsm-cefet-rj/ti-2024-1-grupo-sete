import { useParams, Link } from 'react-router-dom';
import HeaderMain from "../../Components/Header";
import { useState } from 'react';
import Footer from "../../Components/Footer/footer";
import "./style.css"; 
import useUserStore from "../../Components/Zustand/storeUser";
import { Button } from "reactstrap";
import styles from "../Atualizardadoscarro/Atualizardadoscarro.module.css";
import FormUser from '../FormUser/FormUser';
import Message from "../../Components/Message/Message";
import { updateUserByUser } from '../Services/userServices';

export default function Perfil() {
  const user = useUserStore((state) => state.usuario);
  const [showUserForm, setShowUserForm] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

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
      setMessage('Seu usuário foi atualizado com sucesso!');
      setType('success');
      localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      console.error("Erro ao editar usuário:", error.response.data.message);
      setMessage('Erro ao atualizar usuário. Tente novamente mais tarde.');
      setType('error');
    }
  }

  return (
    <div className="page-container">
      <HeaderMain />
      {message && <Message type={type} msg={message} />}

          <Link to={"/atualizarcarro"}>
            <button className={styles.btn}> Voltar </button>
          </Link>
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
                          <Button className={styles.btn} onClick={toggleUserForm}> Editar conta</Button>
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
