import React, { useEffect, useState } from "react";
import { Button, Col, Input as BaseInput, Row } from "reactstrap";

export function Editable({
  value,
  onChange,
  label,
  multiline,
  pattern,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  multiline?: boolean;
  pattern?: RegExp;
}) {
  const [newValue, setValue] = useState(value ?? "");

  useEffect(() => {
    setValue(value);
  }, [value]);

  const valid = pattern ? pattern.test(newValue) : true;

  const [hasError, setError] = useState(!valid);

  return (
    <div className="mb-3">
      <label htmlFor="code1">{label}</label>

      <BaseInput
        className="form-control"
        id="code1"
        type={multiline ? "textarea" : "text"}
        placeholder=""
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setError(!valid)}
        onFocus={() => setError(false)}
        invalid={hasError}
        value={newValue}
      />
      {newValue !== value && (
        <div>
          <Button
            color="primary"
            size="sm"
            className="mt-1 me-1"
            onClick={() => {
              if (!valid) {
                setError(true);
                return;
              }
              onChange(newValue);
            }}
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
