import "./cursor.css";
import MousePosition from "../../hooks/MousePosition";

const Cursor = () => {
  // 1.
  const { x, y } = MousePosition();
  return (
    <>
      {/* 2. */}
      <div style={{ left: `${x}px`, top: `${y}px` }} className="ring"></div>
      {/* 3. */}
    </>
  );
};

export default Cursor;
