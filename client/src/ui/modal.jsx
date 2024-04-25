import { useEffect, useState } from "react";
import { useUiStore } from "../store/ui-store";
import moviesData from "../data/movies-data.json";

export const Modal = () => {
  const { isUiOpen, setUiOpened, highlighted } = useUiStore();
  const [movieData, setMovieData] = useState();

  const handleClose = (e) => {
    e.stopPropagation();
    setUiOpened(false);
  };

  useEffect(() => {
    if (isUiOpen && !highlighted) setUiOpened(false);
  }, [isUiOpen]);

  useEffect(() => {
    if (highlighted) {
      setMovieData(moviesData.find((md) => md.id === highlighted));
    }
  }, [highlighted]);

  return (
    highlighted &&
    isUiOpen &&
    movieData && (
      <div className="modal-background" onClick={(e) => e.stopPropagation()}>
        <div className="modal-container">
          <div className="modal-title">
            {movieData.title}
            <img
              src="/assets/img/close.png"
              width={25}
              height={25}
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="modal-body">
            <img src={movieData.coverArtUrl} width={400} />
            {movieData.description}
          </div>
        </div>
      </div>
    )
  );
};
