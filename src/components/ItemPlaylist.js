function ItemPlaylist(props) {
  const {
    song,
    datalist,
    setDatalist,
    updateDataList,
    playMusic,
    action,
    setAction,
    actionSong
  } = props;

  function handleDeletePlaylist(event) {
    event.preventDefault();
    console.log(datalist);
    const newdatalist = [];
    datalist.map((element) => {
      if (element.id !== song.id) {
        newdatalist.push(element);
      }
    });
    // updateDataList(newdatalist);
    setDatalist(newdatalist);
  }

  function handlePlayMusic(event) {
    event.preventDefault();

    playMusic(song.url);
    console.log(song.url);

    // datalist.forEach(element => {
    //   const audio = element.url;
    //   if (element.id === song.id) {
    //     playMusic(audio);
    //     // console.log("https://data35.chiasenhac.com/downloads/1960/1/1959897-843d55d4/128/Always%20Remember%20Us%20This%20Way%20-%20Lady%20Gaga_.mp3");
    //   }
    // });
  
  }

  function handleSetAction(event) {
    event.preventDefault();
    setAction(true);
  }

  function handleActionSong(event) {
    event.preventDefault();
    actionSong(song.id);
  }

  return (
    <>
      <li key={song.id} className="playlist-item">
        <div onClick={handleActionSong} className="playlist-inf">
          <div className="title-player-img">
            <img className="title-player-img" src={song.img} />
          </div>{" "}
          &ensp;
          <div className="title-player-text">
            <div className="title-player-song">{song.name}</div>
            <div className="title-player-singer">{song.singer}</div>
          </div>
        </div>

        <div className="wave">
          {/* <span className="stroke"></span>
                      <span className="stroke"></span>
                      <span className="stroke"></span>
                      <span className="stroke"></span>
                      <span className="stroke"></span> */}
          <span
            onClick={handleDeletePlaylist}
            id="delete"
            className="material-symbols-rounded"
          >
            delete
          </span>
        </div>
      </li>
    </>
  );
}

export default ItemPlaylist;
