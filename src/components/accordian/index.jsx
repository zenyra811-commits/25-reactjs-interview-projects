//single selection
//multiple selection

import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    // Use functional updater for safety and immutability
    setMultiple((prev) =>
      prev.includes(getCurrentId) ? prev.filter((x) => x !== getCurrentId) : [...prev, getCurrentId]
    );
  }

  return (
    <div className="acc-wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => {
            const isOpen = enableMultiSelection
              ? multiple.includes(dataItem.id)
              : selected === dataItem.id;

            return (
              <div className="item" key={dataItem.id}>
                <div
                  onClick={() =>
                    enableMultiSelection
                      ? handleMultiSelection(dataItem.id)
                      : handleSingleSelection(dataItem.id)
                  }
                  className="title"
                >
                  <h3>{dataItem.question}</h3>
                  <span>{isOpen ? "-" : "+"}</span>
                </div>

                {isOpen && <div className="acc-content ">{dataItem.answer}</div>}
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}