//slider
var slider_swiper = new Swiper('.mySwiper', {
    navigation: {
        nextEl: '#slider .swiper-button-next',
        prevEl: '#slider .swiper-button-prev',
    },
});

//section1
var section1_swiper = new Swiper('.s1mySwiper', {
    navigation: {
        nextEl: '#section1 .swiper-button-next',
        prevEl: '#section1 .swiper-button-prev',
    },
});


var section2_swiper = new Swiper('.s2mySwiper', {
    slidesPerView: 6,
    spaceBetween: 10,
    navigation: {
        nextEl: '#section2 .swiper-button-next',
        prevEl: '#section2 .swiper-button-prev',
    },
});