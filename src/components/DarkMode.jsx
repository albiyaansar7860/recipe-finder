import { useEffect, useState }
from "react";

function DarkMode() {

  const [dark, setDark] =
    useState(false);

  useEffect(() => {

    if (dark)
      document.body.classList.add("dark");
    else
      document.body.classList.remove("dark");

  }, [dark]);

  return (

    <button
      onClick={() =>
        setDark(!dark)
      }
    >
      🌙 Dark Mode
    </button>

  );
}

export default DarkMode;