/*
document.addEventListener("DOMContentLoaded", function (event) {
    const modal = document.querySelector('.modal');
    const modalBtn = document.querySelectorAll('[data-toggle=modal]');
    const closeBtn = document.querySelector('.modal__close');
    const switchModal = () => {
        modal.classList.toggle('modal--visible');
    };
    modalBtn.forEach(element => {
        element.addEventListener('click', switchModal);
    });
    closeBtn.addEventListener('click', switchModal);
});*/

$(document).ready(function () {
    var modal = $('.modal'),
        success = $('.success'),
        successClose = $('.success__close'),
        successBtn = $('.success__button');
        modalBtn = $('[data-toggle=modal]'),
        scrollUp = $('.scroll-up'),
        closeBtn = $('.modal__close');

    modalBtn.on('click', function () {
        modal.toggleClass('modal--visible');
    });
    closeBtn.on('click', function () {
        modal.toggleClass('modal--visible');
    });

    successClose.on('click', function () {
        success.toggleClass('success--visible');
    });

    successBtn.on('click', function () {
        success.toggleClass('success--visible');
    });

    scrollUp.on('click', function () {
        $('html').animate({scrollTop: 0}, 1100);
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            scrollUp.addClass('visible');
        } else {
            scrollUp.removeClass('visible');
        }
    });

    //initialize swiper when document ready
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    var next = $('.swiper-button-next');
    var prev = $('.swiper-button-prev');
    var bullets = $('.swiper-pagination');

    next.css('left', prev.width() + 20 + bullets.width() + 20);
    bullets.css('left', prev.width() + 20);


    //initialize swiper when document ready
    var mySwiper2 = new Swiper('.steps__swiper-container', {
        // loop: true,
        pagination: {
            el: '.steps__swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.steps__swiper-button-next',
            prevEl: '.steps__swiper-button-prev',
        },
    });
    new WOW().init();

    // Валидация формы
    $('.modal__form').validate({
        errorPlacement: function (error, element) {
            if (element.attr("name") === "modal__policyCheckbox") {
                return element.next('label').append(error);
            }

            error.insertAfter($(element));
        },
        errorElement: "div",
        errorClass: "invalid",
        rules: {
            userName: {
                required: true,
                minlength: 2
            },
            userPhone: "required",
            userEmail: {
                required: true,
                email: true
            },
            modal__policyCheckbox: "required"
        },
        messages: {
            userName: {
                required: "Заполните поле",
                minlength: "Имя не короче 2 символов"
            },
            userPhone: "Заполните поле",
            userEmail: {
                required: "Заполните поле",
                email: "Введите корректный email"
            },
            modal__policyCheckbox: "Установите флажок"
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: "send.php",
                data: $(form).serialize(),
                success: function (response) {
                    $(form)[0].reset();
                    modal.removeClass('modal--visible');
                    success.toggleClass('success--visible');
                }
            })
        }
    });


    $('.control__form').validate({
        errorPlacement: function (error, element) {
            if (element.attr("name") === "control__policyCheckbox") {
                return element.next('label').append(error);
            }

            error.insertAfter($(element));
        },
        errorElement: "div",
        errorClass: "invalid",
        rules: {
            userName: {
                required: true,
                minlength: 2
            },
            userPhone: "required",
            control__policyCheckbox: "required"
        },
        messages: {
            userName: {
                required: "Заполните поле",
                minlength: "Имя не короче 2 символов"
            },
            userPhone: "Заполните поле",
            control__policyCheckbox: "Установите флажок",
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: "send.php",
                data: $(form).serialize(),
                success: function (response) {
                    $(form)[0].reset();
                    success.toggleClass('success--visible');
                }
            })
        }

    });


    $('.footer__form').validate({
        errorPlacement: function (error, element) {
            if (element.attr("name") === "footer__policyCheckbox") {
                return element.next('label').append(error);
            }

            error.insertAfter($(element));
        },
        errorElement: "div",
        errorClass: "invalid",
        rules: {
            // simple rule, converted to {required:true}
            userName: {
                required: true,
                minlength: 2,
                maxlength: 15
            },
            userPhone: "required",
            // compound rule
            userEmail: {
                required: true,
                email: true
            },
            userQuestion: "required",
            footer__policyCheckbox: "required"
        },
        messages: {
            userName: {
                required: "Заполните поле",
                minlength: "Имя не короче 2 символов",
                maxlength: "Имя не больше 15 символов"
            },
            userPhone: "Заполните поле",
            userQuestion: "Заполните поле",
            userEmail: {
                required: "Заполните поле",
                email: "Введите корректный email"
            },
            footer__policyCheckbox: "Установите флажок"
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: "send.php",
                data: $(form).serialize(),
                success: function (response) {
                    $(form)[0].reset();
                    success.toggleClass('success--visible');
                }
            })
        }

    });

    // Маска для номера телефона
    $('[type=tel]').mask('+7(000) 000-00-00', {placeholder: "+7 (___) ___-__-__"});

    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
                center: [55.751574, 37.573856],
                zoom: 9,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            }),/*
            myMap.controls.add('zoomControl', {
                size: "small"
        }),*/
            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),

            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: 'Собственный значок метки',
                balloonContent: 'Это красивая метка'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/my-face.jpg',
                // Размеры метки.
                iconImageSize: [32, 32],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
            });

        myMap.geoObjects
            .add(myPlacemark);
    });

});

