import React, { useEffect } from "react";
import cover from "./assets/poster.png";
import video from "./assets/lc.mp4";
import "./App.css";

var cookie = {
  set: function (name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie =
      name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  },
  get: function (name) {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
  del: function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.get(name);
    if (cval != null) {
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
  },
};

const Ckplayer = window.ckplayer;

function App() {
  let videoID = 10; //视频的区分ID，每个视频分配一个唯一的ID
  let cookieTime = cookie.get("time_" + videoID) - 0; //调用已记录的time

  if (!cookieTime) {
    //如果没有记录值，则设置时间0开始播放
    cookieTime = 0;
  }
  const timeHandler = (t) => {
    console.log(t);
    //当前视频播放时间写入cookie
    cookie.set("time_" + videoID, t);
  };
  let videoObject = {
    container: ".video", //“#”代表容器的ID，“.”或“”代表容器的class
    variable: "player", //该属性必需设置，值等于下面的new chplayer()的对象
    seek: cookieTime, //视频跳转播放时间
    poster: cover, // 封面图地址
    video: video, //视频地址,.m3u8也支持   PC
  };
  useEffect(() => {
    console.log(videoObject);
    const player = new Ckplayer(videoObject);
    player.time(timeHandler); //监听播放时间
  }, []);
  return (
    <div className="App">
      <div className="video"></div>
    </div>
  );
}

export default App;
