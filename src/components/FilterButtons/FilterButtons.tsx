// FilterButtons.tsx
import React from "react";
import { FilterButtonsProps } from "../../types/types";

export default function FilterButtons({
  filter,
}: FilterButtonsProps): JSX.Element {
  return (
    <div className="filter-buttons">
      <button onClick={() => filter("all")}>All</button>
      <button onClick={() => filter("active")}>Active</button>
      <button onClick={() => filter("completed")}>Completed</button>
    </div>
  );
}
