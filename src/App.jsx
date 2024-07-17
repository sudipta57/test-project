import { useState } from "react";
import "./App.css"; // We'll style the matrix later

const Matrix = () => {
  const [matrix, setMatrix] = useState(Array(3).fill(Array(3).fill("")));
  const [clickOrder, setClickOrder] = useState([]);
  const [allClicked, setAllClicked] = useState(false);

  const handleClick = (rowIndex, colIndex) => {
    if (allClicked) return;

    const newMatrix = matrix.map((row, rIdx) =>
      row.map((col, cIdx) => {
        if (rIdx === rowIndex && cIdx === colIndex) {
          return "green";
        }
        return col;
      })
    );

    const newClickOrder = [...clickOrder, [rowIndex, colIndex]];

    setMatrix(newMatrix);
    setClickOrder(newClickOrder);

    if (newClickOrder.length === 9) {
      setAllClicked(true);
      changeToOrange(newClickOrder);
    }
  };

  const changeToOrange = (clickOrder) => {
    clickOrder.forEach(([rowIndex, colIndex], index) => {
      setTimeout(() => {
        setMatrix((prevMatrix) =>
          prevMatrix.map((row, rIdx) =>
            row.map((col, cIdx) => {
              if (rIdx === rowIndex && cIdx === colIndex) {
                return "orange";
              }
              return col;
            })
          )
        );
      }, index * 500);
    });
  };

  return (
    <div className="matrix">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((col, colIndex) => {
            console.log(col);
            return (
              <div
                key={colIndex}
                className={`box ${col}`}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {col}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Matrix;
