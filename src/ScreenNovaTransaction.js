import styled from "styled-components"
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { AuthContext } from "./AuthContext";
import { createTransaction } from "./Transactions";

export default function Transactions(props) {
    const { type } = useParams();
    const [form, setForm] = useState({});
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    function handleForm({ value, name }) {
        setForm({
            ...form,
            [name]: value,
        });
    }

    function handleSendForm(e) {
        e.preventDefault();
        createTransaction(form, type, token).then((res) => {
            navigate("/home");
        });
    }

    return (
        <Nova>
            <MiniMenu>
                <p>Nova  {type}</p>
            </MiniMenu>
            <input data-test="registry-amount-input"
                placeholder="Valor"
                name="value"
                type="text"
                onChange={(e) =>
                    handleForm({
                        name: e.target.name,
                        value: e.target.value,
                    })
                }
            />
            <input data-test="registry-name-input"
                placeholder="Descrição"
                name="description"
                type="text"
                onChange={(e) =>
                    handleForm({
                        name: e.target.name,
                        value: e.target.value,
                    })
                }
            />
            <Button data-test="registry-save" onClick={handleSendForm} > <p>Salvar {type}</p>  </Button>
        </Nova>
    )
}

const Nova = styled.div`
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
`
const MiniMenu = styled.div`
width: 326px;
margin-top: 50px;
margin-bottom: 20px;
p{
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 26px;
line-height: 31px;
color: #FFFFFF;
}
`
const Button = styled.div`
width: 326px;
height: 46px;
background: #A328D6;
border-radius: 5px;
display: flex;
align-items: center;
justify-content: center;
p{
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 23px;
color: #FFFFFF;
}
`