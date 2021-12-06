# paintjs
본 프로젝트는 nomadcoder의 바닐라 JS로 게임 만들기를 참고함  
[nomadcorder](https://nomadcoders.co/javascript-for-beginners-2/lobby)
---
## 목차
+ 프로젝트 소개
+ 코드 내용
+ 추가한 부분
+ 마치며
---
## 1. 프로젝트 소개
1.1 프로젝트 목적 
+ 바닐라 자바스크립트를 활용하는 실력을 기르기 위함
+ canvas에 대한 공부 및 활용

1.2 개발환경
+ window 10
+ vanilla js

## 2. 코드 내용
2.1 선 긋기
``` js
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
```
+ 왼쪽 버튼을 누르기 전에 캔버스 위에 있을 때 x, y좌표를 가져와서 시작점으로 설정
+ 왼쪽 버튼을 누르면 선을 그리기 시작함

2.2 채우기
``` js
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
```
+ filling이 참이면 색을 채움
+ filling이 거짓이면 일반 선긋기

2.3 저장
``` js
function saveClick(){
  const image = canvas.toDataURL()
  const link = document.createElement("a")
  link.href = image
  link.download = "PaintJS"
  link.click()
}
```
+ console.log(image)를 실행하면 이미자 console 창에 링크가 나옴
+ href에는 이미지를 download에는 이름을 넣음

## 3. 추가한 부분
3.1 clear(2021.12.2)
``` js
function clearClick(){
  ctx.clearRect(0,0,canvas_width,canvas_height)
}
```
+ clearRect를 활용하여 캔버스를 초기화

3.2 color picker(2021.12.2)
``` js
function customColor(event){
  const color = event.detail.color.hexa

  ctx.strokeStyle = color
  ctx.fillStyle = ctx.strokeStyle
}

localStorage.clear()

let picker = new ColorPicker(button, "#2C2C2C")
button.addEventListener("colorChange", customColor)
```
+ [colorpicker](https://r-tek.github.io/colr_pickr/index.html) 를 활용

3.3 save as(2021.12.3)
```js
function saveAsbtn(event){
  event.preventDefault()
  const savedName = saveAsName.value
  const image = canvas.toDataURL()
  const link = document.createElement("a")
  link.href = image
  link.download = savedName
  link.click()
}
```
+ 저장할 때 사용했던 소스를 응용하여 이름을 따로 입력받아 저장하게 만듬
---
## 4. 마치며
이 프로젝트를 진행하면서 단순히 강의를 보고 완성해서 끝내는 것이 아니라 거기에 내가 추가하고 싶은 내용들을 구글링해보면서 추가해보고 삽질도 해보면서 평소에 아무생각없이 사용했던 것들을 구현해본면서 이런식으로 작동이 되는 것이구나를 이해할 수 있었습니다.  
추가하고 싶은 것을 추가하려고 하니 찾는 시간, 코드 이해, 응용에 대해 생각해야 해서 빨리 끝날 줄 알았는데 생각보다 오래 걸렸습니다.  
원하는 색깔를 고를 수 있으면 좋겠다 싶어서 검색을 해보니 colorpicker의 종류가 3~4개 나와 그 중에 어떻걸 이 프로젝트에 적용하면 좋을 지 고민하였습니다. 평소에 많이 사용하는 save as를 구현하려고 검색해보니 어떻게 할지 몰라 막막해서 생각하다가 save에 사용한 코드를 응용해보자는 생각이 들어 문제를 해결 할 수 있었습니다.  
프로젝트를 진행하면서 다른 사람이 계발한 것을 활용하는 것에 너무 집중하고 있는 모습이 보였습니다. 물론 이미 완성된 코드를 활용하는 것도 중요하지만 내가 만들 수 있는지 없는지 충분히 생각하고 고민하는 시간을 가지는 것도 중요하다는 생각이 들었습니다. 