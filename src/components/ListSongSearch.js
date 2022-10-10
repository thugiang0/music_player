import ItemListSong from "./ItemListSong";
import { useRef } from "react";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

function ListSongSearch(props) {
  const {
    data,
    datalist,
    setDatalist,
    addPlaylist,
    updateDataList,
    dataRender,
    searchSong,
    handleSearchSong,
    dataFav,
    setDataFav,
    addFavorite,

  } = props;
  const songName = useRef();
  const songSinger = useRef();

  function handleSearchSongName(event) {
    event.preventDefault();
    searchSong(songName.current.value);
  }

  function handleSearchSongSinger(event) {
    event.preventDefault();
    searchSong(songSinger.current.value);
  }

  return (
    <>
      <div className="search-results">
        <table className="table_1 ">
          <colgroup>
            <col width="70" span="1" />
            <col width="300" span="1" />
            <col width="250" span="1" />
            <col width="50" span="2" />
            <col width="70" span="1" />
            <col width="50" span="1" />
          </colgroup>

          <thead>
            <tr>
              <th className="text-center-1"></th>
              <th className="text-center">Song</th>
              <th className="text-center">Artist</th>
              <th className="text-center"></th>
              <th className="text-center"></th>
              <th className="text-center"></th>
              <th className="text-center"></th>
            </tr>
          </thead>
          <tbody height="60">
            <tr>
              <td></td>
              <td>
                <input
                  ref={songName}
                  onChange={handleSearchSongName}
                  type="text"
                  className="form-control"
                />
              </td>
              <td>
                <input
                  ref={songSinger}
                  onChange={handleSearchSongSinger}
                  type="text"
                  className="form-control"
                />
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <table className="table_2">
          <colgroup>
            <col width="70" span="1" />
            <col width="300" span="1" />
            <col width="250" span="1" />
            <col width="50" span="2" />
            <col width="70" span="1" />
            <col width="50" span="1" />
          </colgroup>
          <tbody>
            {dataRender.map((item, index) => {
              return (
                <ItemListSong
                  key={item.id}
                  item={item}
                  index={index}
                  datalist={datalist}
                  setDatalist={setDatalist}
                  addPlaylist={addPlaylist}
                  updateDataList={updateDataList}
                  dataRender={dataRender}
                  dataFav={dataFav}
                  setDataFav={setDataFav}
                  addFavorite={addFavorite}
                
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListSongSearch;
