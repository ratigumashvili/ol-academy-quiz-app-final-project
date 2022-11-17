import { useState, useEffect, useCallback } from "react";

const useModal = (ref) => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = useCallback(() => {
    setIsShowing(!isShowing);
  }, [isShowing]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target === ref.current) {
        toggle();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [toggle, ref]);

  return {
    isShowing,
    toggle,
  };
};

export default useModal;
