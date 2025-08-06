"use strict";

// BURGER MENU
document.addEventListener("click", handleClick);

function handleClick(e) {
    const targetElement = e.target;
    if (targetElement.closest('.header__burger')) {
        document.body.classList.toggle('burger-open');
        document.body.classList.toggle('no-scroll');
    }
}

// SLIDER TESTIMONIALS

const testimonialsSlider = document.querySelector('.testimonials');
if(testimonialsSlider) {
	const swiper = new Swiper('.testimonials__container', {
		loop: true,
		autoHeight: true,
		speed: 1000,
		
		pagination: {
		  el: '.swiper-pagination',
		  clickable: true,
		},
	});
}


// TABS

document.addEventListener("click", tabsClick);
function tabsClick(e) {
    const targetElement = e.target;
    if (targetElement.closest('[data-tabs-button]')) {
        const currentElement = targetElement.closest('[data-tabs-button]');
        setTab(currentElement);
    }
}

function setTab(tabElement) {
    const TabsParent = tabElement.closest('[data-tabs]');
    if (!TabsParent) return;

    const tabsButtons = Array.from(TabsParent.querySelectorAll('[data-tabs-button]'));
    const tabsActiveButton = TabsParent.querySelector('[data-tabs-button].active');

    if (tabsActiveButton) {
        tabsActiveButton.classList.remove('active');
    }

    tabElement.classList.add('active');
    const currentButtonIndex = tabsButtons.indexOf(tabElement);

    const tabsElements = TabsParent.querySelectorAll('[data-tabs-element]');

    tabsElements.forEach(tabElement => {
        tabElement.hidden = true;
    });

    if (tabsElements[currentButtonIndex]) {
        tabsElements[currentButtonIndex].hidden = false;
    }
}

// SLIDER BLOG

const blogSlider = document.querySelector('.blog');
if(blogSlider) {
	const swiperBlog = new Swiper('.blog__body', {
		loop: true,
		autoHeight: true,
		speed: 1000,
        slidesPerView: 2,
        spaceBetween: 57,
		
		pagination: {
		  el: '.swiper-pagination',
		  clickable: true,
		},

        breakpoints: {
        320: {
          slidesPerView: 1,  
        },
        
        768: {
          slidesPerView: 2,  
        }
        }
	});
}

// COUNTER WHEN IN VIEWPORT

document.addEventListener("DOMContentLoaded", function() {
    // Функция для анимации счетчика
    function animateCounter(element, start, end, duration) {
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const value = Math.min(start + (end - start) * (progress / duration), end);

            // Пока анимация идет, показываем без запятых
            element.textContent = Math.floor(value); 

            if (progress < duration) {
                window.requestAnimationFrame(step);
            } else {
                // После завершения анимации добавляем запятые
                element.textContent = Math.floor(value).toLocaleString();
            }
        }

        window.requestAnimationFrame(step);
    }

    // Функция, которая будет отслеживать попадание во вьюпорт
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Запуск анимации, когда элемент становится видимым
                const counter = entry.target.querySelector('.counter');
                
                // Убираем запятые из строки для расчета числа
                const endValue = parseInt(counter.textContent.replace(/,/g, ''), 10);

                animateCounter(counter, 0, endValue, 2000); // 2000 ms (2 секунды)
                observer.unobserve(entry.target); // Остановить отслеживание после анимации
            }
        });
    }

    // Создаем новый IntersectionObserver
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5 // Элемент считается видимым, когда 50% его площади видны в окне
    });

    // Получаем все элементы с классом 'num' и начинаем их отслеживать
    const proofItems = document.querySelectorAll('.facts__item');
    proofItems.forEach(item => {
        observer.observe(item);
    });
});