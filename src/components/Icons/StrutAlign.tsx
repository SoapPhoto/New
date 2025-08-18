import React from 'react'

export const StrutAlign: React.FC = ({ children }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
    }}
  >
    {'\u200B' /* ZWSP(zero-width space) */}
    {children}
  </span>
)
