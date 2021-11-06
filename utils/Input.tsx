import { useEffect, useState } from "react";
import { Input as BaseInput } from "reactstrap";
import { InputType } from "reactstrap/types/lib/Input";

export function Input({
  id,
  type,
  className,
  placeholder,
  validate,
  onValue,
  disabled,
  value: initValue,
}: {
  id: string;
  type: InputType;
  className?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  validate: (value: string) => boolean;
  onValue: (value: string) => unknown;
}) {
  const [value, setValue] = useState(initValue ?? "");
  const [hasError, setError] = useState(false);

  const valid = validate(value);

  useEffect(() => {
    if (valid) onValue(value);
  });

  return (
    <BaseInput
      id={id}
      type={type}
      placeholder={placeholder}
      className={className}
      disabled={disabled ?? false}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => setError(!valid)}
      onFocus={() => setError(false)}
      invalid={hasError}
      valid={valid}
      defaultValue={initValue}
    />
  );
}
