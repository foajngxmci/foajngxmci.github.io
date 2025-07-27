/*  ---------------------------------------------------
    Theme Name: Anime
    Description: Anime video tamplate
    Author: Colorib
    Author URI: https://colorib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            FIlter
        --------------------*/
        $('.filter__controls li').on('click', function () {
            $('.filter__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.filter__gallery').length > 0) {
            var containerEl = document.querySelector('.filter__gallery');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    /*------------------
        Navigation
    --------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    // /*------------------
    //     Hero Slider
    // --------------------*/
    // var hero_s = $(".hero__slider");
    // hero_s.owlCarousel({
    //     loop: true,
    //     margin: 0,
    //     items: 1,
    //     dots: true,
    //     nav: true,
    //     navText: ["<span class='arrow_carrot-left'></span>", "<span class='arrow_carrot-right'></span>"],
    //     animateOut: 'fadeOut',
    //     animateIn: 'fadeIn',
    //     smartSpeed: 1200,
    //     autoHeight: false,
    //     autoplay: true,
    //     mouseDrag: false
    // });
    document.addEventListener('DOMContentLoaded', function () {
        const sliderEl = $('.hero__slider');

        // 1. Ambil data manga.json (pastikan CORS atau path benar)
        fetch('https://raw.githubusercontent.com/foajngxmci/foajngxmci.github.io/refs/heads/main/manga.json')
            .then(res => res.json())
            .then(data => {
                // 2. Acak dan pilih 3 item
                const selected = data
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 6);

                // 3. Jika sudah pernah inisialisasi, destroy dulu
                if (sliderEl.hasClass('owl-loaded')) {
                    sliderEl.trigger('destroy.owl.carousel').html('');
                } else {
                    sliderEl.html(''); // kosongkan static HTML
                }

                // 4. Bangun slide baru
                selected.forEach(manga => {
                    const item = $(`
                <div class="hero__items set-bg" data-setbg="${manga.poster}">
                    <div class="row">
                    <div class="col-lg-6 col-12">
                        <div class="hero__text">
                        <div class="label">${manga.tags[0] || ''}</div>
                        <h2>${manga.title}</h2>
                        <p>${manga.episodes} Episodes</p>
                        <a href="${manga.link}"><span>Read</span> <i class="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                    </div>
                </div>`);
                    sliderEl.append(item);
                });

                // 5. Set background image via data-setbg
                sliderEl.find('.set-bg').each(function () {
                    const bg = $(this).data('setbg');
                    $(this).css('background-image', `url(${bg})`);
                });

                // 6. Inisialisasi ulang Owl Carousel
                sliderEl.owlCarousel({
                    loop: true,
                    margin: 0,
                    items: 1,
                    dots: true,
                    nav: true,
                    navText: [
                        "<span class='arrow_carrot-left'></span>",
                        "<span class='arrow_carrot-right'></span>"
                    ],
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    smartSpeed: 1200,
                    autoHeight: false,
                    autoplay: true,
                    mouseDrag: false
                });

                const shuffled = [...data].sort(() => 0.5 - Math.random());
                const selectedTrending = shuffled.slice(0, 6);
                const container = document.getElementById('random-manga-container');

                selectedTrending.forEach(manga => {
                    const col = document.createElement('div');
                    col.className = 'col-lg-4 col-md-6 col-sm-6';
                    col.innerHTML = `
                            <div class="product__item">
                                <div class="product__item__pic set-bg" data-setbg="${manga.poster}">
                                    <div class="ep">${manga.episodes}</div>
                                    <div class="comment"><i class="fa fa-comments"></i> 11</div>
                                    <div class="view"><i class="fa fa-eye"></i> 9141</div>
                                </div>
                                <div class="product__item__text">
                                    <ul>
                                        ${manga.tags.map(tag => `<li>${tag}</li>`).join('')}
                                    </ul>
                                    <h5><a href="${manga.link}">${manga.title}</a></h5>
                                </div>
                            </div>
                            `;
                    container.appendChild(col);

                    // Set background image
                    const setBgDiv = col.querySelector('.set-bg');
                    setBgDiv.style.backgroundImage = `url(${manga.poster})`;
                });
            })
            .catch(err => console.error('Error loading manga.json:', err));
    });


    /*------------------
        Video Player
    --------------------*/
    const player = new Plyr('#player', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'captions', 'settings', 'fullscreen'],
        seekTime: 25
    });

    /*------------------
        Niceselect
    --------------------*/
    $('select').niceSelect();

    /*------------------
        Scroll To Top
    --------------------*/
    $("#scrollToTopButton").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

})(jQuery);


