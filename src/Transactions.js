import axios from "axios";

const REACT_APP_API_URL = "http://localhost:5000";

export function createTransaction(body, type, token) {
  const transaction = {
    ...body,
    type,
  };

  const response = axios
    .post(`${REACT_APP_API_URL}/transactions`, transaction, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return err.response;
    });
  return response;
}

export function findAllTransactions(token) {
  const response = axios
    .get(`${REACT_APP_API_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      return err.response;
    });

  return response;
}
