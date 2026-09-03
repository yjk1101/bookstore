// footer show/hide
const ownerInfo = document.querySelector('.owner_info');
const footerToggle = document.getElementById('footer_toggle');

if (ownerInfo && footerToggle) {
    ownerInfo.addEventListener('click', function (e) {
        footerToggle.classList.toggle('show');
    });
}

// slider
const slideData = [
    // 첫 번째 swiper-slide 그룹
    [
        {
            img: "./img/slide1.jpg",
            title: "왔어요! 리디샵<br>공식 굿즈 스토어 오픈",
            desc: "지금 바로 리디 공식 굿지샵을 만나 보세요."
        },
        {
            img: "./img/slide2.jpg",
            title: "[50년 대여]<br>제인 오스틴 전집",
            desc: "전 7권 세트 30% 할인"
        },
        {
            img: "./img/slide3.jpg",
            title: "[50년 대여 세트]<br>은하 영웅 전설",
            desc: "만화 세트도 함께 기간 한정 오픈!"
        }
    ],
    // 두 번째 swiper-slide 그룹
    [
        {
            img: "./img/slide4.jpg",
            title: "오딧세이 개봉 기념<br>고전 특가 대여전",
            desc: "추가 할인 쿠폰 + 리뷰 전원 포인트"
        },
        {
            img: "./img/slide5.jpg",
            title: "&lt;교토탐정홈즈&gt;<br>전권 특가 세트",
            desc: "전 18권 세트 소장 30% 할인"
        },
        {
            img: "./img/slide6.jpg",
            title: "장편 스토리 작법서<br>&lt;웹소설의 BIBLE&gt;",
            desc: "출간 기념 대여 할인 + 리뷰 전원 포인트"
        }
    ]
];

function renderSlides() {
    const slider = document.getElementById("slider");

    if (!slider) return;

    const wrapper = slider.querySelector('.swiper-wrapper');

    if (!wrapper) return;
    
    let html = '';

    slideData.forEach(group => {
        html += `<div class="swiper-slide">\n`;
        
        group.forEach(item => {
            html += `
                <div class="slide_content">
                    <a href="">
                        <img src="${item.img}" alt="">
                        <div class="slide_info">
                            <p class="slide_tit">${item.title}</p>
                            <p class="book_tit">${item.desc}</p>
                        </div>
                    </a>
                </div>
            `;
        });

        html += `</div>\n`;
    });

    wrapper.innerHTML = html;
}
renderSlides();



const tabMenu = document.querySelectorAll('.tab_menu li');
const tabContent = document.querySelectorAll('.tabcontent');
// 더보기
const section = document.querySelector('.tab_section');
const btns = document.querySelectorAll('.tabcontent button');

// 탭메뉴 클릭
tabMenu.forEach((tm, i) => {
  tm.addEventListener('click', () => {
    // 모든 탭 메뉴에서 'active' 클래스 제거
    tabMenu.forEach(item => {
      item.classList.remove('active');
    });

    // 클릭한 탭 메뉴에만 'active' 클래스 추가
    tm.classList.add('active');

    // 탭에 해당하는 리스트 보이고, 나머지는 숨기기
    tabContent.forEach((tc, j) => {
      tc.style.display = (i === j) ? 'flex' : 'none';
      section.style.height = '350px';
      tc.style.height = '300px';
      btns[i].innerText = '더보기'
    });
  });
});

// 더보기 클릭
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.textContent == '더보기') {
      section.style.height = '550px';
      tabContent.forEach(tc => {
        tc.style.height = '500px';
      });
      btn.innerText = '접기'
    } else {
      section.style.height = '350px';
      tabContent.forEach(tc => {
        tc.style.height = '300px';
      });
      btn.innerText = '더보기'
    }
  });
});