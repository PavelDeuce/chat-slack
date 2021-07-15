import React from 'react';

const UseFocus = () => {
  const htmlElRef = React.useRef(null);
  const setFocus = () => htmlElRef.current && htmlElRef.current.focus();

  return [htmlElRef, setFocus];
};

export default UseFocus;
