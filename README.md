# Задача по разработке приложения на React для Frontend-стажировки в Lad

## Описание задачи

Написать полноценное SPA (single page application) приложение (например блог, интернет магазин, админ панель, сайт визитка или любое другое веб-приложение), которое должно удовлетворять следующим условиям:

1. Стек `React` (или `NextJS`).
2. Функциональные компоненты, `React-hooks`.
3. `Модульные стили` или `styled-components`.
4. Роутинг `React-router-dom` или `NextJS`.
5. `Redux/ReduxToolKit`. Асинхронные экшены `Redux-thunk` или `Redux-saga`.
6. Работа с API с помощью клиента `Axios` (можно использовать любое открытое API либо свой вариант).

## Общее описание приложения

[**_Библиотека игральных карт Hearthstone_**](https://hearthstone-card-library.herokuapp.com/) - сервис для получения информации обо всех доступных картах из компьютерной игры `Hearthstone` производства Blizzard. Функционал приложения:

- Отображение игральных карт с возможностью получения детальной информации по каждой отдельной карте.
- Отображение доступных базовых героев (классов) с возможностью получения детальной информации по каждому классу (в т.ч. разных героев в рамках одного класса).
- Настройка отображения списков карт в соответствии с заданными параметрами или полнотекстовый поиск по базе данных.

### Соответствие приложения условиям задачи

- Стек `React`.
- React-компоненты реализованы в `функциональном стиле`, используются `react-hooks`.
- Модульные `sass` стили.
- Роутинг реализован при помощи `React Router v6`
- Используется `ReduxToolKit`. Асинхронные экшены отрабатываются при помощи `createAsyncThunk()`.
- HTTP запросы осуществляются с помощью `Axios`.

### Основные фичи приложения

- Минимизировано количество запросов к API - если текущее представление по картам или героям не менялось, то при рендере страницы повторный запрос к серверу осуществляться не будет (например, при переключении между страницами фильтрации, карт и героев, или при возвращении к общему списку со страницы отдельной карты или героя).
- Реализована возможность повторного отображения содержимого конкретного рута при перезагрузке страницы (кроме страницы отдельной карты, т.к. не хватило времени реализовать этот функционал).
- При переходе по `несуществующему url` отображается заглушка с кнопкой, ведущей на домашнюю страницу, и инициализацией перезагрузки страницы.
- Использована библиотека `Formik` для создания формы фильтрации запросов.
- Реализована обертка-предохранитель `ErrorBoundaries`, а также компонент ошибки при рендере отдельных страниц.
- Реализованы кастомные стили `input` компонентов и `полосы прокрутки` для соответствия общей стилистике приложения.
- Реализована верстка под Full HD и HD мониторы. Мобильную верстку и верстку под 2K мониторы не успел реализовывать.

### API

Использовался [Hearthstone API](https://develop.battle.net/documentation/hearthstone/game-data-apis) и следующие `эндпоинты`:

- `/metadata` - получение всех доступных данных о сущностях игры (классы героев, наборы карт, типы существ и т.п.). Данные используются в основном для настройки параметров отбора карт, а также для ассоциации `id` различных полей в объектах карт и героев с их текстовыми наименованиями (свойство `name` объекта с искомым `id`).

- `/cards` - получение списка карт, соответствующих определенному запросу. Важно отметить, что API возвращает карты в соответствии с их уникальными `id`. На практике часто будут отображаться визуально одинаковые карты, но при этом они не будут являться дублями, т.к. если одна и та же карта относится к разным наборам, то в базе ей будет присвоен уникальный `id` для каждого набора.

- `/deck` - предназначается для получения информации о вариантах колод карт по коду колоды или `ids` карт, составляющих колоду. В рамках данного приложения используется для получения данных о базовом герое (классе) и является единственной возможностью в этом отношении, т.к. базовый герой (класс) представляет собой отдельную сущность, и API не позволяет запрашивать сразу список `ids` базовых героев (классов), поэтому приходится осуществлять отдельный запрос для получения данных по каждому герою.

## Структура приложения

### `components`

Разделены на 3 папки:

- `appComponents` - составляют постоянную видимую структуру приложения:
  - `App` - основной компонент, отвечающий в т.ч. за маршрутизацию. Руты страниц отдельных карт и героев реализованы не как вложенные, т.к. по сути рендерится каждый раз отдельная страница, а `outlet` должен был бы быть размещен в компоненте `MainSection`, по отношению к которому эти руты вложенными, по сути, не являются.
  - `AppHeader` - шапка приложения, содержащая кнопки навигации и поле для полнотекстового поиска по базе.
  - `MainSection` - компонент-обертка, в котором рендерятся дочерние компоненты. Сделан в т.ч. для того, чтобы рендерить спиннер и компонент ошибоки по центру.
- `minorComponents` - содержит все вспомогательные компоненты:
  - `SectionHeader` - содержит заголовок страницы, принимает текст для конкретной страницы в виде props.
  - `SectionLayout` - компонент-обертка, содержащий общий шаблон верстки страницы.
  - `NavBar` - содержит панель навигации в шапке приложения.
  - `FilterButton` - содержит кнопку перехода на страницу фильтров в шапке приложения.
  - `SearchField` - содержит компонент полнотекстового поиска в шапке приложения.
  - `PaginationButton` - содержит компонент кнопки для навигации по страницам в рамках `CardsListPage` (при выгрузке более 10 результатов) и `SingleHeroPage` (просмотр альтернативных изображений героев).
  - `TextComponent` - содержит стандартный текстовый компонент, использующийся при верстке отдельных страниц.
  - `TextFieldComponent` - содержит стандартный текстовый компонет, визуально оформленный в виде поля с текстом.
  - `Spinner` - содержит компонент спиннера.
  - `ErrorBoundary` - компонент-обертка, отлавливающий ошибки в рамках этапаов жизненного цикла дочерних компонентов. Представляет собой классовый компонент, т.к. использует хук жизненного цикла `componentDidCatch()`. Не отлавливает ошибки внутри обработчиков событий и асинхронного кода, для в рамках страниц рендерится отдельный компонент ошибки.
  - `ErrorMessage` - содержит компонент ошибки с кнопкой возврата на домашнюю страницу с автоматической перезагрузкой страницы. Принимаеи текст для отображения в виде пропса.
- `pages` - содержит все компоненты страниц, рендерящиеся в рамках `MainSection`:
  - `StartPage` - стартовая страница приложения с общей информацией.
    - `startSlice` - срез стора для работы с метаданными.
  - `CardsListPage` - страница для отображения выгруженных из API карт с указанием количества карт, соответствующих запросу и количество страниц (настройки приложения по умочанию - отображение 10 карт на странице). Запрос по умолчанию возвращает все доступные коллекционные карты (4263 карты).
    - `cardsSlice` - срез стора для работы с данными о картах.
  - `SingleCardPage` - страница для отображения информации о конкретной карте.
  - `HeroesListPage` - страница, отображающая список всех доступных в игре на момент запроса героев (классов). Изображение класса "Охотник на демонов" отличается от других карт, но такие данные возвращает [Hearthstone API](https://develop.battle.net/documentation/hearthstone/game-data-apis).
    - `heroesSlice` - срез стора для работы с данными о героях.
  - `SingleHeroPage` - страница для отображения информации о конкретном герое. Позволяет получать альтернативные карты героев в рамках одного класса.
  - `FiltersPage` - страница, содержащая форму с полями выбора различных условий отбора карт. Данные в полях отбора получены из `metadata`. Форма создана при помощи библиотеки `Formik`.

### `styles`

- `styles.scss` - общие стили приложения.
- `variables.scss` - общие переменные, повторяющиеся в рамках стилей отдельных компонентов (здесь только цвета).

### `assets`

- `fonts` - содержит шрифт `Belwe` - официальный шрифт `Hearthstone`.
- `img` - содержит все статические изображения.

### `store`

Стор приложения содержит 3 отдельных среза.

### `services`

Содержит методы для правильной работы с [Hearthstone API](https://develop.battle.net/documentation/hearthstone/game-data-apis), а также объект с общими для всех запросов данными.

### `hooks`

Содержит кастомый хук, экспортирующий функцию для осуществления запроса к API.

## Логика работы приложения

## Что можно улучшить
