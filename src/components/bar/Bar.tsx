import Hamburger from "../hamburger/Hamburger";
import { actions } from "../../data/buttonList";

function Bar() {

  function createButtons() {
    return (
      actions.map((action) => (
        <button key={action.label} disabled={action.disabled} hidden={action.hidden}>
          {action.label}
        </button>
      ))
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