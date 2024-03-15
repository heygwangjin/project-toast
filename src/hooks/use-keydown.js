import React from "react";

function useKeydown(key, callback) {
  React.useEffect(() => {
    function handleKeydown(event) {
      if (event.key === key) {
        callback();
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });
}

export default useKeydown;
