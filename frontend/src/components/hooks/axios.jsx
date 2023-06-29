import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../hooks/Auth";

const BASE_URL = "http://realworld-demo.com";

// axios.create()メソッドを使用して、デフォルトのaxiosインスタンスを作成
export default axios.create({ baseURL: BASE_URL });

export const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const useAxios = () => {
  const { auth } = useContext(AuthContext);

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
  });

  return instance;
};
