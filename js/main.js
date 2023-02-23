const frame = document.querySelector("section");
const articleArr = frame.querySelectorAll("article");
const len = articleArr.length;
const deg = 360 / len;

console.log(articleArr);
const names = [
  "cardio",
  "groove",
  "happy",
  "light",
  "lily",
  "limes",
  "pop",
  "swing",
];

for (let i = 0; i < len; i++) {
  articleArr[i].style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;
  // 돌리고 기준점을 이동

  // 사진부분 일괄 적용
  const pic = articleArr[i].querySelector(".pic");
  pic.style.backgroundImage = `url("../img/${names[i]}.jpg")`;

  // 음악 제목 일괄 적용
  const title = articleArr[i].querySelector(".text>h2");
  title.innerHTML = `${names[i]}`;

  // 음악 태그 & 파일 일괄적용
  const audio = document.createElement("audio");
  audio.setAttribute("src", `../music/${names[i]}.mp3`);
  audio.setAttribute("loop", "loop");
  articleArr[i].append(audio);
}

// Prev, Next 버튼 액션 처리
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");

let num = 0; // 회전 각도 조절용
let active = 0; // 활성화 패널 위치 기억용

prev.addEventListener("click", function (e) {
  frame.style.transform = `rotate(${deg * ++num}deg)`;
  //++num에서 ++를 앞에 붙여야 먼저 적용됨
  if (active === 0) {
    active = len - 1;
  } else {
    --active;
  }

  for (let el of articleArr) {
    el.classList.remove("on");
    // el.querySelector("audio").pause();
    // el.querySelector(".pic").classList.remove("on");
    // 두개 주석 풀면 그냥 넥스트 버튼 눌렀을때 노래재생 및 CD 회전 멈춤
  }
  articleArr[active].classList.add("on");
});

next.addEventListener("click", function () {
  frame.style.transform = `rotate(${deg * --num}deg)`;
  //--num에서 --를 앞에 붙여야 먼저 적용됨
  if (active === len - 1) {
    active = 0;
  } else {
    ++active;
  }

  for (let el of articleArr) {
    el.classList.remove("on");
    // el.querySelector("audio").pause();
    // el.querySelector(".pic").classList.remove("on");
    // 두개 주석 풀면 그냥 넥스트 버튼 눌렀을때 노래재생 및 CD 회전 멈춤
  }
  articleArr[active].classList.add("on");
});

// CD 모양 사진 회전 & 음악 파일 컨트롤
let before = 0; // 이전패널 위치 기억용 변수
for (let el of articleArr) {
  const play = el.querySelector(".play");
  //  document에서는 8개가 모두 선택됨으로 el의 play 클래스를 지목하는것
  const pause = el.querySelector(".pause");
  const reload = el.querySelector(".reload");

  play.addEventListener("click", function (e) {
    if (before === 0) {
      // 처음 실행을 시킬때
      before = e.target;
    } else if (before !== e.target) {
      // 처음 누른 재생버튼이 다른데에서 클릭한 재생버튼인지 아닌지 확인
      before.closest("article").querySelector(".pic").classList.remove("on");
      before.closest("article").querySelector("audio").pause();
      before = e.target;
    }
    e.target.closest("article").querySelector(".pic").classList.add("on");
    // 들 중에 제일 가까운걸 찾는 요소
    el.querySelector("audio").play();
  });
  pause.addEventListener("click", function (e) {
    el.querySelector(".pic").classList.remove("on");
    e.target.closest("article").querySelector("audio").pause();
    // 들 중에 제일 가까운걸 찾는 요소
  });

  reload.addEventListener("click", function (e) {
    if (before === 0) {
      // 처음 실행을 시킬때
      before = e.target;
    } else if (before !== e.target) {
      // 처음 누른 재생버튼이 다른데에서 클릭한 재생버튼인지 아닌지 확인
      before.closest("article").querySelector(".pic").classList.remove("on");
      before.closest("article").querySelector("audio").pause();
      before = e.target;
    }
    el.querySelector(".pic").classList.add("on");
    el.querySelector("audio").load();
    el.querySelector("audio").play();
  });
}
