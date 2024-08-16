import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { mockData as initialMockData } from "~/apis/mock-data";
import Footer from "~/components/Footer/Footer";
import axios from "axios";

const getAPI = () => {
  return axios
    .get("https://66be10c274dfc195586e78a9.mockapi.io/api/questions")
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return [];
    });
};

const getAPI2 = () => {
  return axios
    .get("https://66be10c274dfc195586e78a9.mockapi.io/api/accounts")
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return [];
    });
};

const transformData = (data) => {
  return data.map((item) => ({
    _id: `id-${item.id}`,
    userId: item.accountId,
    questions: item.questions,
    likes: item.like,
    answers: item.answers.map((answer) => ({
      adminId: answer.name,
      answer: answer.answer,
      userName: answer.name,
    })),
  }));
};

function Board() {
  const [board, setBoard] = useState(initialMockData.board);
  const [users, setUsers] = useState(initialMockData.users);

  useEffect(() => {
    const updateMockData = async () => {
      try {
        const questionsData = await getAPI();
        const accountsData = await getAPI2();
        setBoard((prevBoard) => ({
          ...prevBoard,
          columns: transformData(questionsData),
        }));
        setUsers(accountsData);
      } catch (error) {
        console.error("Error updating mock data:", error);
      }
    };

    updateMockData();
  }, []);

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar users={users} />
      <BoardBar board={board} users={users} />
      <BoardContent board={board} users={users} />
      <Footer />
    </Container>
  );
}

export default Board;
