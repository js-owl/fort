export const configurationHero = {
  title: "Конфигурация\nпод вашу задачу",
  text: "Гибкое сочетание радиолокации, оптики, программной платформы и инженерных решений для эффективной защиты вашего объекта",
  image: "/images/configurations/hero.png",
  imageAlt:
    "Промышленный комплекс с периметром обнаружения и средствами защиты Форт-9",
  cta: "Обсудить задачу",
  ctaHref: "/#contact",
} as const;

export const configurationMatrix = {
  title: "Состав определяется\nпосле анализа объекта",
  text: "Проводим анализ задач, особенностей территории и существующей инфраструктуры, чтобы предложить оптимальную конфигурацию",
  caption: "Комплектация под модели угроз",
  background: "/images/configurations/matrix-bg.png",
} as const;

export const configurationColumns = [
  { name: "Старт", threat: "Умеренная", platform: "Объект" },
  { name: "Плюс", threat: "Средняя", platform: "Объект + регион" },
  { name: "Экстра", threat: "Высокая", platform: "Объект + регион" },
  { name: "Элит", threat: "Критическая", platform: "Объект + регион" },
] as const;

export const configurationRows = [
  { label: "Пункт управления", included: [false, true, true, true] },
  {
    label: "Резервный пункт управления",
    included: [false, false, false, true],
  },
  { label: "РЛС", included: [true, true, true, true] },
  { label: "ОЭС", included: [false, true, true, true] },
  { label: "Акустическая сеть", included: [false, true, true, true] },
  { label: "Радиочастотный датчик", included: [true, true, true, true] },
  { label: "Ручной перехватчик", included: [true, true, true, true] },
  {
    label: "Дронопорт с перехватчиками",
    included: [false, true, true, true],
  },
  { label: "Лазерный комплекс", included: [false, false, true, true] },
  {
    label: "Радиоэлектронное подавление",
    included: [true, true, true, true],
  },
  { label: "Подавление Starlink", included: [false, false, false, true] },
  { label: "“Панцирь”", included: [false, false, false, true] },
] as const;

export const configurationDetection = {
  title: "Обнаружение",
  text: "Многоканальное обнаружение\nи классификация угроз в реальном времени",
  items: [
    {
      title: "Радиолокация",
      text: "Система объединяет данные от всех источников и формирует единый трек объекта",
      image: "/images/configurations/radar.png",
      imageAlt: "Радиолокационная станция Форт-9 на поворотном основании",
    },
    {
      title: "Оптика и тепловизор",
      text: "Визуальное обнаружение, распознавание и идентификация объектов днем и в условиях ограниченной видимости",
      image: "/images/configurations/optics.png",
      imageAlt: "Оптико-электронный модуль с камерой и тепловизором",
    },
    {
      title: "Акустическая сеть",
      text: "Пассивное обнаружение по акустическим признакам с распределенной сетью датчиков",
      image: "/images/configurations/acoustic.png",
      imageAlt: "Мачта с акустическими датчиками",
    },
    {
      title: "Радиочастотный контроль",
      text: "Выявление и анализ радиоизлучений, определение направления и источника сигналов",
      image: "/images/configurations/radio.png",
      imageAlt: "Антенный комплекс радиочастотного контроля",
    },
  ],
} as const;

export const configurationCounter = {
  title: "Противодействие",
  text: "Технологии нейтрализации угроз",
  accent: "/images/configurations/accent.svg",
  items: [
    {
      title: "Радиоэлектронное подавление",
      text: "Целенаправленное воздействие на каналы управления, навигации и передачи данных воздушных объектов",
      image: "/images/configurations/suppression.png",
      imageAlt: "Купольный комплекс радиоэлектронного подавления Форт-9",
    },
    {
      title: "Дронопорт",
      text: "Автоматизированное базирование и управление перехватывающими дронами",
      image: "/images/configurations/droneport.png",
      imageAlt: "Дронопорт Форт-9 с отсеками для перехватывающих дронов",
    },
  ],
} as const;
