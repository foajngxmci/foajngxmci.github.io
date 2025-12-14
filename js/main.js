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


    document.addEventListener('DOMContentLoaded', function () {
        const sliderEl = $('.hero__slider');

        // Ambil data manga.json (pastikan CORS atau path benar)
        fetch('https://raw.githubusercontent.com/foajngxmci/foajngxmci.github.io/refs/heads/main/manga.json')
            .then(res => res.json())
            .then(data => {

                /* --------------------------- CAROUSEL RANDOM -----------------------------------*/
                // Acak dan pilih 3 item
                const selected = data
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 6);

                // Jika sudah pernah inisialisasi, destroy dulu
                if (sliderEl.hasClass('owl-loaded')) {
                    sliderEl.trigger('destroy.owl.carousel').html('');
                } else {
                    sliderEl.html(''); // kosongkan static HTML
                }

                // Bangun slide baru
                selected.forEach(manga => {
                    let labelCarousel = ``;
                    for (let i = 0; i < manga.tags.length; i++) {
                        labelCarousel += `<div class="label">${manga.tags[i]}</div> `;
                    }

                    const item = $(`
                <div class="hero__items set-bg" data-setbg="${manga.poster}">
                    <div class="row">
                    <div class="col-lg-6 col-12">
                        <div class="hero__text">
                        ${labelCarousel}
                        <h2>${manga.title}</h2>
                        <p>${manga.episodes} Chapter  -  ${manga.pages} Pages</p>
                        <a href="${manga.link}"><span>Read ></span></a>
                        </div>
                    </div>
                    </div>
                </div>`);
                    sliderEl.append(item);
                });

                // Set background image via data-setbg
                sliderEl.find('.set-bg').each(function () {
                    const bg = $(this).data('setbg');
                    $(this).css('background-image', `url(${bg})`);
                });

                // Inisialisasi ulang Owl Carousel
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
                /* --------------------------- END CAROUSEL RANDOM -----------------------------------*/


                /* ---------------------------- RANDOM TRENDING NOW ------------------------------*/
                const shuffled = [...data].sort(() => 0.5 - Math.random());
                const selectedTrending = shuffled.slice(0, 6);
                const container = document.getElementById('random-manga-container');

                selectedTrending.forEach(manga => {
                    const isCensored = manga.censor === "Censored";
                    const censorClass = isCensored ? "censored" : "uncensored";
                    const censorLabel = isCensored ? "CEN" : "UNC";

                    const col = document.createElement('div');
                    col.className = 'col-lg-4 col-md-6 col-sm-6';
                    col.innerHTML = `
                            <div class="product__item">
                                <div class="product__item__pic set-bg" data-setbg="${manga.poster}">
                                    <div class="${censorClass}">${censorLabel}</div>
                                    <div class="comment"><i class="fa fa-photo"></i> ${manga.pages}</div>
                                    <div class="view"><i class="fa fa-book"></i> ${manga.episodes} </div>
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
                /* ----------------------------- END RANDOM TRENDING NOW ------------------------------*/

                /* ----------------------------- SIDEBAR FILTER TAG ------------------------------*/
                const allTags = new Set(["Uncensored", "MILF", "Story Arc"]);
                const defaultTag = "Uncensored";

                const tagFilterList = document.getElementById('tag-filter-list');
                const filterContainer = document.getElementById('filtered-manga-container');

                // Tambahkan tombol filter
                allTags.forEach(tag => {
                    const li = document.createElement('li');
                    li.textContent = tag;
                    li.dataset.tag = tag;
                    li.style.cursor = 'pointer';
                    if (tag === defaultTag) li.classList.add('active');
                    tagFilterList.appendChild(li);
                });

                // Fungsi render manga berdasarkan tag (acak 4)
                function renderFilteredManga(selectedTag) {
                    const filtered = data.filter(manga => manga.tags.includes(selectedTag));
                    const shuffled = filtered.sort(() => 0.5 - Math.random());
                    const selectedItems = shuffled.slice(0, 4);

                    filterContainer.innerHTML = '';

                    selectedItems.forEach(manga => {
                        const item = document.createElement('div');
                        item.className = 'product__sidebar__view__item set-bg';
                        item.style.backgroundImage = `url(${manga.poster})`;
                        item.innerHTML = `
                        <div class="ep">${manga.episodes} eps</div>
                        <div class="view"><i class="fa fa-eye"></i> 9999</div>
                        <h5><a href="${manga.link}">${manga.title}</a></h5>
                    `;
                        filterContainer.appendChild(item);
                    });
                }

                // Tampilkan default saat pertama kali
                renderFilteredManga(defaultTag);

                // Event klik tombol tag
                tagFilterList.addEventListener('click', function (e) {
                    if (e.target && e.target.dataset.tag) {
                        const selectedTag = e.target.dataset.tag;

                        // Toggle active class
                        document.querySelectorAll('#tag-filter-list li').forEach(li => li.classList.remove('active'));
                        e.target.classList.add('active');

                        renderFilteredManga(selectedTag);
                    }
                });
                /* ----------------------------- END SIDEBAR FILTER TAG ------------------------------*/

                /* ---------------------------------- KONFIRMASI LARGE FILES ------------------------------ */
                data.forEach(manga => {
                    const links = document.querySelectorAll(`a[href="${manga.link}"]`);

                    links.forEach(link => {
                        link.addEventListener("click", function (e) {
                            if (manga.large_files === "yes") {
                                e.preventDefault();

                                const confirmOpen = confirm(
                                    "File gambar terlalu besar, hanya bisa dibuka di file server lokal.\nTetap buka?"
                                );

                                if (confirmOpen) {
                                    window.location.href = manga.link;
                                }
                            }
                        });
                    });
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


