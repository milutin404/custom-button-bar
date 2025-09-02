import Hamburger from "../hamburger/Hamburger";

function Bar() {

  function createButtons() {
    return (
      <div style={{ display: "flex", gap: "8px" }}>
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Hamburger />
      {createButtons()}
    </div>
  );
}

export default Bar;