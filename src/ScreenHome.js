import styled from "styled-components"
import {useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import React from "react";
import { AuthContext } from "./AuthContext";
import { findAllTransactions } from "./Transactions";

export default function ScreenHome() {

    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const { token, setToken } = useContext(AuthContext);

    const navigate = useNavigate();

    async function getTransactions() {
        const res = await findAllTransactions(token);
        setUser(res.data.user);
        setTransactions(res.data.transactions);

        let total = 0;
        res.data.transactions.forEach((transaction) => {
            if (transaction.type === "nova-entrada") {
                total += Number(transaction.value);
            } else {
                total -= Number(transaction.value);
            }
        });

        setTotalBalance(total);
    }

    function newTransaction(type) {
        navigate(`/transactions/${type}`);
    }

    function deslogar(){
        navigate("/");
        setToken("");
    }

    return (
        <Home>
            <MiniMenu>
                <p data-test="user-name" >Olá, {user.name}</p>
                <ion-icon data-test="logout" onClick={deslogar} name="exit-outline"></ion-icon>
            </MiniMenu>
            <Registros>
                <ul>
                    {transactions.map((transaction, index) => (
                        <li key={index}>
                            <div>
                                <span>{transaction.createdAt.substr(0, 5)}</span>
                                <strong data-test="registry-name" >{transaction.description}</strong>
                            </div>

                            <Value data-test="registry-amount" color={transaction.type}>R$ {transaction.value}</Value>
                        </li>
                    ))}
                </ul>
                <article>
                    <span>Saldo</span>
                    <span data-test="total-amount" >R$ {totalBalance}</span>
                </article>
            </Registros>
            <Functions>
                <Action data-test="new-income" onClick={() => newTransaction("nova-entrada")}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova entrada</p>
                </Action>
                <Action data-test="new-expense"  onClick={() => newTransaction("nova-saida")}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova saida</p>
                </Action>
            </Functions>
        </Home>
    )
}

const Home = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const Registros = styled.div`
  width: 326px;
  height: 500px;
  background-color: #fff;
  color: #000;
  border-radius: 0.3rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;
  }
  ul li div span {
    color: #c6c6c6;
    margin-right: 0.7rem;
  }

  article{
    font-size: 1.3rem;
    display: flex;
    justify-content: space-between;
  }
`

const MiniMenu = styled.div`
width: 326px;
display: flex;
justify-content: space-between;
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
ion-icon{
width:23px;
height: 24px;
color: #FFFFFF;
}
`
const Functions = styled.div`
width: 326px;
display: flex;
justify-content: space-between;
margin-top: 20px;
`
const Action = styled.div`
width: 155px;
height: 114px;
background: #A328D6;
border-radius: 5px;
display: flex;
flex-direction: column;
justify-content: space-between;
p{
font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 20px;
color: #FFFFFF;
margin-bottom: 20px;
margin-left: 10px;
}
ion-icon{
width: 23px;
height: 23px;
color:#FFFFFF ;
margin-top: 10px;
margin-left: 10px;
}
`
const Value = styled.div`
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`;