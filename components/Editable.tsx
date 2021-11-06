import React, { useEffect, useState } from "react";
import { Button, Col, Input as BaseInput, Row } from "reactstrap";

export function Editable({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  const [newValue, setValue] = useState(value ?? "");

  useEffect(() => {
    setValue(value);
  }, [value]);

  const valid = newValue.length > 3;

  const [hasError, setError] = useState(!newValue);

  return (
    <>
      <label htmlFor="code1">{label}</label>

      <BaseInput
        className="form-control"
        id="code1"
        type="text"
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
    </>
  );
}
