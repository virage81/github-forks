# ИП Поскребышев Тестовое задание

1. [Описание ТЗ](#описание-тз)
2. [Требования](#требования)
3. [Плюсы](#плюсами-будут)
4. [Чеклист](#чеклист)
5. [Макет](https://www.figma.com/file/0wrzG8QvmgAv5NyCMlYvfD/github-forks?node-id=0%3A1&t=wNJ6WJP9dyhmtDCW-1)

## Описание ТЗ:

Необходимо написать приложение, которое в табличном виде отображает forks (ветки) введенного в поисковую строку репозитория (для ввода используется имя
репозитория вида :owner/:repositoryName || virage81/test-repo). Можно использовать любые дополнительные библиотеки (в т.ч. библиотеки компонентов), любой
дизайн.

## Требования:

1. Проект выкладывается на github
2. Публикуется на Heroku или аналогичном сервисе
3. Проект должен использовать react, redux
4. Приложение должно состоять из следующих экранов: главный экран с приветствием и полем ввода поисковой строки, экран результатов поиска с аналогичной
   поисковой строкой. Оба экрана доступны по ссылке
5. В таблице должны отображаться следующие колонки:

- Полное название репозитория
- Владелец
- Количестов звезд
- Ссылка на репозиторий форка
- Избранное Да/Нет

6. В таблице должна быть постраничная навигация
7. По ссылке можно перейти к определенной странице результатов поиска для определенного репозитория (/seacrh?page=1&repository=someRepository)

## Плюсами будут:

1. добавление экрана/модального окна с формой добавления выбранного форка в избранное (избранное хранится в localstorage). Отображается избранное как еще одна
   колонка в таблице
2. Избранное из предыдущего пункта сохраняется на сервисе Firebase Realtime Database, а не в localStorage
3. Выкладка на heroku
4. Использование какой-либо анимации
5. использование проксирующего сервера, который сам обращается к github api

## Чеклист

- [x] Проект выкладывается на github
- [ ] Публикуется на Heroku или аналогичном сервисе
- [x] Проект должен использовать react, redux
- [x] Приложение должно состоять из следующих экранов:

     1.    [x] Главный экран с приветствием и полем ввода поисковой строки
     2.    [x] Экран результатов поиска с аналогичной поисковой строкой.
     3.    [x] Оба экрана доступны по ссылке

- [x] В таблице должны отображаться следующие колонки:

     1.    [x] Полное название репозитория
     2.    [x] Владелец
     3.    [x] Количестов звезд
     4.    [x] Ссылка на репозиторий форка
     5.    [x] Избранное Да/Нет

- [x] В таблице должна быть постраничная навигация
- [x] По ссылке можно перейти к определенной странице результатов поиска для определенного репозитория (/seacrh&page=1?repository=someRepository)

## Фишки

1. Добавить предложения в поиск. При вводе пользователя, будут предлагаться его репозитории
2. Сделать слайд-анимацию на сообщении об ошибке в поиске
3. Добавить адаптивность приложению
4. Попробовать реализовать древовидную таблицу на телефоне
