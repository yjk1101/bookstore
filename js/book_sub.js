async function fetchBooks(query, target = "title", size = 10) {
    const REST_API_KEY = '7da520800b5f57deee3be3704a6408a8';

    const params = new URLSearchParams({
        target,
        query,
        size
    });
    
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
    }

    return response.json();
}

async function bookData2() {
    try {
        const data = await fetchBooks("그랬다고 적었다", "title");

        // 요소 선택
        const subBookTitle = document.querySelector(".sub_book_tit");
        const subBookImg = document.querySelector(".sub_book_img");
        const subBookauthor = document.querySelector(".sub_book_author");
        const subBookpubliser = document.querySelector(".sub_book_publisher");
        const oriPrice = document.querySelector(".ori_price");
        const salePrice = document.querySelector(".sale_price");
        const subBookName = document.querySelector(".sub_book_name");
        const subAuthorName = document.querySelector(".sub_author_name");


        // 데이터에서 필요한 값 추출
        const book = data.documents[0];
        const { title, thumbnail, authors, price, publisher, sale_price } = book;

        // 요소 생성 및 추가
        subBookImg.innerHTML = `<img src="${thumbnail}" alt="${title}">`
        subBookTitle.textContent += title;
        subBookauthor.textContent += authors;
        subBookpubliser.textContent += publisher;
        oriPrice.textContent += Number(price).toLocaleString() +'원';
        salePrice.textContent += Number(sale_price).toLocaleString() +'원';

        subBookName.textContent += title;
        subAuthorName.textContent += authors;
    } catch (error) {
        console.log('에러발생', error);
    }
}
bookData2();

document.addEventListener("DOMContentLoaded", async function () {
    // 텍스트를 불러와서 요소에 넣어주는 공통 함수
    async function loadTextFile(filePath, elementId) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}`);
            }
            const data = await response.text();
            document.getElementById(elementId).innerHTML = data;
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    }

    // 함수를 호출해서 각각 실행
    loadTextFile("./sub_txt/txt1.txt", "book_intro");
    loadTextFile("./sub_txt/txt2.txt", "book_table");
    loadTextFile("./sub_txt/txt3.txt", "book_author_intro");
});

async function bookData3() {
    try {
        const queries = [
            { query: "김애란", sectionId: "book_slide1", target: "authors" },
            { query: "이", sectionId: "book_slide2", target: "authors" },
            { query: "에세이", sectionId: "book_slide3", target: "title" },
            { query: "에세이", sectionId: "ranking", target: "title" },
        ];

        for (const { query, sectionId, target } of queries) {
            const data = await fetchBooks(query, target, 15);
            const section = document.querySelector(`#${sectionId}`);
            if (!section) continue;

            const origin = data.documents;
            let originFilter = origin.filter((val) => {
                return val.thumbnail != '' && val.contents != '' && val.title != '' && val.authors != '';
            });

            if (sectionId === "ranking") {
                const rankingList = section.querySelector(".ranking_list");
                if (!rankingList) continue;

                rankingList.innerHTML = '';
                for (let j = 0; j < 10; j++) {
                    const doc = originFilter[j];
                    const li = document.createElement('li');

                    li.innerHTML = `
                        <span>${j + 1}</span>
                        <a href="index.html">${doc.title}</a>
                    `;

                    rankingList.appendChild(li);
                }
            } else {
                const boxElements = section.querySelectorAll(".swiper-slide");
                boxElements.forEach((box, i) => {
                    const doc = originFilter[i];
                    if (!doc) return;

                    // 요소 생성 및 추가
                    box.innerHTML = `
                        <a href="index.html" class="book_img"><img src="${doc.thumbnail}" alt="${doc.title}"></a>
                        <a href="index.html" class="book_tit"><p>${doc.title}</p></a>
                        <p class="book_author">${doc.authors}</p>
                        <p class="book_score"><span class="book_star"><i class="fa-solid fa-star"></i> 4.2</span> (567)</p>
                    `;
                });
            }
        }
    } catch (error) {
        console.error('에러 발생:', error);
    }
}

// 리뷰 더보기 처리
function initReviewMore(container) {
    const reviewMoreBtns = container.querySelectorAll('.review_more_btn');

    reviewMoreBtns.forEach(btn => {
        const reviewBody = btn.closest('.review_body');
        const reviewText = reviewBody.querySelector('p');

        if (!reviewText) return;

        // 실제 내용 높이 확인
        if (reviewText.scrollHeight <= 90) {
            reviewText.style.height = 'auto';
            btn.style.display = 'none';
        } else {
            // 90px보다 크면 다시 90px로 설정
            reviewText.style.height = '90px';
            btn.style.display = 'block';
        }

        // 기존 이벤트가 중복 등록되지 않도록 한 번만 등록
        if (btn.dataset.initialized) return;

        btn.dataset.initialized = 'true';

        btn.addEventListener('click', () => {
            reviewText.style.height = 'auto';
            btn.style.display = 'none';
        });
    });
}


function waitForImagesLoaded(container) {
    const images = container.querySelectorAll('img');

    if (images.length === 0) {
        return Promise.resolve();
    }

    const promises = Array.from(images).map(img => {
        if (img.complete) {
            return Promise.resolve();
        }

        return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
        });
    });

    return Promise.all(promises);
}

// 텝 높이 처리
async function initTabAuto() {
    const tabAutos = document.querySelectorAll('.tab_auto');

    for (const section of tabAutos) {
        const tabMenu = section.querySelectorAll('.tab_menu li');
        const tabContent = section.querySelectorAll('.tabcontent');

        if (tabContent.length === 0) continue;

        // 첫 번째 콘텐츠만 표시
        tabContent.forEach((tc, j) => {
            tc.style.display = j === 0 ? 'block' : 'none';
        });

        // 탭 높이 계산
        async function setTabHeight(index) {
            const activeContent = tabContent[index];

            if (!activeContent) return;

            // 탭을 보여준 상태에서 리뷰 높이 계산
            initReviewMore(activeContent);

            // 이미지 로드 대기
            await waitForImagesLoaded(activeContent);

            // 이미지 로드 후 리뷰 높이 다시 계산
            initReviewMore(activeContent);

            const contentHeight = activeContent.scrollHeight;

            section.style.height = (contentHeight + 60) + 'px';
        }

        // 초기 높이
        await setTabHeight(0);

        // 탭 클릭
        tabMenu.forEach((tm, i) => {
            tm.addEventListener('click', async e => {
                e.preventDefault();

                // active
                tabMenu.forEach(item => {
                    item.classList.remove('active');
                });

                tm.classList.add('active');


                // 모든 탭 숨기기
                tabContent.forEach(tc => {
                    tc.style.display = 'none';
                });

                // 클릭한 탭 표시
                tabContent[i].style.display = 'block';


                // 탭을 클릭할 때마다 리뷰 높이 + 탭 높이 재계산
                await setTabHeight(i);
            });
        });
    }
}

async function init() {
    await bookData3();

    // 내부에서 이미지 로드 완료 후 높이 계산
    await initTabAuto();
}
init();