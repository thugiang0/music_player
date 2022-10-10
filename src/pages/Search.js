import ListSongSearch from "../components/ListSongSearch";

import { FaSearch } from "react-icons/fa";

import { useRef } from "react";

function Search(props) {
  const {
    data,
    datalist,
    setDatalist,
    addPlaylist,
    updateDataList,
    dataRender,
    setDataRender,
    searchSong,
    dataFav,
    setDataFav,
    addFavorite,
    playMusic,

  } = props;

  const nameInput = useRef();

  function handleSearchSong(event) {
    event.preventDefault();
    searchSong(nameInput.current.value);
  }

  return (
    <div className="search-container">
      <div className="search-control">
        {/* <div className="search_bar"> */}
          <form className="search_bar" onSubmit={handleSearchSong}>
          <FaSearch />
          <input
            // onChange={handleSearchSong}
            ref={nameInput}
            name="keyword"
            type="text"
            placeholder="Song or artist"
          />
          </form>
          
        {/* </div> */}
      </div>

      <div className="search-content">
        <ListSongSearch
          data={data}
          datalist={datalist}
          setDatalist={setDatalist}
          addPlaylist={addPlaylist}
          updateDataList={updateDataList}
          dataRender={dataRender}
          searchSong={searchSong}
          handleSearchSong={handleSearchSong}
          dataFav = {dataFav}
          setDataFav={setDataFav}
          addFavorite={addFavorite}
          playMusic={playMusic}
      
        />
      </div>
    </div>
  );
}

export default Search;
