import { makeId } from "../util";

import {useState} from "react";

function ItemListSong(props) {
  const {
    item,
    index,
    datalist,
    setDatalist,
    addPlaylist,
    updateDataList,
    dataRender,
    addFavorite,
    playMusic,
  
  } = props;

  const [favorite, setFavorite] = useState(false);

  function addtoFav(event) {
    event.preventDefault();
    setFavorite(!favorite);

  }

  function handleAddPlaylist(e) {
    e.preventDefault();
    console.log(item.name);

    addPlaylist(item);
  }

  function handleAddFavorite(event) {
    event.preventDefault();
    addFavorite(item);
    setFavorite(!favorite);
  }



  return (
    <>
      <tr>
        <td className="text-center">{index + 1}</td>
        <td className="">{item.name}</td>
        <td>{item.singer}</td>
        <td>
          <span
            onClick={handleAddPlaylist}
            className="material-symbols-rounded"
          >
            playlist_add
          </span>
        </td>
        <td>
          <span
            onClick={handleAddFavorite}
            className="material-symbols-rounded"
          >
            {!favorite ? "heart_plus" : "heart_minus"}
            {/* heart_plus */}
          </span>
        </td>
        <td>
          <div className="wave">
            {/* <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span>
            <span className="stroke"></span> */}
          </div>
        </td>
        <td>
          <a href={item.url} target="_blank"> <span className="material-symbols-rounded">file_download</span> </a>
          
        </td>
      </tr>
    </>
  );
}

export default ItemListSong;
