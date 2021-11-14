import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Badge,
  Button,
} from "reactstrap";
import { Plus, X } from "react-bootstrap-icons";
import { without } from "ramda";

interface Category {
  id: string;
  label: string;
}

function Chip({ id, label, onDelete }: Category & { onDelete: () => void }) {
  return (
    <span className="badge chip bg-info py-1 pe-0 me-1 fs-6">
      {label}
      <Button onClick={onDelete} className="p-0 ms-3 text-white" color="info">
        <X size={25} className="me-0" />
      </Button>
    </span>
  );
}

export function CategoryPicker({
  selected,
  all,
  setSelected,
  label,
}: {
  selected: Category[];
  all: Category[];
  setSelected: (newValue: Category[]) => void;
  label: string;
}) {
  const [open, toggle] = useState(false);
  const available = all.filter((c) => !includes(c, selected));

  return (
    <div className="mb-3">
      <label>{label}</label>
      <div className="form-control">
        {selected.map((p, i) => (
          <Chip
            key={i}
            id={p.id}
            label={p.label}
            onDelete={() => setSelected(without([p], selected))}
          />
        ))}
        {
          <Dropdown tag="span" isOpen={open} toggle={() => toggle(!open)}>
            {available.length > 0 && (
              <DropdownToggle
                color="white"
                size="sm"
                className="d-inline-block p-0 btn-link"
              >
                <Plus width={25} height={25} />
              </DropdownToggle>
            )}
            <DropdownMenu>
              {available.map((v, i) => (
                <DropdownItem
                  key={i}
                  onClick={() => setSelected([...selected, v])}
                >
                  {v.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        }
      </div>
    </div>
  );
}

function includes(category: Category, categories: Category[]) {
  return categories.some((c) => c.id === category.id);
}
