import { useState, useRef, useEffect } from "react";
import { actions } from "../../data/buttonList";

function Hamburger() {
  const [showPanel, setShowPanel] = useState(false);
  const [search, setSearch] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close panel when clicking outside
  useEffect(() => {
    if (!showPanel) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setShowPanel(false);
      }
    }
    document.addEventListener("mouseup", handleClickOutside);
    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, [showPanel]);

  // Focus input when panel opens
  useEffect(() => {
    if (showPanel && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPanel]);

  /**
   * Handles the click event for the hamburger icon.
   */
  const onHamburgerClick = () => {
    setShowPanel(!showPanel);
  };

  /**
   * Handles action click and closes panel.
   */
  function handleAction(message: string) {
    alert(message);
    setShowPanel(false);
  }

  /**
   * Creates the button elements for the panel, filtered by search.
   * @returns JSX.Element
   */
  const createButtons = () => {
    const filtered = actions.filter((action) =>
      !action.hidden &&
      action.label.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <>
        {filtered.length === 0 ? (
          <div style={{ color: "#888", marginTop: "8px" }}>No actions found</div>
        ) : (
          filtered.map((action, idx) => (
            <button
              key={action.label}
              disabled={action.disabled}
              hidden={action.hidden}
              onClick={() => handleAction(action.label)}
              style={{
                display: "block",
                marginTop: idx === 0 ? "8px" : "4px",
              }}
            >
              {action.label}
            </button>
          ))
        )}
      </>
    );
  };

  useEffect(() => {
    function handleHotkey(e: KeyboardEvent) {
      if (e.altKey && (e.key === "h" || e.key === "H")) {
        e.preventDefault();
        setShowPanel(true);
      }
    }
    window.addEventListener("keydown", handleHotkey);
    return () => window.removeEventListener("keydown", handleHotkey);
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div onClick={onHamburgerClick} style={{ cursor: "pointer" }}>
        🍔
      </div>
      {showPanel && (
        <div
          ref={panelRef}
          style={{
            position: "absolute",
            top: "32px",
            left: 0,
            background: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            padding: "16px",
            zIndex: 10,
            minWidth: "120px",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for actions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", marginBottom: "8px" }}
          />
          {createButtons()}
        </div>
      )}
    </div>
  );
}

export default Hamburger;