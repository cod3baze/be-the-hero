import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

function Register() {
  function handleRegister(e) {
    e.preventDefault();
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu acadastro,  entre na plataforma ajude pessoas a encontrarem os casos da sua ONG.</p>
        
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Não tenho cadastro.
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Nome da ONG"/>
          <input type="email" placeholder="E-mail"/>
          <input type="text" placeholder="Whatsapp"/>

          <div className="input-group">
            <input type="text" placeholder="Cidade"/>
            <input type="text" placeholder="UF" style={{ width: 80 }} />
          </div>

          <button className="button" type="submit">Cadastart</button>
        </form>
      </div>
    </div>
  );
}


export default Register
