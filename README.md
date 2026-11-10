# Форт-9

Сайт Форт-9 на Next.js. Сейчас открыта только главная страница, свёрстанная по макету.

## Локально

```bash
npm install
npm run dev
```

Открыть http://localhost:3000. Проверка живости: http://localhost:3000/health.

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Docker на локальной машине (порт 8082):

```bash
docker network create maas-shared
docker compose -f docker-compose.local.yml up --build
```

`docker-compose.yml` только для серверов с Traefik (`traefik-global-proxy`). Перед первым деплоем замените `PUBLIC_HOST` (сейчас плейсхолдер `fort.example.com`) и путь образа, если реестр называется иначе.

## Шрифты

Файлы лежат в проекте, внешних CDN нет.

- `public/fonts/montserrat-cyrillic.woff2` и `montserrat-latin.woff2` — Montserrat (SIL OFL, лицензия в `public/fonts/OFL.txt`). Сейчас это основной шрифт страницы и шрифт таблиц характеристик.
- Заголовки и наборный текст в макете — TT Norms Pro (Regular 400, Medium 500, Bold 700). Положите woff2 в `public/fonts/tt-norms-pro/` и в `src/app/globals.css` объявите `@font-face` с семейством `"TT Norms Pro"`, затем замените `--font-sans` на это семейство. `--font-table` оставьте Montserrat: в макете таблицы набраны им.

## Заявки

Форма на главной проверяется схемой на сервере. Если задан `CONTACT_WEBHOOK_URL` (см. `.env.example`), заявка уходит туда POST-запросом с JSON. Без переменной сервер принимает заявку и пишет в лог, что она получена, без текста полей.

## Структура

- `src/app` — маршруты, корневой layout, `/health`
- `src/sections/home` — секции главной
- `src/features/contact-form` — форма, server action, схема
- `src/content/home.ts` — тексты и данные карточек
- `src/components` — шапка и UI-примитивы

## Архитектура

### Приложение

БД нет: тексты лежат в `src/content/home.ts`, статика в `public/`. Единственная серверная логика — server action формы заявки.

```mermaid
flowchart TB
    subgraph app["src/app — маршруты"]
        layout["layout.tsx<br/>корневой layout, метаданные, preload шрифтов"]
        page["page.tsx<br/>главная страница"]
        health["health/route.ts<br/>GET /health"]
        nf["not-found.tsx"]
        icon["icon.tsx"]
        css["globals.css<br/>Tailwind v4, токены, @font-face"]
    end

    subgraph sections["src/sections/home — секции главной"]
        hero["Hero"]
        ind["Industries"]
        proc["Process"]
        cap["Capabilities"]
        slider["CapabilitiesSlider<br/>client component"]
        contact["Contact"]
    end

    subgraph feature["src/features/contact-form"]
        form["ContactForm<br/>client, useActionState"]
        action["actions.ts<br/>server action submitContact"]
        schema["schema.ts<br/>zod-схема и типы состояния"]
        test["schema.test.ts<br/>vitest"]
    end

    subgraph shared["Общее"]
        header["components/layout<br/>SiteHeader, MobileNav"]
        ui["components/ui<br/>Button, Field, Container, SectionHeading"]
        content["content/home.ts<br/>тексты и данные карточек"]
        env["lib/env.ts<br/>contactWebhookUrl()"]
        cn["lib/cn.ts<br/>clsx + tailwind-merge"]
    end

    pub[("public/<br/>шрифты Montserrat, изображения")]
    webhook(["Внешний вебхук<br/>CONTACT_WEBHOOK_URL"])

    layout --> page
    layout --> css
    page --> hero & ind & proc & cap & contact

    hero --> header
    hero --> ui
    ind --> content
    ind --> ui
    proc --> content
    proc --> ui
    cap --> content
    cap --> slider
    contact --> content
    contact --> form

    form --> ui
    form -->|"form action"| action
    action --> schema
    form --> schema
    test -.-> schema
    action --> env
    action -->|"POST JSON, таймаут 8 с"| webhook

    ui --> cn
    hero -.-> pub
    layout -.-> pub
```

Если `CONTACT_WEBHOOK_URL` не задан, `submitContact` только пишет в лог, что заявка получена.

### Рантайм и деплой

```mermaid
flowchart LR
    user(["Браузер"]) -->|HTTPS| traefik["Traefik<br/>сеть traefik-global-proxy<br/>TLS, заголовки безопасности, healthcheck"]

    subgraph container["Docker-контейнер fort (порт 80)"]
        direction LR
        entry["docker-entrypoint.sh<br/>1. запускает Next.js<br/>2. ждёт /health<br/>3. запускает nginx"]
        nginx["nginx :80<br/>gzip, кэш /_next/static и /_next/image"]
        next["Next.js standalone<br/>Node 20, 127.0.0.1:3000"]
        entry -.-> next
        entry -.-> nginx
        nginx -->|proxy_pass| next
    end

    traefik --> nginx
    next -->|"server action: POST заявки"| hook(["CONTACT_WEBHOOK_URL"])

    subgraph build["Сборка образа (Dockerfile.prod)"]
        b1["builder: npm ci + next build<br/>output: standalone"] --> b2["runner: node-slim + nginx + curl"]
    end

    reg[("Nexus registry<br/>maas-hosted/fort:latest")]
    b2 --> reg
    reg -->|"docker-compose.yml"| container

    local["Локально:<br/>npm run dev :3000<br/>или docker-compose.local.yml :8082"]
```
