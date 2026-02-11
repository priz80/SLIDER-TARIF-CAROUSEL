// Данные тарифов
const tariffs = [
  { title: "Сайт \"Каталог\"", price: "от 60.000Р", time: "От 15 дней" },
  { title: "Сайт \"Визитка\"", price: "от 30.000Р", time: "От 7 дней" },
  { title: "Корпоративный сайт", price: "от 120.000Р", time: "От 30 дней" },
  { title: "Интернет-магазин", price: "от 150.000Р", time: "От 45 дней" },
  { title: "Landing Page", price: "от 40.000Р", time: "От 10 дней" },
  { title: "Сайт-портфолио", price: "от 50.000Р", time: "От 12 дней" },
  { title: "Блог или журнал", price: "от 70.000Р", time: "От 20 дней" }
];

// Элементы
const slider = document.getElementById('slider');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');

let slideWidth, gap, step, slideCount, totalWidth;
const transitionTime = 0.7; // секунды

// Генерация слайдов + клонирование
function renderSlides() {
  slider.innerHTML = '';

  // Создаём основные слайды
  tariffs.forEach(tariff => {
    const slide = document.createElement('div');
    slide.className = 'slide-tarif';
    slide.innerHTML = `
      <div class="slide-text_block">
        <div class="slide-title">${tariff.title}</div>
        <div class="slide-subtitle">
          Сайт-каталог – это полноценный веб-ресурс, в котором потребители могут ознакомиться с товарами или услугами компании.
        </div>
        <div class="slide-price_block">
          <div class="price">${tariff.price}</div>
          <div class="time">${tariff.time}</div>
          <button>Заказать</button>
        </div>
      </div>
    `;
    slider.appendChild(slide);
  });

  // Клонируем первый и последний слайды
  const firstSlide = slider.children[0].cloneNode(true);
  const lastSlide = slider.children[slider.children.length - 1].cloneNode(true);

  // Добавляем в конец и начало
  slider.appendChild(firstSlide); // после последнего
  slider.insertBefore(lastSlide, slider.firstChild); // перед первым

  slideCount = slider.children.length; // теперь 9 (7 оригиналов + 2 клона)
}

// Обновление размеров
function updateConfig() {
  const innerWidth = window.innerWidth;

  if (innerWidth >= 992) {
    slideWidth = 370;
    gap = 32;
  } else {
    slideWidth = 280;
    gap = 20;
  }

  step = slideWidth + gap;

  // Устанавливаем активный слайд (оригинальный первый — теперь на позиции 1 из-за клона)
  const initialPosition = -step;
  slider.style.transition = 'none';
  slider.style.transform = `translateX(${initialPosition}px)`;
}

// Движение
function moveSlider(direction) {
  // direction: +1 ← (назад), -1 → (вперёд)
  const currentPosition = parseInt(slider.style.transform.split('translateX(')[1]) || 0;
  let newPosition = currentPosition - direction * step;

  // Плавное движение
  slider.style.transition = `${transitionTime}s`;
  slider.style.transform = `translateX(${newPosition}px)`;

  // После анимации проверяем границы
  setTimeout(() => {
    if (newPosition <= -(step * (slideCount - 1))) {
      // Если ушли за последний слайд → прыгаем на первый реальный
      slider.style.transition = 'none';
      slider.style.transform = `translateX(${-step}px)`;
    } else if (newPosition >= 0) {
      // Если ушли перед первый → прыгаем на последний реальный
      slider.style.transition = 'none';
      slider.style.transform = `translateX(${-step * (slideCount - 2)}px)`;
    }
  }, transitionTime * 1000);
}

// Инициализация
function init() {
  renderSlides();
  updateConfig();

  btnLeft.addEventListener('click', () => moveSlider(1));  // ←
  btnRight.addEventListener('click', () => moveSlider(-1)); // →

  window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
      updateConfig();
    }, 100);
  });
}

window.addEventListener('load', init);