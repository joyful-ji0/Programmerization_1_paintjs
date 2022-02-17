const canvas = document.getElementById("jsCanvas")
// context!
const ctx = canvas.getContext('2d')
// class명으로 색상정보 가져오기
const colors = document.getElementsByClassName("jsColor")

// pixel modifier에게 canvas의 크기 지정해서 위치 알려주기
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2.5;

let painting = false;

function stopPainting () {
  painting = false;
};

function startPainting () {
  painting = true;
};

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  console.log(x, y);
  if (!painting) {
    // 아래 beginPath func 없어도 그림 잘 그려짐..!
    ctx.beginPath()
    ctx.moveTo(x, y)
  } else {
    ctx.lineTo(x,y)
    ctx.stroke() // 획 긋기
  }
};

// 이벤트 리스너에서 mousedown 보고 startpainting 해주기 때문에 onMouseDown function 삭제
// function onMouseDown (event) {
//   painting = true;
//   console.log(event);
// };

function handleColorClick (event) {
  // 스타일 속성 확인하기
  //console.log(event.target.style)
  // 스타일 속성 > backgroundColor 값 불러오기
  const color = event.target.style.backgroundColor
  // console.log(color)
  // 상단에 있던 style 속성 데려옴
  ctx.strokeStyle = color
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

// 색 값을 가져오기 위해 배열생성
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))