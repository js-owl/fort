export const navigation = [
  { href: "/#industries", label: "Отрасли" },
  { href: "/#process", label: "Этапы работы" },
  { href: "/#capabilities", label: "Технические средства" },
] as const;

export const industries = [
  {
    title: "Промышленность",
    image: "/images/home/industry-industrial.webp",
  },
  {
    title: "Нефть и газ",
    image: "/images/home/industry-oil.webp",
  },
  {
    title: "Энергетика",
    image: "/images/home/industry-energy.webp",
  },
  {
    title: "Цифровая инфраструктура",
    image: "/images/home/industry-digital.webp",
  },
  {
    title: "Порты и морские объекты",
    image: "/images/home/industry-ports.webp",
  },
  {
    title: "Государственные объекты",
    image: "/images/home/industry-government.webp",
  },
] as const;

export const processSteps = [
  {
    number: "1",
    tone: "#2c2d30",
    title: "Обследование объекта",
    text: "Проводим инженерное обследование, анализируем инфраструктуру, выявляем риски и определяем задачи защиты.",
  },
  {
    number: "2",
    tone: "#613337",
    title: "Согласование решения",
    text: "Подбираем оптимальную конфигурацию под задачи на вашем объекте, согласовываем технические и организационные детали",
  },
  {
    number: "3",
    tone: "#96393e",
    title: "Поставка и монтаж",
    text: "Поставляем оборудование, выполняем монтаж и интеграцию в действующую инфраструктуру объекта",
  },
  {
    number: "4",
    tone: "#ca3f45",
    title: "Пусконаладка и обучение",
    text: "Проводим пусконаладочные работы, настраиваем систему и обучаем ваших специалистов",
  },
  {
    number: "5",
    tone: "#ff454c",
    title: "Эксплуатация и сопровождение",
    text: "Обеспечиваем техническую поддержку, обновления и консультации на всех этапах эксплуатации",
  },
] as const;

export type Product = {
  id: string;
  title: string;
  image: string;
};

export const products: readonly Product[] = [
  {
    id: "radar",
    title: "Радиолокационная станция (РЛС)",
    image: "/images/home/product-radar.webp",
  },
  {
    id: "rf-sensor",
    title: "Радиочастотный датчик",
    image: "/images/home/product-rf.webp",
  },
  {
    id: "handheld-interceptor",
    title: "Ручной дрон-перехватчик",
    image: "/images/home/product-handheld.webp",
  },
  {
    id: "droneport",
    title: "Дронопорт+дроны-перехватчики",
    image: "/images/home/product-droneport.webp",
  },
  {
    id: "ew",
    title: "Радиоэлектронное подавление (РЭП)",
    image: "/images/home/product-ew.webp",
  },
];

export const contactDetails = {
  email: "info@aeromax-group.ru",
  phone: "+7 (495) 748 35 77 доб. +27632",
} as const;
