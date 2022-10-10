function ItemFavorite(props) {
  const { item, index, addPlaylist, dataFav, setDataFav, deleteFavorite } = props;

  function handleAddPlaylist(event) {
    event.preventDefault();
    addPlaylist(item);
  }

  function handleDeleteFavorite(event) {
    event.preventDefault();
    deleteFavorite(item);
  }


  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.singer}</td>
        <td>
          <span
            onClick={handleAddPlaylist}
            id="delete"
            className="material-symbols-rounded"
          >
            playlist_add
          </span>
        </td>
        <td>
       
          <span
          onClick={handleDeleteFavorite}
            className="material-symbols-rounded"
          >
            delete
          </span>
        </td>
      </tr>
    </>
  );
}

export default ItemFavorite;
