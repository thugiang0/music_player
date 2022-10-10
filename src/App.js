import "./App.css";

import { Routes, Route, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { makeId } from "./util";

import Player from "./pages/Player";
import Search from "./pages/Search";
import Favorite from "./pages/Favorite";
import ItemPlaylist from "./components/ItemPlaylist";

import MenuBar from "./components/MenuBar";
import Control from "./components/Control";

import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { CSSTransition } from "react-transition-group";

import { useState, useEffect, useRef } from "react";

function App() {
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [datalist, setDatalist] = useState([]);
  const dataLocalStorage = JSON.parse(localStorage.getItem("data"));
  localStorage.setItem("data", JSON.stringify([data]));
  const [dataRender, setDataRender] = useState([]);
  const [dataFav, setDataFav] = useState([]);

  const [action, setAction] = useState(false);

  const [song, setSong] = useState(datalist[0]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > datalist.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);

  const handleSetSong = (idSong) => {
    const song = datalist.find((song) => song.id === idSong);
    if (!song) {
      setSong(datalist[0]);
    } else {
      setSong(song);
    }
    console.log(song);
  };

  // const useAudio = url => {
  //   const [audio] = useState(new Audio(url));
  //   // const audio = new Audio(url);
  //   const [playing, setPlaying] = useState(false);

  //   const toggle = () => setPlaying(!playing);

  //   useEffect(() => {
  //       playing ? audio.play() : audio.pause();
  //     },
  //     [playing]
  //   );

  //   useEffect(() => {
  //     audio.addEventListener('ended', () => setPlaying(false));
  //     return () => {
  //       audio.removeEventListener('ended', () => setPlaying(false));
  //     };
  //   }, []);

  //   return [playing, toggle];
  // };

  function playMusic(url) {
    var audio = new Audio(url);
    audio.play();
  }

  // var audio = new Audio(datalist[0].url);

  // const audioRef = useRef(new Audio(url));

  // const play = () => {
  //   setPlaying(true);
  //   audioRef.current.play();
  // };

  // const pause = () => {
  //   setPlaying(false);
  //   audioRef.current.pause();
  // };

  // var audio = new Audio("https://data38.chiasenhac.com/downloads/1916/5/1915750-a4cc1cb8/128/Nham%20Mat%20Thay%20Mua%20He%20-%20Nguyen%20Ha.mp3");

  function updateDataList(newData) {
    const newArr = datalist.map((item) =>
      item.id === newData.id ? newData : item
    );
    setDatalist(newArr);
  }

  function updateDataRender(newData) {
    const newArr = data.map((item) =>
      item.id === newData.id ? newData : item
    );
    setDataRender(newArr);
  }

  function handleShowPlaylist(event) {
    event.preventDefault();
    setShowPlaylist(!showPlaylist);
  }

  function addPlaylist(item) {
    const newItem = {
      id: makeId(),
      name: item.name,
      url: item.url,
      singer: item.singer,
      img: item.img,
    };
    datalist.push(newItem);

    // setDatalist(datalist);
    console.log(datalist);

    updateDataList(datalist);
  }

  function addFavorite(item) {
    const newdataFav = {
      id: item.id,
      name: item.name,
      url: item.url,
      singer: item.singer,
      img: item.img,
    };

    dataFav.push(newdataFav);
    console.log(dataFav);
  }

  function searchSong(keyword) {
    const result = [];
    data.forEach((item) => {
      if (
        item.name.toLowerCase().includes(keyword.toLowerCase()) ||
        item.singer.toLowerCase().includes(keyword.toLowerCase())
      ) {
        result.push(item);
      }
    });
    setDataRender(result);
    // console.log("result", result);
    // console.log(dataRender);
  }

  function handleTest(event) {
    event.preventDefault();
    console.log(datalist[0].img);
  }

  function actionSong(id) {
    for (var i = 0; i < datalist.length; i++) {
      if (datalist[i].id === id) {
        setCurrentSongIndex(i);
      }
      setAction(true);
    }
  }

  return (
    <>
      <div className="App">
        {/* <div className="container"> */}

        {/* Menu bar */}
        <MenuBar />

        {/* Content */}
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Player
                  data={data}
                  currentSongIndex={currentSongIndex}
                  setCurrentSongIndex={setCurrentSongIndex}
                  nextSongIndex={nextSongIndex}
                  datalist={datalist}
                  action={action}
                  setAction={setAction}
                />
              }
            />
            <Route
              path="/search"
              element={
                <Search
                  data={data}
                  datalist={datalist}
                  setDatalist={setDatalist}
                  addPlaylist={addPlaylist}
                  updateDataList={updateDataList}
                  dataRender={dataRender}
                  setDataRender={setDataRender}
                  searchSong={searchSong}
                  dataFav={dataFav}
                  setDataFav={setDataFav}
                  addFavorite={addFavorite}
                  playMusic={playMusic}
                />
              }
            />
            <Route
              path="/favorite"
              element={
                <Favorite
                  datalist={datalist}
                  addPlaylist={addPlaylist}
                  dataFav={dataFav}
                  setDataFav={setDataFav}
                />
              }
            />
          </Routes>
        </div>

        {/* Control */}
        <Control
          handleShowPlaylist={handleShowPlaylist}
          action={action}
          setAction={setAction}
          playMusic={playMusic}
          song={song}
          handleSetSong={handleSetSong}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
          datalist={datalist}
          data={data}
        />

        {/* Playlist */}
        <CSSTransition in={showPlaylist} timeout={0} unmountOnExit>
          <div className="playlist" show={showPlaylist}>
            <div className="playlist-header">
              <div className="playlist-icon">
                <span className="material-symbols-rounded">queue_music</span>
                <span>My playlist</span>
              </div>
              <span
                onClick={() => setShowPlaylist(false)}
                // onClick={handleTest}
                id="close-playlist"
                className="material-symbols-rounded"
              >
                close
              </span>
            </div>

            <ul className="playlist-wrapper">
              {datalist.map((song, index) => {
                return (
                  // <li key={song.id} className="playlist-item">
                  //   <div className="playlist-inf">
                  //     <div className="title-player-img">
                  //       <img className="title-player-img" src={song.img} />
                  //     </div>{" "}
                  //     &ensp;
                  //     <div className="title-player-text">
                  //       <div className="title-player-song">{song.name}</div>
                  //       <div className="title-player-singer">{song.singer}</div>
                  //     </div>
                  //   </div>

                  //   <div className="wave">

                  //     {/* <span className="stroke"></span>
                  //     <span className="stroke"></span>
                  //     <span className="stroke"></span>
                  //     <span className="stroke"></span>
                  //     <span className="stroke"></span> */}
                  //     <span id="delete" className="material-symbols-rounded">delete</span>
                  //   </div>
                  // </li>
                  <ItemPlaylist
                    key={song.id}
                    song={song}
                    datalist={datalist}
                    setDatalist={setDatalist}
                    updateDataList={updateDataList}
                    playMusic={playMusic}
                    handleSetSong={handleSetSong}
                    action={action}
                    setAction={setAction}
                    currentSongIndex={currentSongIndex}
                    setCurrentSongIndex={setCurrentSongIndex}
                    actionSong={actionSong}
                  />
                );
              })}
            </ul>
          </div>
        </CSSTransition>
      </div>
    </>
  );
}

