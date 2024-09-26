import React, { useState } from "react";

export default function useShow() {
  const [show, setShow] = useState(true);
  const [showDrop, setShowDrop] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const handleShowDrop = () => {
    setShowDrop(!showDrop);
  };

  return { show, setShow, handleShow, showDrop, handleShowDrop };
}
