import { makeId } from "../util";
import ItemFavorite from "../components/ItemFavorite";

function Favorite(props) {
  const { datalist, addPlaylist, dataFav, setDataFav } = props;

  function deleteFavorite(item) {
    const newdataFav = [];
    dataFav.map((element) => {
      if (element.id !== item.id) {
        newdataFav.push(element);
      }
    });
    // updateDataList(newdatalist);
    setDataFav(newdataFav);
  }

  return (
    <div className="favorite-container">
      <div className="header">
        <h1>MY FAVORITES</h1>
      </div>

      <div className="favorite-body">
        <div className="favorite-content">
          <table>
            <colgroup>
              <col width="70" span="1" />
              <col width="300" span="1" />
              <col width="250" span="1" />
              <col width="50" span="2" />
            </colgroup>
            <thead>
              <tr>
                <th className="text-center">Stt</th>
                <th className="text-center">Song</th>
                <th className="text-center">Artist</th>
                <th className="text-center"></th>
                <th className="text-center"></th>
              </tr>
            </thead>
          </table>

          <table className="favorite-song">
            <colgroup>
              <col width="70" span="1" />
              <col width="300" span="1" />
              <col width="250" span="1" />
              <col width="50" span="2" />
            </colgroup>

            <tbody>
              {dataFav.map((item, index) => {
                return (
                  <ItemFavorite
                    key={item.id}
                    item={item}
                    index={index}
                    datalist={datalist}
                    addPlaylist={addPlaylist}
                    deleteFavorite={deleteFavorite}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Favorite;
