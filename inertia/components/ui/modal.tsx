import React from "react"

interface ModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ title, isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">

        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">{title}</h2>

          <button onClick={onClose}>✕</button>
        </div>

        {children}

      </div>

    </div>
  )
}