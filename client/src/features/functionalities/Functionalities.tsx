import { useState } from "react";
import { useNavigate } from "react-router";

interface ProjectItem {
  name : string,
  path : string
}

function Functionalities() {
  const navigate = useNavigate();
  const itens : ProjectItem[] = [
    {
      name: 'Tic-Tac-Toe',
      path: "/tic-tac-toe"

    },
    {
      name: 'RPG',
      path: "/"

    },
    {
      name: 'React on Rails Blog',
      path: "/blog"

    }];
  // const [itens, setItens] = useState<number[]>(Array(12).fill('Tic-Tac-Toe'));
  return (
    <>
      <h1>Functionalities</h1>
      <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around"}}>
        {itens.map((value, index) => (
          <button
            onClick={() => navigate(value.path)}
            key={index}
            // onClick={() => TryPlayPosition(index)}
            className="board-item"
            style={{  
              width:"16rem",
              height:"16rem", 
              borderRadius:"1rem", 
              // background:"blue", 
              margin:"0.5rem",
              // display:"flex",
              // justifyContent:"center",
              // alignItems:"center",
              fontSize:"24px",
              // cursor:"pointer"
            }}
          >
            {value.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default Functionalities;