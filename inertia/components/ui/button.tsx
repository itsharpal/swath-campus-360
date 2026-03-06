import React from "react"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit"
  variant?: "primary" | "danger" | "secondary"
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}: ButtonProps) {
  const base = "px-4 py-2 rounded-lg font-medium transition"

  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-200 hover:bg-gray-300",
  }

  return (
    <button type={type} onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  )
}