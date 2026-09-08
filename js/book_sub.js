async function bookData2() {
    const REST_API_KEY = '7da520800b5f57deee3be3704a6408a8';
    const params = new URLSearchParams({
        target: "title",
        query: "그랬다고 적었다"
    });

    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `KakaoAK ${REST_API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();

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

async function fetchBooks(query) {
    const REST_API_KEY = '7da520800b5f57deee3be3704a6408a8';
    const params = new URLSearchParams({
        target: "authors",
        query,
        size: 15
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
    }

    return response.json();
}

async function bookData3() {
    try {
        // query와 section ID를 매핑
        const queries = [
            { query: "김애란", sectionId: "book_slide1" }
        ];

        for (const { query, sectionId } of queries) {
            const data = await fetchBooks(query);
            const section = document.querySelector(`#${sectionId}`);
            const boxElements = section.querySelectorAll(".swiper-slide");

            //썸네일이 빈 문자열인것은 제외
            const origin = data.documents;
            let originFilter = origin.filter((val)=>{
                return val.thumbnail != '' && val.contents !='' && val.title !='' && val.authors !='';
            })
            
            boxElements.forEach((box, i) => {
                const doc = originFilter[i];
                if (!doc) return;

                // 요소 생성 및 추가
                box.innerHTML = `
                    <a href="" class="book_img"><img src="${doc.thumbnail}" alt="${doc.title}"></a>
                    <a href="" class="book_tit"><p>${doc.title}</p></a>
                    <p class="book_author">${doc.authors}</p>
                    <p class="book_score"><span class="book_star"><i class="fa-solid fa-star"></i> 4.2</span> (567)</p>
                `;
            });
        }
    } catch (error) {
        console.error('에러 발생:', error);
    }
}

function waitForImagesLoaded(container) {
    const images = container.querySelectorAll('img');
    if (images.length === 0) return Promise.resolve();

    const promises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
        });
    });
    return Promise.all(promises);
}

async function initTabAuto() {
    const tabAutos = document.querySelectorAll('.tab_auto');

    for (const section of tabAutos) {
        const tabMenu = section.querySelectorAll('.tab_menu li');
        const tabContent = section.querySelectorAll('.tabcontent');

        if (tabContent.length === 0) continue;

        // 첫 번째 콘텐츠만 보이게 설정
        tabContent.forEach((tc, j) => {
            tc.style.display = j === 0 ? 'block' : 'none';
        });

        // 높이 계산 및 설정 함수 (이미지 로드 대기 포함)
        async function setTabHeight(index) {
            const activeContent = tabContent[index];
            // 해당 탭 콘텐츠 내부의 이미지가 로드될 때까지 대기
            await waitForImagesLoaded(activeContent);
            const contentHeight = activeContent.scrollHeight;
            section.style.height = (contentHeight + 60) + 'px';
        }

        // 초기 높이 설정 (데이터가 모두 그려진 뒤이므로 이미지 로드 후 계산)
        await setTabHeight(0);

        // 탭 클릭 이벤트
        tabMenu.forEach((tm, i) => {
            tm.addEventListener('click', async e => {
                e.preventDefault();

                tabMenu.forEach(item => item.classList.remove('active'));
                tm.classList.add('active');

                tabContent.forEach((tc, j) => {
                    tc.style.display = i === j ? 'block' : 'none';
                });

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