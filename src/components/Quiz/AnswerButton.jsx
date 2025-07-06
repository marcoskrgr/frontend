import React from 'react'

export default function AnswerButton({ answer, index, onClick, disabled, className }) {
  return (
    <button key={index} onClick={onClick} disabled={disabled} className={className}>
      <p>{answer.text}</p>
    </button>
  )
}
