import React, { useEffect, useState } from "react";
import { Button, Col, Input as BaseInput, Row } from "reactstrap";
import { InputType } from "reactstrap/types/lib/Input";

export function Editable({
  value,
  onChange,
  label,
  type,
  pattern,
  minLength,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  type?: InputType;
  pattern?: RegExp;
  minLength?: number;
}) {
  const [newValue, setValue] = useState(value ?? "");

  useEffect(() => {
    setValue(value);
  }, [value]);

  let valid = true;

  if (pattern) {
    valid = pattern.test(newValue);
  }

  if (minLength) {
    valid = valid && newValue.length >= minLength;
  }

  const editMode = value !== "";

  const [hasError, setError] = useState(!valid);

  function submit() {
    if (!valid) {
      setError(true);
      return;
    }
    onChange(newValue);
  }

  function onBlur() {
    if (!valid) {
      setError(true);
      return;
    }

    if (!editMode) submit();
  }

  return (
    <div className="mb-3">
      <label>{label}</label>

      <BaseInput
        className="form-control"
        type={type ?? "text"}
        placeholder=""
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        onFocus={() => setError(false)}
        invalid={hasError}
        value={newValue}
        minLength={minLength}
      />
      {editMode && newValue !== value && (
        <div>
          <Button
            color="primary"
            size="sm"
            className="mt-1 me-1"
            onClick={submit}
          >
            تایید
          </Button>
          <Button
            color="none"
            size="sm"
            outline
            onClick={() => setValue(value)}
          >
            انصراف
          </Button>
        </div>
      )}
    </div>
  );
}
