async function fetchBooks(query) {
    const REST_API_KEY = '7da520800b5f57deee3be3704a6408a8';
    const params = new URLSearchParams({
        target: "title",
        query,
        size: 30
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

async function bookData() {
    try {
        // query와 section ID를 매핑
        const queries = [
            { query: "최신", sectionId: "section1" },
            { query: "베스트", sectionId: "section2" },
            { query: "바이브 코딩", sectionId: "section3" },
            { query: "자기", sectionId: "section4" },
            { query: "오디세이", sectionId: "section5" }
        ];

        for (const { query, sectionId } of queries) {
            const data = await fetchBooks(query);
            const section = document.querySelector(`#${sectionId}`);
            const boxElements = section.querySelectorAll(".swiper-slide");

            //썸네일이 빈 문자열인것은 제외
            const origin = data.documents;
            let originFilter = origin.filter((val)=>{
                return val.thumbnail != '' && val.contents !='';
            })
            
            if (sectionId === "section2") {
                boxElements.forEach((box, i) => {
                    for (let j = 0; j < 9; j++) {

                        const bookIndex = i * 9 + j;
                        const doc = originFilter[bookIndex];

                        if (!doc) break;

                        const book = document.createElement("div");
                        book.classList.add("slide_content2");

                        book.innerHTML = `
                            <a href="" class="book_img"><img src="${doc.thumbnail}" alt="${doc.title}"></a>
                            <span class="num">${bookIndex + 1}</span>
                            <div class="book_info">
                                <a href="" class="book_tit"><p>${doc.title}</p></a>
                                <p class="book_author">${doc.authors}</p>
                                <p class="book_score"><span class="book_star"><i class="fa-solid fa-star"></i> 4.3</span> (1234)</p>
                            </div>
                        `;

                        box.appendChild(book);
                    }
                });
            }
            
            else if (sectionId === "section3") {
                boxElements.forEach((box, i) => {
                    const doc = originFilter[i];
                    if (!doc) return;

                    // 요소 생성 및 추가
                    box.innerHTML = `
                        <a href="" class="book_img"><img src="${doc.thumbnail}" alt="${doc.title}"></a>
                        <a href="" class="book_tit"><p>${doc.contents.substring(0, 60)}</p></a>
                    `;
                });
            }

            else if (sectionId === "section4") {
                const backgroundColors = ["#0E6434", "#745C14", "#7B043C", "#273563", "#158843", "#dd6f08"];

                boxElements.forEach((box, i) => {
                    for (let j = 0; j < 3; j++) {

                        const bookIndex = i * 3 + j;
                        const doc = originFilter[bookIndex];

                        if (!doc) break;

                        const bgColor = backgroundColors[bookIndex % backgroundColors.length];

                        const book = document.createElement("div");
                        book.classList.add("slide_content");

                        book.innerHTML = `
                            <a href="">
                                <div class="book_img_box">
                                    <div class="book_img_bg" style="background-color: ${bgColor};"></div>
                                    <img src="${doc.thumbnail}" alt="${doc.title}" class="book_img">
                                </div>
                                <p class="book_tit">${doc.contents.substring(0, 60)}</p>
                                <p class="book_author">${doc.title}</p>
                            </a>
                        `;

                        box.appendChild(book);
                    }
                });
            }

            else {
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
        }
    } catch (error) {
        console.error('에러 발생:', error);
    }
}

bookData();
