export default {
    dots: false,
    infinite: true,
    speed: 500,
    responsive: [
        {
            breakpoint: 2500,
            settings: {
                arrows: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                pauseOnHover: true
            }
        },
        {
            breakpoint: 1100,
            settings: {
                arrows: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                pauseOnHover: true
            }
        },
        {
            breakpoint: 700,
            settings: {
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                pauseOnHover: true
            }
        },
        {
            breakpoint: 500,
            settings: {
                arrows: true,
                autoplaySpeed: 5000,
                autoplay: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                pauseOnHover: true
            }
        },
    ]
}
