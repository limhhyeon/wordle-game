const 정답 = "HYEON";
let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const handleBackspace = () => {
    if (index > 0) {
      const preblock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preblock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const displaygameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임 종료";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; background-color:orange; width:200px; height:100px";
    document.body.appendChild(div);
  };

  const 다음줄 = () => {
    if (attempts === 6) return gameover();
    attempts = attempts + 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown);
    displaygameover();
    clearInterval(timer);
  };

  const Enterkey = () => {
    let 맞은갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const 글자 = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = 글자.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은갯수 = 맞은갯수 + 1;
        글자.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) 글자.style.background = "#C9B458";
      else 글자.style.background = "#787C7E";
      글자.style.color = "white";
    }
    if (맞은갯수 === 5) gameover();
    else 다음줄();
  };

  const handlekeydown = (event) => {
    const 키 = event.key.toUpperCase();
    const 키코드 = event.keyCode;
    const 현재블록 = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") Enterkey();
      else return;
    } else if (65 <= 키코드 && 키코드 <= 90) {
      현재블록.innerText = 키;
      index = index + 1;
    }
  };
  const startTimer = () => {
    const 시작_시간 = new Date();
    function 타이머() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const 시작 = document.querySelector("#timer");
      시작.innerText = `${분}:${초}`;
    }
    timer = setInterval(타이머, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handlekeydown);
}
appStart();
