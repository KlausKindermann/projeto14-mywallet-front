import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { AuthContext } from "./AuthContext";
import { signin } from "./Auth";
import { useContext } from "react";

export default function ScreenLogin() {

    const [form, setForm] = useState({});
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);

    function handleForm({ value, name }) {
        setForm({
            ...form,
            [name]: value,
        });
    }

    function handleSendForm(e) {
        e.preventDefault();
        signin(form).then((res) => {
            setToken(res.data.token);
            navigate("/home");
        });
    }

    return (
        <Login>
            <h1> MyWallet </h1>
            <input data-test="email"
                placeholder=" E-mail"
                name="email"
                type="email"
                onChange={(e) =>
                    handleForm({
                        name: e.target.name,
                        value: e.target.value,
                    })
                }
            />
            <input data-test="password"
                placeholder=" Senha"
                name="password"
                type="password"
                onChange={(e) =>
                    handleForm({
                        name: e.target.name,
                        value: e.target.value,
                    })
                }
            />
            <Button data-test="sign-in-submit" onClick={handleSendForm} > <p>Entrar</p>  </Button>
            <Link to={`/cadastro`}>
                <h2>Primeira vez? Cadastre-se!</h2>
            </Link>
        </Login>
    )
}
const Button = styled.div`
width: 326px;
height: 46px;
background: #A328D6;
border-radius: 5px;
display: flex;
align-items: center;
justify-content: center;
p{
width: 59px;
height: 23px;
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 23px;
color: #FFFFFF;
}
`
const Login = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
input{
width: 326px;
height: 58px;
background: #FFFFFF;
border: none;
border-radius: 5px;
margin-bottom: 20px;
font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 23px;
color: #000000;
}
h1{
font-family: 'Saira Stencil One';
font-style: normal;
font-weight: 400;
font-size: 32px;
line-height: 50px;
color: #FFFFFF;
margin-top: 180px;
margin-bottom: 30px;
}
h2{
margin-top: 30px;
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 18px;
color: #FFFFFF;
}
`
