import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

import styled from 'styled-components';

const Button = styled.div`
  position: fixed;
  right: 20px;
  bottom: 60px;
  height: 20px;
  font-size: 3.5rem;
  z-index: 1;
  cursor: pointer;
  color: #15171c;
`;

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <Button>
      <FaArrowCircleUp
        onClick={scrollToTop}
        style={{ display: visible ? 'inline' : 'none' }}
      />
    </Button>
  );
};

export default ScrollButton;
