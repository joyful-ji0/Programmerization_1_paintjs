const canvas = document.getElementById("jsCanvas")
// context!
const ctx = canvas.getContext('2d')
// class명으로 색상정보 가져오기
const colors = document.getElementsByClassName("jsColor")
// id로 brush size 값으로 쓰일 range 값 가져오기
const range = document.getElementById("jsRange")
// fill, line mode 전환을 위해 쓰일 값 가져오기
const mode = document.getElementById("jsMode")

// 무언가 값이나 단어가 반복되기 시작하면 새로운 변수 생성하는게 좋다
const INITIAL_COLOR = "#000000"
const CANVAS_SIZE = 800

// pixel modifier에게 canvas의 크기 지정해서 위치 알려주기
canvas.width = CANVAS_SIZE
canvas.height = CANVAS_SIZE

ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR
ctx.lineWidth = 2.5 

let painting = false
let filling = false


function stopPainting () {
  painting = false
}

function startPainting () {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX
  const y = event.offsetY
  console.log(x, y)
  if (!painting) {
    // 아래 beginPath func 없어도 그림 잘 그려짐..!
    ctx.beginPath()
    ctx.moveTo(x, y)
  } else {
    ctx.lineTo(x,y)
    ctx.stroke() // 획 긋기
  }
}

function handleColorClick (event) {
  // 스타일 속성 > backgroundColor 값 불러오기
  const color = event.target.style.backgroundColor
  // style 속성 변경
  ctx.strokeStyle = color
  ctx.fillStyle = color
}

function handleRangeChange (event) {
  console.log(event.target.value)
  const size = event.target.value
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false
    mode.innerText = "Fill"
  } else {
    filling = true
    mode.innerText = "Paint"
  }
}

function handleCanvasClick (event) {
  if (filling) {
  // 채워지는 사각형의 크기는 캔버스의 크기와 같아야 함
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

// 색 값을 가져오기 위해 배열생성
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

// range가 변경되는 것을 확인하려고
if (range) {
  range.addEventListener("input", handleRangeChange)
}

if (mode) {
  mode.addEventListener("click", handleModeClick)
}
