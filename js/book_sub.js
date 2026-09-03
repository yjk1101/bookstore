async function bookData() {
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
        const subBookDetail = document.querySelector(".sub_book_detail");
        const priceBox = document.querySelector(".price_right");

        // 데이터에서 필요한 값 추출
        const book = data.documents[0];

        console.log(book);
        const { title, thumbnail, authors, price, publisher, sale_price } = book;

        // 요소 생성 및 추가
        subBookImg.innerHTML = `<img src="${thumbnail}" alt="${title}">`

        subBookTitle.textContent += title;

        subBookDetail.innerHTML = `
            <ul class="sub_txt_list">
                <li><span class="sub_book_author bold">${authors}</span> 저자</li>
            </ul>
            <ul class="sub_txt_list">
                <li><span class="sub_book_publisher bold">${publisher}</span> 출판</li>
            </ul>
        `

        priceBox.innerHTML = `
            <dl>
                <dt>종이책 정가</dt>
                <dd>${Number(price).toLocaleString()}원</dd>
            </dl>
            <dl>
                <dt>판매가</dt>
                <dd>${Number(sale_price).toLocaleString()}원</dd>
            </dl>
        `
    } catch (error) {
        console.log('에러발생', error);
    }
}

bookData();

//메모장으로 sub 텍스트 가져오기, 서버에 올려야 보임
// document.addEventListener("DOMContentLoaded", async function () {
//     try {
//         const response = await fetch("./sub_txt/txt1.txt");
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         const data = await response.text();
//         document.getElementById("tmpBox").innerHTML = data;
//     } catch (error) {
//         console.error("There was a problem with the fetch operation:", error);
//     }
// });

