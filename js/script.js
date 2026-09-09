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


// 텝 - 더보기
const tabSeeMores = document.querySelectorAll('.tab_see_more');

tabSeeMores.forEach(section => {
  const tabMenu = section.querySelectorAll('.tab_menu li');
  const tabContent = section.querySelectorAll('.tabcontent');
  const btns = section.querySelectorAll('.tabcontent .see_more_btn button');

  // 페이지 로드 시 첫 번째 탭 표시 및 높이 자동 설정
  if (tabContent.length > 0) {
    tabContent[0].style.display = 'block';
    section.style.height = '360px';
  }

  // 1. 탭 메뉴 클릭 공통 처리
  tabMenu.forEach((tm, i) => {
    tm.addEventListener('click', () => {
      tabMenu.forEach(item => item.classList.remove('active'));
      tm.classList.add('active');

      // 탭 콘텐츠 보이기/숨기기 및 높이 자동 조절
      tabContent.forEach((tc, j) => {
        if (i === j) {
          tc.style.display = 'block';
        } else {
          tc.style.display = 'none';
        }
      });

      section.style.height = '360px';
      tabContent.forEach(tc => {
        tc.style.height = '300px';
      });
      btns.forEach(btn => {
        btn.innerHTML = '더보기 <i class="fa-solid fa-chevron-down"></i>';
        if (btn.parentElement) {
          btn.parentElement.classList.remove('show');
        }
      });
    });
  });

  // 2. '더보기' 버튼이 실제로 존재하는 섹션에만 클릭 이벤트 적용
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTc = btn.closest('.tabcontent');

      if (btn.textContent.includes('더보기')) {
        if (currentTc) {
          currentTc.style.height = 'auto'; 
          const contentHeight = currentTc.scrollHeight;
          section.style.height = (contentHeight + 60) + 'px';
        }
        btn.innerHTML = '접기 <i class="fa-solid fa-chevron-up"></i>';
        if (btn.parentElement) {
          btn.parentElement.classList.add('show');
        }
      } else {
        section.style.height = '360px';
        if (currentTc) {
          currentTc.style.height = '300px';
        }
        btn.innerHTML = '더보기 <i class="fa-solid fa-chevron-down"></i>';
        if (btn.parentElement) {
          btn.parentElement.classList.remove('show');
        }
      }
    });
  });
});


// 리뷰 - 별점
const starRating = document.querySelector('.star_rating');

if (starRating) {
  const stars = starRating.querySelectorAll('.star_rating .star');

  let savedRating = 0;

  stars.forEach((star, index) => {
    // 마우스를 올렸을 때
    star.addEventListener('mouseenter', () => {
      const hoverRating = index + 1;
      const displayRating = Math.max(hoverRating, savedRating);

      applyColor(displayRating);
    });

    // 클릭했을 때
    star.addEventListener('click', () => {
      savedRating = index + 1;

      applyColor(savedRating);
    });
  });

  // 마우스가 영역을 벗어났을 때
  starRating.addEventListener('mouseleave', () => {
    applyColor(savedRating);
  });

  // 색상 적용
  function applyColor(count) {
    stars.forEach((star, index) => {
      star.classList.toggle('active', index < count);
    });
  }
}





