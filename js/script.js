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
                    <a href="sub.html">
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


// 모달창
document.addEventListener('DOMContentLoaded', function() {
    // 1. 필요한 요소 선택
    const modalBtn1 = document.getElementById('modal_btn1');
    const modal1 = document.getElementById('modal1');
    
    if (!modal1) return;

    const goBackBtn = modal1.querySelector('.goback');
    const modalBody = modal1.querySelector('.modal_body');
    const slider = modal1.querySelector('#rangeSlider');
    const pageCountSpan = modal1.querySelector('#pageCount');
    const totalPageSpan = modal1.querySelector('#totalPage');
    const sections = modal1.querySelectorAll('.page-section');
    const navButtons = modal1.querySelectorAll('.modal_con_right nav button');
    
    // ★ 추가: 이전/다음 이동 버튼 선택
    const pagePrevBtn = modal1.querySelector('.page_prev');
    const pageNextBtn = modal1.querySelector('.page_next');

    // 2. 총 페이지 수(섹션 개수) 자동 계산 및 설정
    const totalPages = sections.length;
    if (slider) {
        slider.max = totalPages;
    }
    if (totalPageSpan) {
        totalPageSpan.textContent = totalPages;
    }

    // 3. 슬라이더 진행 바 색상(그라데이션) 업데이트 함수
    function updateSliderProgress(sliderEl, currentVal, maxVal) {
        if (!sliderEl) return;
        const min = sliderEl.min || 1;
        const percentage = ((currentVal - min) / (maxVal - min)) * 100;
        sliderEl.style.background = `linear-gradient(to right, #4a5568 ${percentage}%, #cbd5e0 ${percentage}%)`;
    }

    // 4. 현재 페이지에 맞는 목차 버튼 active 갱신 및 이전/다음 버튼 비활성화 상태 관리
    function updateActiveNav(activeId) {
        const currentIdNum = parseInt(activeId);

        // 목차 버튼 active 갱신
        navButtons.forEach(btn => {
            if (btn.getAttribute('data-id') === activeId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // ★ 첫 페이지면 '이전' 버튼 비활성화, 마지막 페이지면 '다음' 버튼 비활성화
        if (pagePrevBtn) {
            pagePrevBtn.disabled = (currentIdNum === 1);
        }
        if (pageNextBtn) {
            pageNextBtn.disabled = (currentIdNum === totalPages);
        }
    }

    // 공통 이동 함수 (중복 코드 방지용)
    function moveToPage(targetId) {
        const targetSection = modal1.querySelector(`.page-section[data-id="${targetId}"]`);

        if (targetSection && modalBody) {
            modalBody.scrollTo({
                top: targetSection.offsetTop - modalBody.offsetTop,
                behavior: 'smooth'
            });
            
            if (slider) {
                slider.value = targetId;
                updateSliderProgress(slider, targetId, totalPages);
            }
            if (pageCountSpan) {
                pageCountSpan.textContent = targetId;
            }
            updateActiveNav(targetId);
        }
    }

    // 5. Intersection Observer (스크롤 시 페이지 번호, 슬라이더, 목차 active 연동)
    const observerOptions = {
        root: modalBody,
        rootMargin: '0px',
        threshold: 0.5 // 섹션이 50% 이상 보일 때
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dataId = entry.target.getAttribute('data-id');
                
                if (slider) {
                    slider.value = dataId;
                    updateSliderProgress(slider, dataId, totalPages);
                }
                if (pageCountSpan) {
                    pageCountSpan.textContent = dataId;
                }
                updateActiveNav(dataId);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // 6. 하단 range 슬라이드 조작 시 해당 페이지로 이동
    if (slider) {
        slider.addEventListener('input', function() {
            moveToPage(this.value);
        });
    }

    // 7. 우측 목차 버튼 클릭 시 해당 섹션으로 이동
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-id');
            moveToPage(targetId);
        });
    });

    // 8. 이전 버튼 클릭 시
    if (pagePrevBtn) {
        pagePrevBtn.addEventListener('click', function() {
            const currentPage = parseInt(pageCountSpan.textContent);
            if (currentPage > 1) {
                moveToPage(String(currentPage - 1));
            }
        });
    }

    // 9. 다음 버튼 클릭 시
    if (pageNextBtn) {
        pageNextBtn.addEventListener('click', function() {
            const currentPage = parseInt(pageCountSpan.textContent);
            if (currentPage < totalPages) {
                moveToPage(String(currentPage + 1));
            }
        });
    }

    // 10. 모달 열기 및 닫기 제어
    if (modalBtn1) {
        modalBtn1.addEventListener('click', function() {
            modal1.classList.add('active');

            // 열릴 때 1페이지로 스크롤 및 상태 초기화
            if (modalBody) {
                modalBody.scrollTo({ top: 0, behavior: 'auto' });
            }
            if (slider) {
                slider.value = 1;
                updateSliderProgress(slider, 1, totalPages);
            }
            if (pageCountSpan) pageCountSpan.textContent = "1";
            updateActiveNav("1");
        });
    }

    if (goBackBtn) {
        goBackBtn.addEventListener('click', function() {
            modal1.classList.remove('active');
        });
    }
});

const fontIncreaseBtn = document.getElementById('fontIncreaseBtn');
const fontDecreaseBtn = document.getElementById('fontDecreaseBtn');
const storyTexts = document.querySelectorAll('.story-text');

const fontSizes = ['15px', '17px', '19px', '21px'];
let fontIndex = 1;

function updateFontSize() {
    storyTexts.forEach(text => {
        text.style.fontSize = fontSizes[fontIndex];
    });

    fontDecreaseBtn.disabled = (fontIndex === 0);
    fontIncreaseBtn.disabled = (fontIndex === fontSizes.length - 1);
}

// 크게 버튼 클릭 시
fontIncreaseBtn.addEventListener('click', function() {
    if (fontIndex < fontSizes.length - 1) {
        fontIndex++;
        updateFontSize();
    }
});

// 작게 버튼 클릭 시
fontDecreaseBtn.addEventListener('click', function() {
    if (fontIndex > 0) {
        fontIndex--;
        updateFontSize();
    }
});

updateFontSize();







