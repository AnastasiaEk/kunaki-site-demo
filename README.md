# КУНАКИ — демонстрационный сайт

Сайт для показа визуальной концепции заказчику: https://anastasiaek.github.io/kunaki-site-demo/

Оригинальный логотип и фирменная палитра, адаптивная главная, направления, инициативы, команда, контакты и реквизиты. Все изображения и шрифты загружаются локально. Фото иллюстративные; источники находятся в `dist/assets/photo-sources.json`, лицензия Manrope — `dist/assets/fonts/OFL.txt`.

Оригиналы устава и карточки организации в публичную демоверсию не включены. В разделе документов доступны запросы по электронной почте. Форма готовит письмо в почтовом приложении посетителя, сайт не хранит обращения. Платежи не подключены. Поисковая индексация отключена метатегом robots.

## Локальный просмотр

Открыть `dist/index.html` или запустить `python -m http.server 4173 --directory dist`.

## Docker

Запустить Docker Desktop и выполнить `docker compose up -d --build`. Адрес: http://localhost:8080. Остановка: `docker compose down`.

## GitHub Pages

Исходники — ветка `main`, опубликованные файлы — корень ветки `gh-pages`.

Обновление после редактирования:

```powershell
git add .
git commit -m "Update demo"
git push origin main
git subtree push --prefix dist origin gh-pages
```
