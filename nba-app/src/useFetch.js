import { useEffect, useState } from "react";

export default function useFetch(url, fn) {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [games, setGames] = useState();

  function closeModal() {
    setOpen(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const gamesData = await response.json();
        if (fn !== undefined) {
          setGames(fn(gamesData));
        } else {
          setGames(gamesData);
        }
      } catch (e) {
        console.log("omer");
        setError(e.message);
        setOpen(true);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [url]);

  return [games, loader, error, open, closeModal];
}

// export async function fetchData(){
//     setLoader(true);

//       try {
//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const gamesData = await response.json();
//         setGames(gamesData);
//       } catch (e) {
//         console.log("omer");
//         setError(e.message);
//         setOpen(true);
//       } finally {
//         setLoader(false);
//       }
// }
