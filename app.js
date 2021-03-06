const canvas = document.getElementById("jsCanvas")
const colors = document.getElementsByClassName("jsColor")
const ctx = canvas.getContext("2d")
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode")
const saveBtn = document.getElementById("jsSave")
const clearBtn = document.getElementById("jsClear")
const button = document.getElementById("picker_launcher")
const saveAs = document.getElementById("jsSaveAs")
const saveAsForm = document.getElementById("saveAsForm")
const saveAsOk = document.getElementById("saveAsOk")
const saveAsCancel = document.getElementById("saveAsCancel")
const saveAsName = document.getElementById("imageName")

const INITIAL_COLOR = "#2C2C2C"

const canvas_width = 600
const canvas_height = 500

canvas.width = canvas_width
canvas.height = canvas_height

ctx.fillStyle = "white"
ctx.fillRect(0,0,canvas_width,canvas_height)
ctx.strokeStyle = "INITIAL_COLOR"
ctx.fillStyle = "INITIAL_COLOR"
ctx.lineWidth = 2.5

let painting = false
let filling = false

function stopPainting(){
  painting = false
}

function startPainting() {
  painting = true
}

function onMouseMove(event){
  const x = event.offsetX
  const y = event.offsetY
  if (!painting) {
    ctx.beginPath()
    ctx.moveTo(x, y)
  } else {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

function onMouseUp(){
  stopPainting()
}

function changeColor(event){
  const color = event.target.style.backgroundColor
  ctx.strokeStyle = color
  ctx.fillStyle = ctx.strokeStyle
  button.style.backgroundColor = color
}

function rangeChange(event){
  console.log(event)
  const size = event.target.value
  ctx.lineWidth = size
}

function modeClick(){
  if(filling === true){
    filling = false
    mode.innerText = "Fill"
  }
  else{
    filling = true
    mode.innerText = "PAINT"
  }
}

function canvasClick(){
  if (filling){
    ctx.fillRect(0,0,canvas_width,canvas_height)
  }
}

function CM(event){
  event.preventDefault()
}

function saveClick(){
  const image = canvas.toDataURL()
  const link = document.createElement("a")
  link.href = image
  link.download = "PaintJS"
  link.click()
}

function clearClick(){
  ctx.clearRect(0,0,canvas_width,canvas_height)
}

function saveAsClick(){
  saveAsForm.classList.toggle("save")
}

function saveAsbtn(event){
  event.preventDefault()
  const savedName = saveAsName.value
  const image = canvas.toDataURL()
  const link = document.createElement("a")
  link.href = image
  link.download = savedName
  link.click()
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove)
  canvas.addEventListener("mousedown", startPainting)
  canvas.addEventListener("mouseup", stopPainting)
  canvas.addEventListener("mouseleave", stopPainting)
  canvas.addEventListener("click", canvasClick)
  canvas.addEventListener("contextmenu", CM)
}

saveAsOk.addEventListener("click", saveAsbtn)

saveAsCancel.addEventListener("click", (event) => {
  event.preventDefault()
  saveAsForm.classList.toggle("save")
})

Array.from(colors).forEach(color => color.addEventListener("click", changeColor))

if(range){
  range.addEventListener("input", rangeChange)
}

if(mode){
  mode.addEventListener("click",modeClick)
}

if(saveBtn){
  saveBtn.addEventListener("click", saveClick)
}

if(clearBtn){
  clearBtn.addEventListener("click", clearClick)
}

if(saveAs){
  saveAs.addEventListener("click", saveAsClick)
}

function customColor(event){
  const color = event.detail.color.hexa

  ctx.strokeStyle = color
  ctx.fillStyle = ctx.strokeStyle
}

localStorage.clear()

let picker = new ColorPicker(button, "#2C2C2C")
button.addEventListener("colorChange", customColor)