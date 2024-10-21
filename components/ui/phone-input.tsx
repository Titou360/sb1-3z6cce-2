import React, { forwardRef } from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (value: string) => void;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, ...props }, ref) => {
    return (
      <ReactPhoneInput
        country={'us'}
        value={value}
        onChange={onChange}
        inputProps={{
          ...props,
          ref: ref,
        }}
      />
    );
  }
);

PhoneInput.displayName = 'PhoneInput';