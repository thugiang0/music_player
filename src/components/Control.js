import "../App.css";

import { useEffect, useState, useContext, useRef } from "react";

function Control(props) {
  const {
    data,
    handleShowPlaylist,
    action,
    setAction,
    playMusic,
    pauseMusic,
    song,
    handleSetSong,
    currentSongIndex,
    setCurrentSongIndex,
    nextSongIndex,
    datalist,
  } = props;

  const audioElement = useRef(null);

  useEffect(() => {
    if (action) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }

  });

  const skipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp++;

        if (temp > datalist.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = datalist.length - 1;
        }

        return temp;
      });
    }
  };

  function timerFormat(duration) {
    const rounded = Math.floor(duration);
      return `${Math.floor(rounded/60) >= 10 ? Math.floor(rounded/60) : '0' + Math.floor(rounded/60)}:${rounded%60 >= 10 ? rounded%60 : '0' + rounded%60}`;
  }



  function handleNextSong(event) {
    event.preventDefault();
    skipSong(true);
    console.log(timerFormat(audioElement.current.duration));
  }

  function handlePreviousSong(event) {
    event.preventDefault();
    skipSong(false);
  }

  function handleSetAction(event) {
    event.preventDefault();
    setAction(!action);
  }

 
  return (
    <>
    /*
      <div className="player-control">
        <span className="title-player">
          {" "}
          &ensp; &ensp;
          <div className="title-player-img">
            <img
              className="title-player-img"
              src={
                datalist.length === 0
                  ? data[0].img
                  : datalist[currentSongIndex].img
              }
            />
          </div>{" "}
          &ensp;
          <div className="title-player-text">
            <div className="title-player-song">
              {datalist.length === 0
                ? data[0].name
                : datalist[currentSongIndex].name}
            </div>
            <div className="title-player-singer">
              {datalist.length === 0
                ? data[0].singer
                : datalist[currentSongIndex].singer}
            </div>
          </div>
        </span>

        <span className="wrap-control">
          {/* Time */}
          <div className="control-time">
            <span id="begin"></span> &ensp;
            <div className="progress-bar">
              <div className="progress"></div>
            </div>{" "}
            &ensp;
            <span id="end"></span>
            {/* <div className="timer">
                <span id="begin">00:42</span>
                <span id="end">03:45</span>
              </div> */}
            <audio id="audio" src=""></audio>
          </div>

          {/* action */}
          <div className="control">
            <span id="song-flow" className="material-symbols-rounded">
              repeat
            </span>
            <span onClick={handlePreviousSong} id="prev" className="material-symbols-rounded">
              skip_previous
            </span>
            <span
              onClick={handleSetAction}
              // onClick={toggle}
              id="play-pause"
              className="material-symbols-rounded"
            >
              {action ? "pause_circle" : "play_circle"}
            </span>
            <span
              onClick={handleNextSong}
              id="next"
              className="material-symbols-rounded"
            >
              skip_next
            </span>
            <span
              onClick={handleShowPlaylist}
              id="open-playlist"
              className="material-symbols-rounded"
            >
              queue_music
            </span>
          </div>

          {/* Volume */}
          <div className="control-volume">
            <div id="volume-icon" className="material-symbols-rounded">
              volume_up
            </div>

            <div className="volume-bar">
              <div className="volume"></div>
            </div>

            <audio
              ref={audioElement}
              id="audio"
              src={
                datalist.length === 0
                  ? data[0].url
                  : datalist[currentSongIndex].url
              }
              preload="metadata"
            ></audio>
          </div>
        </span>
      </div>
      */
    </>
  );
}

export default Control;
