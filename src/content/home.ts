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
    number: "01",
    tone: "#2c2d30",
    title: "Обследование объекта",
    text: "Проводим инженерное обследование, анализируем инфраструктуру, выявляем риски и определяем задачи защиты.",
  },
  {
    number: "02",
    tone: "#613337",
    title: "Согласование решения",
    text: "Подбираем оптимальную конфигурацию под задачи на вашем объекте, согласовываем технические и организационные детали",
  },
  {
    number: "03",
    tone: "#96393e",
    title: "Поставка и монтаж",
    text: "Поставляем оборудование, выполняем монтаж и интеграцию в действующую инфраструктуру объекта",
  },
  {
    number: "04",
    tone: "#ca3f45",
    title: "Пусконаладка и обучение",
    text: "Проводим пусконаладочные работы, настраиваем систему и обучаем ваших специалистов",
  },
  {
    number: "05",
    tone: "#ff454c",
    title: "Эксплуатация и сопровождение",
    text: "Обеспечиваем техническую поддержку, обновления и консультации на всех этапах эксплуатации",
  },
] as const;

const radarSpecs = [
  { label: "Рабочий частотный диапазон", value: "X-band" },
  { label: "Количество рабочих частот", value: "12" },
  { label: "Режимы работы", value: "TWS, TAS" },
  { label: "Дальность обнаружения макс.", value: "15 км" },
  { label: "Дальность обнаружения БПЛА", value: "8-15 км" },
  { label: "Обзор по азимуту", value: "360°" },
  { label: "Обзор по углу места", value: "от -2° до +45°" },
  { label: "Период обновления", value: "2,5 с" },
  { label: "Потребляемая мощность", value: "<3,2 кВт" },
  { label: "Масса", value: "140 кг" },
  { label: "Рабочая температура", value: "от -40° до +55°" },
] as const;

const multisensorSpecs = [
  { label: "Детектор", value: "Охлажд. тепловизионный модуль InSb" },
  { label: "Частота кадров", value: "25 к/с" },
  { label: "Обзор по азимуту", value: "360°" },
  { label: "Скорость вращения по горизонтали", value: "0,03 … 60 °/с" },
  { label: "Угол поворота по вертикали", value: "от -45° до +60°" },
  { label: "Оптический зум тепловизора", value: "20×" },
  { label: "Дальность обнаружения макс.", value: "30 км" },
  { label: "Тепловизор", value: "Есть" },
  { label: "Спектральный диапазон", value: "3–5 мкм (MWIR)" },
  { label: "Потребляемая мощность", value: "<0,3 кВт" },
  { label: "Рабочая температура", value: "от -50° до +60°" },
] as const;

export type Product = {
  id: string;
  title: string;
  image: string;
  specs: readonly { label: string; value: string }[];
};

// The third card repeats the radar station, matching the current Figma frame.
export const products: readonly Product[] = [
  {
    id: "radar",
    title: "Радиолокационная станция (РЛС)",
    image: "/images/home/product-radar.webp",
    specs: radarSpecs,
  },
  {
    id: "multisensor",
    title: "Мультисенсорная система",
    image: "/images/home/product-multisensor.webp",
    specs: multisensorSpecs,
  },
  {
    id: "radar-2",
    title: "Радиолокационная станция (РЛС)",
    image: "/images/home/product-radar.webp",
    specs: radarSpecs,
  },
];

export const contactPerson = {
  label: "Ваш контакт в Форт - 9",
  name: "Константин Длиннофамильцев",
  role: "Руководитель направления",
} as const;
