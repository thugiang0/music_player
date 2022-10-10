import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { BsMusicNoteList } from "react-icons/bs";
import ReactPanZoom from 'react-image-pan-zoom-rotate';

function Player(props) {
  const { data, currentSongIndex, setCurrentSongIndex, nextSongIndex, datalist, action} = props;

  // const skipSong = (forwards = true) => {
  //   if (forwards) {
  //     props.setCurrentSongIndex(() => {
  //       let temp = currentSongIndex;
  //       temp++;

  //       if (temp > datalist.length - 1) {
  //         temp = 0;
  //       }

  //       return temp;
  //     });
  //   } else {
  //     setCurrentSongIndex(() => {
  //       let temp = currentSongIndex;
  //       temp--;

  //       if (temp < 0) {
  //         temp = datalist.length - 1;
  //       }

  //       return temp;
  //     });
  //   }
  // };

  return (
    <div className="player-container">
      <div className="player-infor">
        <div className="player-wrapper">
          {/* <!-- Header and Thumbnail --> */}
          <h3 className="header">Now Playing</h3>
          <div className="thumbnail">
            <img
              className="thumbnail"
              src={datalist.length === 0 ? data[0].img : datalist[currentSongIndex].img}
              alt="Italian Trulli"
            
          
            />
          </div>

          {/* <!-- Song's title and author --> */}
          <div className="song">
            <h2 className="title">{datalist.length === 0 ? data[0].name : datalist[currentSongIndex].name}</h2>
            <h3 className="author">{datalist.length === 0 ? data[0].singer : datalist[currentSongIndex].singer}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
