// ===== Полноэкранное меню =====
const openMenuBtn = document.getElementById('openMenu');
const closeMenuBtn = document.getElementById('closeMenu');
const fullscreenMenu = document.getElementById('fullscreenMenu');

openMenuBtn.addEventListener('click', () => {
    fullscreenMenu.classList.add('active');
});

closeMenuBtn.addEventListener('click', () => {
    fullscreenMenu.classList.remove('active');
});

// ===== Аккордеон =====
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    header.addEventListener('click', () => {
        // Закрыть все остальные
        accordionItems.forEach(i => {
            if(i !== item) {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.height = 0;
            }
        });

        item.classList.toggle('active');
        if(item.classList.contains('active')) {
            content.style.height = content.scrollHeight + "px";
        } else {
            content.style.height = 0;
        }
    });
});

// ===== Slick Slider =====
$(document).ready(function(){
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000
    });
});

// ===== Слайдшоу отзывов =====
const reviews = document.querySelectorAll('.review');
const avatars = document.querySelectorAll('.review-avatars img');

avatars.forEach(avatar => {
    avatar.addEventListener('click', () => {
        const index = avatar.dataset.index;

        // Убираем активность у всех
        reviews.forEach(r => r.classList.remove('active'));
        avatars.forEach(a => a.classList.remove('active'));

        // Делаем активным выбранный
        reviews[index].classList.add('active');
        avatar.classList.add('active');
    });
});

// ===== Форма заказа с AJAX =====
const orderForm = document.getElementById('orderForm');
const formMessage = document.getElementById('formMessage');

orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = orderForm.name.value.trim();
    const phone = orderForm.phone.value.trim();
    const email = orderForm.to.value.trim();
    const comment = orderForm.comment.value.trim();

    if(!name || !phone || !email) {
        formMessage.textContent = "Пожалуйста, заполните все обязательные поля!";
        formMessage.style.color = "red";
        return;
    }

    const data = { name, phone, comment, to: email };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
        const response = JSON.parse(xhr.responseText);
        if(response.status === 'ok') {
            formMessage.textContent = response.message;
            formMessage.style.color = "green";
            orderForm.reset();
        } else {
            formMessage.textContent = response.message;
            formMessage.style.color = "red";
        }
    }
    xhr.send(JSON.stringify(data));
});
