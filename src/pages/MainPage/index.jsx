import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Meeting from "../../components/Meeting";
import { getUserData, Token } from "../../api/api";
import Cookies from "js-cookie";
const Container = styled.main`
  width: 100%;
  margin: auto;
`;

const MainPage = () => {
  const navigate = useNavigate();
  const authToken = Token();
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (!authToken) {
      navigate("/signd");
    }
  }, [authToken, navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getUserData("user");
      setUser(response.data);
    } catch (error) {
      if (error.response.status !== 200) {
        Cookies.remove("authToken");
        navigate("/signd");
      }
      console.log("Api 요청 실패");
    }
  };



  return (
    <Container>
      <Meeting user={user} />
    </Container>
  );
};

export default MainPage;