export default App;

// const datalist = [];

// const dataFav = [];

const data = [
  {
    id: makeId(),
    name: "Always Remember Us This Way",
    url: "https://data35.chiasenhac.com/downloads/1960/1/1959897-843d55d4/128/Always%20Remember%20Us%20This%20Way%20-%20Lady%20Gaga_.mp3",
    singer: "Lady Gaga",
    img: "https://data.chiasenhac.com/data/cover/96/95422.jpg",
  },

  {
    id: makeId(),
    name: "Cardigan",
    url: "https://data3.chiasenhac.com/downloads/2105/1/2104118-da3e637d/128/Cardigan%20-%20Taylor%20Swift.mp3",
    singer: "Taylor Swift",
    img: "https://data.chiasenhac.com/data/cover/125/124575.jpg",
  },
  {
    id: makeId(),
    name: "Nhắm Mắt Thấy Mùa Hè",
    url: "https://data37.chiasenhac.com/downloads/1916/3/1915750-a4cc1cb8/128/Nham%20Mat%20Thay%20Mua%20He%20-%20Nguyen%20Ha.mp3",
    singer: "Nguyên Hà",
    img: "https://data.chiasenhac.com/data/cover/90/89366.jpg",
  },
  {
    id: makeId(),
    name: "Love Is Gone",
    url: "https://data3.chiasenhac.com/downloads/2101/3/2100683-2b526180/128/Love%20Is%20Gone%20Acoustic_%20-%20Dylan%20Matthew_.mp3",
    singer: "Slander, Dylan Matthew",
    img: "https://data.chiasenhac.com/data/cover/122/121998.jpg",
  },
  {
    id: makeId(),
    name: "So Far Away",
    url: "https://data00.chiasenhac.com/downloads/1848/3/1847624-e3bfedf1/128/So%20Far%20Away%20-%20Martin%20Garrix_%20David%20Guett.mp3",
    singer: "Martin Garrix, David Guetta",
    img: "https://data.chiasenhac.com/data/cover/80/79755.jpg",
  },
  {
    id: makeId(),
    name: "Scars To Your Beautiful",
    url: "https://data2.chiasenhac.com/stream2/1585/3/1584106-14a32bf7/128/Scars%20To%20Your%20Beautiful%20-%20Alessia%20Cara.mp3",
    singer: "Alessia Cara",
    img: "https://data.chiasenhac.com/data/cover/67/66514.jpg",
  },
  {
    id: makeId(),
    name: "Mặc sự đời",
    url: "https://data3.chiasenhac.com/downloads/2126/2/2125713-d77c66ce/128/Mac%20Su%20Doi_%20-%20Tlinh.mp3",
    singer: "Tlinh",
    img: "https://data.chiasenhac.com/data/cover/130/129752.jpg",
  },
  {
    id: makeId(),
    name: "Vào hạ",
    url: "https://data.chiasenhac.com/down2/2269/2/2268197-20352cee/128/Vao%20Ha%20-%20Suni%20Ha%20Linh.mp3",
    singer: "Suni Hạ Linh",
    img: "https://data.chiasenhac.com/data/cover/172/171541.jpg",
  },
  {
    id: makeId(),
    name: "Dằm trong tim",
    url: "https://data.chiasenhac.com/down2/2269/2/2268208-2bb39c0f/128/Dam%20Trong%20Tim%20-%20Suni%20Ha%20Linh_%20TDK.mp3",
    singer: "Suni Hạ Linh",
    img: "https://data.chiasenhac.com/data/cover/172/171541.jpg",
  },
  {
    id: makeId(),
    name: "Có hẹn với thanh xuân",
    url: "https://data.chiasenhac.com/down2/2269/2/2268212-a621dbeb/128/Co%20Hen%20Voi%20Thanh%20Xuan%20-%20Suni%20Ha%20Linh_%20Ho.mp3",
    singer: "Suni Hạ Linh",
    img: "https://data.chiasenhac.com/data/cover/172/171541.jpg",
  },
  {
    id: makeId(),
    name: "Xích thêm chút nữa",
    url: "https://data.chiasenhac.com/down2/2269/2/2268211-8ac5d962/128/Xich%20Them%20Chut%20Nua%20-%20Grey%20D_%20Tlinh.mp3",
    singer: "Tlinh",
    img: "https://data.chiasenhac.com/data/cover/172/171541.jpg",
  },
  {
    id: makeId(),
    name: "Em là châu báu",
    url: "https://data3.chiasenhac.com/downloads/2134/2/2133594/128/Em%20La%20Chau%20Bau%20-%20MCK_%20Tlinh.mp4",
    singer: "MCK",
    img: "https://data.chiasenhac.com/data/thumb/2134/2133594_prv.jpg",
  },
  {
    id: makeId(),
    name: "Không cần cố",
    url: "https://data.chiasenhac.com/down2/2187/2/2186138-38d48bd3/128/Khong%20Can%20Co%20-%20RPT%20MCK_%20Tlinh.mp3",
    singer: "MCK",
    img: "https://data.chiasenhac.com/data/cover/145/144443.jpg",
  },
  {
    id: makeId(),
    name: "Chú chó trên ô tô",
    url: "https://data3.chiasenhac.com/downloads/2129/2/2128964-098e7665/128/Chu%20Cho%20Tren%20O%20To%20-%20Tlinh.mp3",
    singer: "Tlinh",
    img: "https://data.chiasenhac.com/data/cover/131/130475.jpg",
  },
  {
    id: makeId(),
    name: "Dạy tui cách yêu",
    url: "https://data16.chiasenhac.com/downloads/2144/2/2143107/128/Day%20tui%20cach%20yeu%20-%20tlinh.mp3",
    singer: "Tlinh",
    img: "https://chiasenhac.vn/imgs/no_cover.jpg",
  },
  {
    id: makeId(),
    name: "Chia tay là giải pháp",
    url: "https://data.chiasenhac.com/down2/2270/2/2269890-9dc5ee85/128/Chia%20Tay%20La%20Giai%20Phap%20-%20Phat%20Ho.mp3",
    singer: "Phát Hồ",
    img: "https://data.chiasenhac.com/data/cover/173/172210.jpg",
  },
  {
    id: makeId(),
    name: "Yêu là cưới",
    url: "https://data.chiasenhac.com/down2/2194/2/2193057-a299c22d/128/Yeu%20La%20Cuoi%20-%20Phat%20Ho.mp3",
    singer: "Phát Hồ",
    img: "https://data.chiasenhac.com/data/cover/147/146033.jpg",
  },
  {
    id: makeId(),
    name: "Chờ ngày cưới em",
    url: "https://data.chiasenhac.com/down2/2240/2/2239934-f1f108d0/128/Cho%20Ngay%20Cuoi%20Em%20-%20Phat%20Ho_%20Huong%20Ly_%20X2.mp3",
    singer: "Phát Hồ",
    img: "https://data.chiasenhac.com/data/cover/161/160868.jpg",
  },
  {
    id: makeId(),
    name: "Mưa hồng",
    url: "https://data.chiasenhac.com/down2/2270/2/2269680-72679484/128/Mua%20Hong%20-%20Khoi.mp3",
    singer: "Khôi",
    img: "https://data.chiasenhac.com/data/cover/173/172128.jpg",
  },
  {
    id: makeId(),
    name: "Còn tuổi nào cho em",
    url: "https://data.chiasenhac.com/down2/2270/2/2269621-dda094d7/128/Con%20Tuoi%20Nao%20Cho%20Em%20-%20Khoi.mp3",
    singer: "Khôi",
    img: "https://data.chiasenhac.com/data/cover/173/172128.jpg",
  },
  {
    id: makeId(),
    name: "Anh thèm được ngủ",
    url: "https://data.chiasenhac.com/down2/2182/2/2181810-0590a3b0/128/Anh%20Them%20Duoc%20Ngu%20-%20Khoi.mp3",
    singer: "Khói",
    img: "https://data.chiasenhac.com/data/cover/144/143342.jpg",
  },
  {
    id: makeId(),
    name: "Là do em xui thôi",
    url: "https://data.chiasenhac.com/down2/2217/2/2216128-566118de/128/La%20Do%20Em%20Xui%20Thoi%20-%20Khoi_%20Sofia_%20Chau%20Da.mp3",
    singer: "Khói",
    img: "https://data.chiasenhac.com/data/cover/153/152518.jpg",
  },
  {
    id: makeId(),
    name: "Chạy về khóc với anh",
    url: "https://data.chiasenhac.com/down2/2221/2/2220891-72ab7211/128/Yeu%20Duong%20Kho%20Qua%20Thi%20Chay%20Ve%20Khoc%20Voi%20A.mp3",
    singer: "Erik",
    img: "https://data.chiasenhac.com/data/cover/155/154074.jpg",
  },
  {
    id: makeId(),
    name: "Em không sai chúng ta sai",
    url: "https://data.chiasenhac.com/down2/2232/2/2231190-17ab501c/128/Em%20Khong%20Sai%20Chung%20Ta%20Sai%20-%20Erik.mp3",
    singer: "Erik",
    img: "https://data.chiasenhac.com/data/cover/158/157662.jpg",
  },
  {
    id: makeId(),
    name: "Lạc nhau có phải muôn đời",
    url: "https://data3.chiasenhac.com/downloads/1759/2/1758374-68ccfa58/128/Lac%20Nhau%20Co%20Phai%20Muon%20Doi%20-%20Erik.mp3",
    singer: "Erik",
    img: "https://data.chiasenhac.com/data/cover/68/67978.jpg",
  },
  {
    id: makeId(),
    name: "Đau nhất là lặng im",
    url: "https://data.chiasenhac.com/down2/2226/2/2225097-2133e315/128/Dau%20Nhat%20La%20Lang%20Im%20-%20Erik.mp3",
    singer: "Erik",
    img: "https://data.chiasenhac.com/data/cover/156/155350.jpg",
  },
  {
    id: makeId(),
    name: "Sau tất cả",
    url: "https://data2.chiasenhac.com/stream2/1612/2/1611927-88c14728/128/Sau%20Tat%20Ca%20-%20Erik.mp3",
    singer: "Erik",
    img: "https://data.chiasenhac.com/data/cover/52/51739.jpg",
  },
  {
    id: makeId(),
    name: "Chạm đáy nỗi đau",
    url: "https://data3.chiasenhac.com/downloads/2105/2/2104746/128/Cham%20Day%20Noi%20Dau%20-%20Erik.mp3",
    singer: "Erik",
    img: "https://data.chiasenhac.com/data/artist_avatar/3/2116.jpg",
  },
  {
    id: makeId(),
    name: "Nam Quốc Sơn Hà",
    url: "https://data25.chiasenhac.com/download2/2204/2/2203335-61d43762/128/Nam%20Quoc%20Son%20Ha%20-%20DTAP_%20Erik_%20NinjaZ_%20RT.mp3",
    singer: "Erik",
    img: "https://data.chiasenhac.com/data/cover/150/149055.jpg",
  },
  {
    id: makeId(),
    name: "Dịu dàng em đến",
    url: "https://data.chiasenhac.com/down2/2192/2/2191091-8e07a525/128/Diu%20Dang%20Em%20Den%20-%20Erik_%20NinjaZ.mp3",
    singer: "Erik",
    img: "https://data.chiasenhac.com/data/cover/146/145693.jpg",
  },
  {
    id: makeId(),
    name: "Ghen",
    url: "https://data3.chiasenhac.com/downloads/1791/2/1790239-842ef7df/128/Ghen%20-%20Erik_%20Min.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/72/71762.jpg",
  },
  {
    id: makeId(),
    name: "Đừng xin lỗi nữa",
    url: "https://data38.chiasenhac.com/downloads/1866/2/1865245-f02764b6/128/Dung%20Xin%20Loi%20Nua%20-%20Erik_%20Min.mp3",
    singer: "Erik",
    img: "https://data.chiasenhac.com/data/cover/82/81920.jpg",
  },
  {
    id: makeId(),
    name: "Chưa bao giờ mẹ kể",
    url: "https://data3.chiasenhac.com/downloads/1802/2/1801317-50b3b763/128/Chua%20Bao%20Gio%20Me%20Ke%20-%20Min_%20Erik_%20Pham%20Hoa.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/74/73215.jpg",
  },
  {
    id: makeId(),
    name: "Bài này Chill phết",
    url: "https://data.chiasenhac.com/down2/2179/2/2178590-1df95ef6/128/Bai%20Nay%20Chill%20Phet%20-%20Den_%20Min.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/143/142394.jpg",
  },
  {
    id: makeId(),
    name: "Cà phê",
    url: "https://data.chiasenhac.com/down2/2232/2/2231953-a9d619ec/128/Ca%20Phe%20-%20Min.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/158/157914.jpg",
  },
  {
    id: makeId(),
    name: "Gọi tên em",
    url: "https://data3.chiasenhac.com/downloads/1750/2/1749480-bb433ebc/128/Goi%20Ten%20Em%20Call%20My%20Name_%20-%20Min.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/67/66873.jpg",
  },
  {
    id: makeId(),
    name: "Có em chờ",
    url: "https://data3.chiasenhac.com/downloads/1785/2/1784766-10c3bf6b/128/Co%20Em%20Cho%20-%20Min_%20Mr_A.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/72/71006.jpg",
  },
  {
    id: makeId(),
    name: "Em mới là người yêu anh",
    url: "https://data38.chiasenhac.com/downloads/1911/2/1910270-9b9d43df/128/Em%20Moi%20La%20Nguoi%20Yeu%20Anh%20-%20Min.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/89/88361.jpg",
  },
  {
    id: makeId(),
    name: "Tìm",
    url: "https://data57.chiasenhac.com/downloads/1187/2/1186307-895e232f/128/Tim%20-%20Min_%20Mr_A.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/14/13697.jpg",
  },
  {
    id: makeId(),
    name: "Hôn anh",
    url: "https://data3.chiasenhac.com/downloads/1808/2/1807138-da84baf8/128/Hon%20Anh%20-%20Min.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/75/74079.jpg",
  },
  {
    id: makeId(),
    name: "Hít vào thở ra",
    url: "https://data25.chiasenhac.com/download2/2208/2/2207632-aee4b1d9/128/Hit%20Vao%20Tho%20Ra%20-%20Min_%20HIEUTHUHAI.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/151/150361.jpg",
  },
  {
    id: makeId(),
    name: "Đừng yêu nữa, em mệt rồi",
    url: "https://data.chiasenhac.com/down2/2215/2/2214282-bb37afe6/128/Dung%20Yeu%20Nua_%20Em%20Met%20Roi%20-%20Min.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/118/117188.jpg",
  },
  {
    id: makeId(),
    name: "Mlem Mlem",
    url: "https://data3.chiasenhac.com/downloads/2138/2/2137753-2b8b20b1/128/Mlem%20Mlem%20-%20Min_%20JustaTee_%20Yuno%20Bigboi.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/133/132236.jpg",
  },
  {
    id: makeId(),
    name: "Sẻ chia từng khoảnh khắc",
    url: "https://data2.chiasenhac.com/stream2/1621/2/1620665-6f3c60f1/128/Se%20Chia%20Tung%20Khoanh%20Khac%20-%20Min.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/artist_avatar/8/7578.jpg",
  },
  {
    id: makeId(),
    name: "Người em tìm kiếm",
    url: "https://data00.chiasenhac.com/downloads/1826/2/1825715-cb8ee558/128/Nguoi%20Em%20Tim%20Kiem%20-%20Min.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/77/76686.jpg",
  },
  {
    id: makeId(),
    name: "Khúc giao mùa",
    url: "https://data38.chiasenhac.com/downloads/1875/2/1874257-a945f362/128/Khuc%20Giao%20Mua%20-%20MIN_%20Soobin%20Hoang%20Son.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/84/83259.jpg",
  },
  {
    id: makeId(),
    name: "Luôn bên anh",
    url: "https://data26.chiasenhac.com/downloads/1421/2/1420988-735bf7dd/128/Luon%20Ben%20Anh%20By%20Your%20Side_%20-%20Min_%20Mr_A.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/30/29852.jpg",
  },
  {
    id: makeId(),
    name: "Ơi Ơi Ơi",
    url: "https://data.chiasenhac.com/down2/2170/2/2169831-39e5ab8e/128/Oi%20Oi%20Oi%20-%20Min_%20Hua%20Kim%20Tuyen.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/141/140054.jpg",
  },
  {
    id: makeId(),
    name: "Chuyện nhà bé thôi, con đừng về",
    url: "https://data17.chiasenhac.com/downloads/2152/2/2151144-fa284bde/128/Chuyen%20Nha%20Be%20Thoi_%20Con%20Dung%20Ve%20-%20Kai%20Di.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/136/135439.jpg",
  },
  {
    id: makeId(),
    name: "Về nhà vui hơn",
    url: "https://data3.chiasenhac.com/downloads/1741/2/1740754-80ba3f66/128/Ve%20Nha%20Vui%20Hon%20-%20Min.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/67/66648.jpg",
  },
  {
    id: makeId(),
    name: "Nghỉ đón Tết",
    url: "https://data.chiasenhac.com/down2/2218/2/2217656-89366c6f/128/Nghi%20Don%20Tet%20-%20Ricky%20Star_%20Min_%20Hoaprox.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/153/152993.jpg",
  },
  {
    id: makeId(),
    name: "One Day",
    url: "https://data2.chiasenhac.com/stream2/1700/2/1699592-f44c408b/128/One%20Day%20-%20Min_%20Rhymastic.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/62/61231.jpg",
  },
  {
    id: makeId(),
    name: "Love Note",
    url: "https://data3.chiasenhac.com/downloads/2111/2/2110348-0634c5bc/128/Love%20Note%20-%20Binz_%20Min.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/126/125849.jpg",
  },
  {
    id: makeId(),
    name: "Love DNA",
    url: "https://data3.chiasenhac.com/downloads/2117/2/2116682-60ef3aa1/128/Love%20DNA%20-%20Min_%20Trong%20Hieu.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/128/127506.jpg",
  },
  {
    id: makeId(),
    name: "Tìm X",
    url: "https://data.chiasenhac.com/down2/2249/2/2248915-e4d60f77/128/Tim%20X%20-%20Min.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/164/163968.jpg",
  },
  {
    id: makeId(),
    name: "Phải lòng anh",
    url: "https://data.chiasenhac.com/down2/2232/2/2231957-a722c354/128/Phai%20Long%20Anh%20-%20Min.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/158/157914.jpg",
  },
  {
    id: makeId(),
    name: "Ngắm sao",
    url: "https://data.chiasenhac.com/down2/2232/2/2231955-5ffb0a05/128/Ngam%20Sao%20Dear%20Miniacs_%20-%20Min.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/158/157914.jpg",
  },
  {
    id: makeId(),
    name: "Anh qua đây đi",
    url: "https://data.chiasenhac.com/down2/2232/2/2231952-de4a32af/128/Anh%20Qua%20Day%20Di%20-%20Min.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/158/157914.jpg",
  },
  {
    id: makeId(),
    name: "Hoà nhịp Giáng sinh",
    url: "https://data.chiasenhac.com/down2/2215/2/2214279-6411758c/128/Hoa%20Nhip%20Giang%20Sinh%20-%20Min.mp3",
    singer: "Min",
    img: "https://data.chiasenhac.com/data/cover/152/151864.jpg",
  },
  {
    id: makeId(),
    name: "Đi để trở về",
    url: "https://data3.chiasenhac.com/downloads/1771/2/1770987-5c084f1e/128/Di%20De%20Tro%20Ve%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/69/68731.jpg",
  },
  {
    id: makeId(),
    name: "Phía sau một cô gái",
    url: "https://data01.chiasenhac.com/downloads/1730/2/1729694-a4afea05/128/Phia%20Sau%20Mot%20Co%20Gai%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/65/64657.jpg",
  },
  {
    id: makeId(),
    name: "Daydreams",
    url: "https://data25.chiasenhac.com/download2/2208/2/2207332-274c3745/128/Daydreams%20Prod_%20Touliver_%20-%20Soobin%20Hoang.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/151/150279.jpg",
  },
  {
    id: makeId(),
    name: "Xin đừng lặng im",
    url: "https://data3.chiasenhac.com/downloads/1809/2/1808646-01235453/128/Xin%20Dung%20Lang%20Im%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/75/74260.jpg",
  },
  {
    id: makeId(),
    name: "Câu chuyện nhỏ",
    url: "https://data57.chiasenhac.com/downloads/1186/2/1185925-014ff21f/128/Cau%20Chuyen%20Nho%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/artist_avatar/1/617.jpg",
  },
  {
    id: makeId(),
    name: "Vài lần đón đưa",
    url: "https://data00.chiasenhac.com/downloads/1813/2/1812695-b79f07eb/128/Vai%20Lan%20Don%20Dua%20-%20Soobin%20Hoang%20Son_%20Toul.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/75/74828.jpg",
  },
  {
    id: makeId(),
    name: "Yêu thương ngày đó",
    url: "https://data38.chiasenhac.com/downloads/1897/2/1896178-ec532d99/128/Yeu%20Thuong%20Ngay%20Do%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/87/86198.jpg",
  },
  {
    id: makeId(),
    name: "Sẽ hứa đi cùng nhau",
    url: "https://data33.chiasenhac.com/downloads/1985/2/1984395-979ab0ea/128/Se%20Hua%20Di%20Cung%20Nhau%20-%20Da%20LAB_%20Soobin%20Hoa.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/99/98890.jpg",
  },
  {
    id: makeId(),
    name: "Ngày mai em đi",
    url: "https://data00.chiasenhac.com/downloads/1813/2/1812688-2acbad29/128/Ngay%20Mai%20Em%20Di%20-%20Le%20Hieu_%20Soobin%20Hoang%20S.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/75/74824.jpg",
  },
  {
    id: makeId(),
    name: "Nơi tôi thuộc về",
    url: "https://data37.chiasenhac.com/downloads/1867/2/1866559-033ee127/128/Noi%20Toi%20Thuoc%20Ve%20-%20Soobin%20Hoang%20Son_%20Huo.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/83/82166.jpg",
  },
  {
    id: makeId(),
    name: "Chị tôi",
    url: "https://data2.chiasenhac.com/stream2/1620/2/1619168-90e9e65d/128/Chi%20Toi%20Live_%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/53/52312.jpg",
  },
  {
    id: makeId(),
    name: "Ngại gì khác biệt",
    url: "https://data3.chiasenhac.com/downloads/1794/2/1793026-18b5efea/128/Ngai%20Gi%20Khac%20Biet%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/73/72153.jpg",
  },
  {
    id: makeId(),
    name: "Từng ngày em mơ về anh",
    url: "https://data2.chiasenhac.com/stream2/1700/2/1699046-b52326d3/128/Tung%20Ngay%20Em%20Mo%20Ve%20Anh%20-%20Soobin%20Hoang%20So.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/62/61165.jpg",
  },
  {
    id: makeId(),
    name: "Đi và yêu",
    url: "https://data3.chiasenhac.com/downloads/1771/2/1770095-1438b9a5/128/Di%20Va%20Yeu%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/70/69306.jpg",
  },
  {
    id: makeId(),
    name: "Toạ độ tình yêu",
    url: "https://data00.chiasenhac.com/downloads/1857/2/1856846-bdc62dbe/128/Toa%20Do%20Tinh%20Yeu%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/81/80804.jpg",
  },
  {
    id: makeId(),
    name: "Lạc",
    url: "https://data60.chiasenhac.com/downloads/1297/2/1296553-e4f247c2/128/Lac%20-%20Soobin%20Hoang%20Son_%20Thanh%20Tung.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/artist_avatar/1/617.jpg",
  },
  {
    id: makeId(),
    name: "Đi qua quá khứ",
    url: "https://data62.chiasenhac.com/downloads/1330/2/1329102-998d666b/128/Di%20Qua%20Qua%20Khu%20-%20Soobin%20Hoang%20Son_%20TinyC.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/artist_avatar/1/617.jpg",
  },
  {
    id: makeId(),
    name: "Đẹp nhất là em",
    url: "https://data31.chiasenhac.com/downloads/1973/2/1972791-f08ca1ad/128/Dep%20Nhat%20La%20Em%20-%20Soobin%20Hoang%20Son_%20Jiyeo.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/98/97084.jpg",
  },
  {
    id: makeId(),
    name: "Only One",
    url: "https://data3.chiasenhac.com/downloads/2101/2/2100899/128/Only%20One%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/artist_avatar/1/617.jpg",
  },
  {
    id: makeId(),
    name: "BlackJack",
    url: "https://data16.chiasenhac.com/downloads/2140/2/2139694-f754d198/128/BlackJack%20-%20Soobin%20Hoang%20Son_%20Binz.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/133/132674.jpg",
  },
  {
    id: makeId(),
    name: "Vẫn nhớ",
    url: "https://data3.chiasenhac.com/downloads/2104/2/2103108-29a1a032/128/Van%20Nho%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/artist_avatar/1/617.jpg",
  },
  {
    id: makeId(),
    name: "Lalala",
    url: "https://data25.chiasenhac.com/download2/2208/2/2207198-b71abaf7/128/Lalala%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/151/150238.jpg",
  },
  {
    id: makeId(),
    name: "Kiếp rong buồn",
    url: "https://data25.chiasenhac.com/download2/2204/2/2203626/128/Kiep%20Rong%20Buon%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/artist_avatar/1/617.jpg",
  },
  {
    id: makeId(),
    name: "Trò chơi",
    url: "https://data16.chiasenhac.com/downloads/2140/2/2139693-64691fe1/128/Tro%20Choi%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/133/132674.jpg",
  },
  {
    id: makeId(),
    name: "Tình bạn quê",
    url: "https://data33.chiasenhac.com/downloads/1987/2/1986651-b1472763/128/Tinh%20Ban%20Que%20-%20Soobin%20Hoang%20Son_%20SpaceSp.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/100/99308.jpg",
  },
  {
    id: makeId(),
    name: "I Know You Know",
    url: "https://data38.chiasenhac.com/downloads/1895/2/1894060-adda6bd0/128/I%20Know%20You%20Know%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/86/85918.jpg",
  },
  {
    id: makeId(),
    name: "Sài Gòn sống như tia nắng mặt trời",
    url: "https://data.chiasenhac.com/down2/2186/2/2185178-4dc29bf2/128/Sai%20Gon%20Song%20Nhu%20Tia%20Nang%20Mat%20Troi%20-%20Din.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/145/144168.jpg",
  },
  {
    id: makeId(),
    name: "Chuyến đi của năm",
    url: "https://data37.chiasenhac.com/downloads/1900/2/1899839-2da33dc4/128/Chuyen%20Di%20Cua%20Nam%20Di%20De%20Tro%20Ve%202_%20PSmall.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/artist_avatar/1/617.jpg",
  },
  {
    id: makeId(),
    name: "Một ngày rất khác",
    url: "https://data3.chiasenhac.com/downloads/1802/2/1801365-a1dfe187/128/Mot%20Ngay%20Rat%20Khac%20-%20Soobin%20Hoang%20Son_%20Su.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/74/73236.jpg",
  },
  {
    id: makeId(),
    name: "Khoảng lặng",
    url: "https://data2.chiasenhac.com/stream2/1725/2/1724840-7736b229/128/Khoang%20Lang%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/artist_avatar/1/617.jpg",
  },
  {
    id: makeId(),
    name: "Và thế là hết",
    url: "https://data01.chiasenhac.com/downloads/1730/2/1729714-2bea56ff/128/Va%20The%20La%20Het%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/cover/65/64657.jpg",
  },
  {
    id: makeId(),
    name: "Tell Me Why",
    url: "https://data61.chiasenhac.com/downloads/1324/2/1323600-585eccb5/128/Tell%20Me%20Why%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/artist_avatar/1/617.jpg",
  },
  {
    id: makeId(),
    name: "Bâng khuâng",
    url: "https://data60.chiasenhac.com/downloads/1298/2/1297726-218722c1/128/Bang%20Khuang%20-%20Soobin%20Hoang%20Son.mp3",
    singer: "Soobin Hoàng Sơn",
    img: "https://data.chiasenhac.com/data/artist_avatar/1/617.jpg",
  },
  {
    id: makeId(),
    name: "Rung động",
    url: "https://data51.chiasenhac.com/downloads/1023/2/1022433-720c8515/128/Rung%20Dong%20-%20Hoang%20Thuy%20Linh.mp3",
    singer: "Hoàng Thuỳ Linh",
    img: "https://data.chiasenhac.com/data/cover/1/253.jpg",
  },
  {
    id: makeId(),
    name: "Em sẽ là giấc mơ",
    url: "https://data51.chiasenhac.com/downloads/1001/2/1000328-8f73c127/128/Em%20Se%20La%20Giac%20Mo%20-%20Hoang%20Thuy%20Linh.mp3",
    singer: "Hoàng Thuỳ Linh",
    img: "https://data.chiasenhac.com/data/artist_avatar/7/6241.jpg",
  },
  {
    id: makeId(),
    name: "See Tình",
    url: "https://data.chiasenhac.com/down2/2243/2/2242625-38ccfba9/128/See%20Tinh%20Speed%20Up%20Version_%20-%20Hoang%20Thuy.mp3",
    singer: "Hoàng Thuỳ Linh",
    img: "https://data.chiasenhac.com/data/cover/162/161855.jpg",
  },
  {
    id: makeId(),
    name: "Bánh trôi nước",
    url: "https://data2.chiasenhac.com/stream2/1722/2/1721709-2fe7fd00/128/Banh%20Troi%20Nuoc%20Woman_%20-%20Hoang%20Thuy%20Linh.mp3",
    singer: "Hoàng Thuỳ Linh",
    img: "https://data.chiasenhac.com/data/cover/64/63716.jpg",
  },
  {
    id: makeId(),
    name: "Đánh đố",
    url: "https://data.chiasenhac.com/down2/2250/2/2249633-861a7ee4/128/Danh%20Do%20-%20Hoang%20Thuy%20Linh_%20Thanh%20Lam_%20Tu.mp3",
    singer: "Hoàng Thuỳ Linh",
    img: "https://data.chiasenhac.com/data/cover/165/164117.jpg",
  },
  {
    id: makeId(),
    name: "Kẽo cà kẽo kẹt",
    url: "https://data.chiasenhac.com/down2/2188/2/2187336-0b715a28/128/Keo%20Ca%20Keo%20Ket%20-%20Hoang%20Thuy%20Linh.mp3",
    singer: "Hoàng Thuỳ Linh",
    img: "https://data.chiasenhac.com/data/cover/145/144778.jpg",
  },
  {
    id: makeId(),
    name: "Có ai thương em như anh",
    url: "https://data32.chiasenhac.com/downloads/1931/2/1930838-8f3711b9/128/Co%20Ai%20Thuong%20Em%20Nhu%20Anh%20Catena_%20-%20Toc%20Ti.mp3",
    singer: "Tóc Tiên",
    img: "https://data.chiasenhac.com/data/cover/92/91423.jpg",
  },
  {
    id: makeId(),
    name: "1 cọng tóc mai",
    url: "https://data.chiasenhac.com/down2/2261/2/2260376-a41b0877/128/1%20Cong%20Toc%20Mai%20-%20Toc%20Tien_%20Touliver.mp3",
    singer: "Tóc Tiên",
    img: "https://data.chiasenhac.com/data/cover/169/168232.jpg",
  },
  {
    id: makeId(),
    name: "Em đã có người mới",
    url: "https://data.chiasenhac.com/down2/2214/2/2213377-fe868371/128/Em%20Da%20Co%20Nguoi%20Moi%20-%20Toc%20Tien_%20Nguoi%20cu.mp3",
    singer: "Tóc Tiên",
    img: "https://data.chiasenhac.com/data/cover/152/151596.jpg",
  },
  {
    id: makeId(),
    name: "Một nhà",
    url: "https://data00.chiasenhac.com/downloads/1833/2/1832664-be718709/128/Mot%20Nha%20-%20Da%20LAB.mp3",
    singer: "Da LAB",
    img: "https://data.chiasenhac.com/data/cover/35/34197.jpg",
  },
  {
    id: makeId(),
    name: "Bài ca tuổi trẻ",
    url: "https://data00.chiasenhac.com/downloads/1821/2/1820389-2d156d0a/128/Bai%20Ca%20Tuoi%20Tre%20-%20Da%20LAB.mp3",
    singer: "Da LAB",
    img: "https://data.chiasenhac.com/data/cover/76/75898.jpg",
  },
  {
    id: makeId(),
    name: "Chậm lại một chút",
    url: "https://data3.chiasenhac.com/downloads/1807/2/1806247-2db241cf/128/Cham%20Lai%20Mot%20Chut%20-%20Da%20LAB.mp3",
    singer: "Da LAB",
    img: "https://data.chiasenhac.com/data/cover/74/73946.jpg",
  },
  {
    id: makeId(),
    name: "Từ ngày em đến",
    url: "https://data3.chiasenhac.com/downloads/1798/2/1797216-1300ac3f/128/Tu%20Ngay%20Em%20Den%20-%20Da%20LAB.mp3",
    singer: "Da LAB",
    img: "https://data.chiasenhac.com/data/cover/73/72615.jpg",
  },
  {
    id: makeId(),
    name: "Thức giấc",
    url: "https://data.chiasenhac.com/down2/2181/2/2180668-fd76cfc8/128/Thuc%20Giac%20-%20Da%20LAB.mp3",
    singer: "Da LAB",
    img: "https://data.chiasenhac.com/data/cover/143/142973.jpg",
  },
  {
    id: makeId(),
    name: "Sống xa anh chẳng dễ dàng",
    url: "https://data.chiasenhac.com/down2/2229/2/2228765-432f2645/128/Song%20Xa%20Anh%20Chang%20De%20Dang%20-%20Bao%20Anh.mp3",
    singer: "Bảo Anh",
    img: "https://data.chiasenhac.com/data/cover/157/156731.jpg",
  },
  {
    id: makeId(),
    name: "Như lời đồn",
    url: "https://data36.chiasenhac.com/downloads/1963/2/1962185-2ec33485/128/Nhu%20Loi%20Don%20-%20Bao%20Anh.mp3",
    singer: "Bảo Anh",
    img: "https://data.chiasenhac.com/data/cover/96/95739.jpg",
  },
  {
    id: makeId(),
    name: "Ai khóc nỗi đau này",
    url: "https://data37.chiasenhac.com/downloads/1902/2/1901039-c1e3318f/128/Ai%20Khoc%20Noi%20Dau%20Nay%20-%20Bao%20Anh.mp3",
    singer: "Bảo Anh",
    img: "https://data.chiasenhac.com/data/cover/87/86955.jpg",
  },
  {
    id: makeId(),
    name: "Và em đã biết mình yêu",
    url: "https://data3.chiasenhac.com/downloads/1769/2/1768147-5c7a02ef/128/Va%20Em%20Da%20Biet%20Minh%20Yeu%20-%20Bao%20Anh.mp3",
    singer: "Bảo Anh",
    img: "https://data.chiasenhac.com/data/cover/70/69106.jpg",
  },
  {
    id: makeId(),
    name: "Đón mùa xuân về",
    url: "https://data3.chiasenhac.com/downloads/1759/2/1758685-8493efcf/128/Don%20Mua%20Xuan%20Ve%20-%20Bao%20Anh.mp3",
    singer: "Bảo Anh",
    img: "https://data.chiasenhac.com/data/cover/69/68014.jpg",
  },
  {
    id: makeId(),
    name: "Yêu một người vô tâm",
    url: "https://data01.chiasenhac.com/downloads/1731/2/1730095-051f5ad2/128/Yeu%20Mot%20Nguoi%20Vo%20Tam%20-%20Bao%20Anh.mp3",
    singer: "Bảo Anh",
    img: "https://data.chiasenhac.com/data/cover/65/64682.jpg",
  },
  {
    id: makeId(),
    name: "Muộn rồi mà sao còn",
    url: "https://data.chiasenhac.com/down2/2169/2/2168156-4608576a/128/Muon%20Roi%20Ma%20Sao%20Con%20-%20Son%20Tung%20M-TP.mp3",
    singer: "Sơn Tùng M-TP",
    img: "https://data.chiasenhac.com/data/cover/140/139611.jpg",
  },
  {
    id: makeId(),
    name: "Nơi này có anh",
    url: "https://data38.chiasenhac.com/downloads/1897/2/1896719-828a80eb/128/Noi%20Nay%20Co%20Anh%20-%20Son%20Tung%20M-TP.mp3",
    singer: "Sơn Tùng M-TP",
    img: "https://data.chiasenhac.com/data/cover/87/86272.jpg",
  },
  {
    id: makeId(),
    name: "Lạc trôi",
    url: "https://data37.chiasenhac.com/downloads/1897/2/1896718-b91ec523/128/Lac%20Troi%20-%20Son%20Tung%20M-TP.mp3",
    singer: "Sơn Tùng M-TP",
    img: "https://data.chiasenhac.com/data/cover/87/86272.jpg",
  },
  {
    id: makeId(),
    name: "Buông đôi tay nhau ra",
    url: "https://data37.chiasenhac.com/downloads/1897/2/1896713-769840f5/128/Buong%20Doi%20Tay%20Nhau%20Ra%20-%20Son%20Tung%20M-TP.mp3",
    singer: "Sơn Tùng M-TP",
    img: "https://data.chiasenhac.com/data/cover/87/86272.jpg",
  },
  {
    id: makeId(),
    name: "Âm thầm bên em",
    url: "https://data38.chiasenhac.com/downloads/1897/2/1896712-abb56395/128/Am%20Tham%20Ben%20Em%20-%20Son%20Tung%20M-TP.mp3",
    singer: "Sơn Tùng M-TP",
    img: "https://data.chiasenhac.com/data/cover/87/86272.jpg",
  },
  {
    id: makeId(),
    name: "Chắc ai đó sẽ về",
    url: "https://data38.chiasenhac.com/downloads/1897/2/1896706-29b1415b/128/Chac%20Ai%20Do%20Se%20Ve%20-%20Son%20Tung%20M-TP.mp3",
    singer: "Sơn Tùng M-TP",
    img: "https://data.chiasenhac.com/data/cover/87/86272.jpg",
  },
];
