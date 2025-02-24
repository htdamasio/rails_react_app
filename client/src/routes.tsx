import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.tsx'
import TicTacToe from "./features/tictactoe/TicTacToe.tsx";
import PostsList from "./features/posts/PostsList.tsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="tic-tac-toe" element={<TicTacToe />}/>
        <Route path="blog" element={<PostsList />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes