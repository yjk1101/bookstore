async function fetchBooks(query) {
    const REST_API_KEY = '7da520800b5f57deee3be3704a6408a8';
    const params = new URLSearchParams({
        target: "title",
        query,
        size: 50
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

// async function bookData() {
//     try {
//         // query와 section ID를 매핑
//         const queries = [
//             { query: "바이브 코딩", sectionId: "section2" },
//             // { query: "정원", sectionId: "sale" }
//         ];

//         for (const { query, sectionId } of queries) {
//             const data = await fetchBooks(query);

//             // 해당 섹션 내의 .box 요소 8개 선택
//             const section = document.querySelector(`#${sectionId}`);
//             const boxElements = section.querySelectorAll(".swiper-slide");

//             boxElements.forEach((box, i) => {
//                 const doc = data.documents[i];
//                 if (!doc) return;

//                 // 요소 생성 및 추가
//                 box.innerHTML = `<img src="${doc.thumbnail}">
//                         <h3>${doc.title}</h3>
//                         <h6>${doc.authors}</h6>
//                         <p>${doc.contents.substring(0, 60)}</p>
//                         <button>click</button>
//                         `
//             });
//         }
//     } catch (error) {
//         console.error('에러 발생:', error);
//     }
// }

async function bookData() {
    try {
        const queries = [
            { query: "바이브 코딩", sectionId: "section1" },
            { query: "베스트", sectionId: "section2" }
        ];

        for (const { query, sectionId } of queries) {

            const data = await fetchBooks(query);
            const section = document.querySelector(`#${sectionId}`);
            const wrapper = section.querySelector(".swiper-wrapper");


            // ========================================
            // section1
            // 3개의 swiper-slide
            // 각 slide 안에 9개의 책
            // ========================================

            if (sectionId === "section1") {

                wrapper.innerHTML = "";

                // swiper-slide 3개 생성
                for (let slideIndex = 0; slideIndex < 3; slideIndex++) {

                    const slide = document.createElement("div");
                    slide.classList.add("swiper-slide");

                    // slide 안에 책 9개 생성
                    for (let i = 0; i < 9; i++) {

                        const bookIndex = slideIndex * 9 + i;
                        const doc = data.documents[bookIndex];

                        if (!doc) break;

                        const book = document.createElement("div");
                        book.classList.add("slide_content2");

                        book.innerHTML = `
                            <img src="${doc.thumbnail}" alt="${doc.title}">
                            <h3>${doc.title}</h3>
                            <h6>${doc.authors}</h6>
                            <p>${doc.contents.substring(0, 60)}</p>
                            <button>click</button>
                        `;

                        slide.appendChild(book);
                    }

                    wrapper.appendChild(slide);
                }
            }


            // ========================================
            // section2
            // 8개의 swiper-slide
            // 각 slide에 책 1개
            // ========================================

            else if (sectionId === "section2") {

                wrapper.innerHTML = "";

                // swiper-slide 8개 생성
                for (let i = 0; i < 9; i++) {

                    const doc = data.documents[i];

                    if (!doc) break;

                    const slide = document.createElement("div");
                    slide.classList.add("swiper-slide");

                    slide.innerHTML = `
                        <img src="${doc.thumbnail}" alt="${doc.title}">
                        <h3>${doc.title}</h3>
                        <h6>${doc.authors}</h6>
                        <p>${doc.contents.substring(0, 60)}</p>
                        <button>click</button>
                    `;

                    wrapper.appendChild(slide);
                }
            }
        }
    } catch (error) {
        console.error('에러 발생:', error);
    }
}

bookData();
