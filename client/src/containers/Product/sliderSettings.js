export default {
    dots: false,
    infinite: true,
    speed: 500,
    responsive: [
        {
            breakpoint: 2500,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 1100,
            settings: {
                arrows: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 700,
            settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 500,
            settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        },
    ]
}
