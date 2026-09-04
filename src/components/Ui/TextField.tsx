import React from "react";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  isRequired?: boolean;
  error?: string;
};

function TextField({
  type = "text",
  label,
  name,
  dir = "rtl",
  isRequired,
  error,
  className,
  ...rest
}: TextFieldProps) {
  return (
    <div className="textField flex flex-col gap-1.5 w-full">
      {label && (
        <label 
          htmlFor={name} 
          className="text-sm font-medium text-secondary-700 dark:text-secondary-300"
        >
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        type={type}
        name={name}
        id={name}
        dir={dir}
        className={`
          w-full h-9 px-4 rounded-lg border shadow-sm font-medium transition-all duration-300 ease-out 
          outline-none focus-visible:ring-[3px] dark:bg-[#222222]
          ${dir === "ltr" ? "text-left" : "text-right"}
          ${className ?? ""}
          ${error
            ? "border-red-500 text-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20 dark:border-red-500 dark:text-red-400 dark:focus-visible:ring-red-500/20 placeholder:text-red-300"
            : "border-[#E5E5E5] hover:border-primary-500 focus-visible:border-primary-500 focus-visible:ring-neutral-500/20 dark:border-[#424141] dark:focus-visible:border-neutral-600 dark:focus-visible:ring-neutral-600/20 text-secondary-900 dark:text-secondary-100"
          }
        `}
        {...rest}
      />
      
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 font-medium animate-in fade-in slide-in-from-top-1 duration-200 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default TextField;