import React, { useState } from 'react';
import './styles.css'; // Ensure you create this CSS file

interface HamburgerContentProps {
  children: React.ReactNode;
}

export const HamburgerContent: React.FC<HamburgerContentProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hamburger-content">
      <button onClick={() => setIsOpen(!isOpen)}>☰</button>
      {isOpen && (
        <div className="content">
          {children}
        </div>
      )}
    </div>
  );
};

export default HamburgerContent;