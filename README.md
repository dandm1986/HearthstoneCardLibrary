# Hearthstone Card Library

## General Description

[**_Hearthstone Card Library_**](https://hearthstone-card-library.herokuapp.com/) is a service for obtaining information on all available cards from the Blizzard computer game `Hearthstone`.

Application functionality:

- Display of cards with the ability to obtain detailed information on each individual card.
- Display available heroes (classes) with the ability to get detailed information on each class (including different heroes within one class).
- Customise the display of card lists according to the query parameters set or full-text search of the database.

## Technologies used

- An SPA created with `React`
- React components are implemented in a `functional style`, `react-hooks` are used
- Sass
- Routing is implemented using `React Router v6`
- The `ReduxToolKit` is used. Asynchronous actions are handled using `createAsyncThunk()`
- HTTP requests are handled using `Axios`

## Main features

- Minimized number of requests to API - if current page data (cards or heroes) was not changed, then the additional request to the server won't be made when a page re-renders (for example, when switching between filters page, cards page and heroes page or when switching back to a cards / heroes list from a single card / hero view).
- Re-display content of a particular root when the current page reloads (except for the single card page view yet).
- When navigating to `non-existent url`, an error component with a button leading to the home page with page reload initialization is displayed.
- `Formik` library was used to create a form for query filtering.
- Implemented `ErrorBoundaries` wrapper, as well as an error component when rendering pages.
- Implemented custom styles for `input` components and `scroll bars` to match the overall style of the application.
- Implemented rendering for Full HD and HD monitors. Mobile layout and layout for 2K monitors not implemented yet.

## API

[Hearthstone API](https://develop.battle.net/documentation/hearthstone/game-data-apis) used with the following `endpoints':

- `/metadata` - getting all available data about game entities (hero classes, card sets, creature types, etc.). The data is used mainly for setting card selection parameters, as well as for association of `id` of different fields in card and hero objects with their text names (property `name` of the object with the searched `id`).

- `/cards` - retrieve a list of cards matching a particular query. It is important to note that the API returns cards according to their unique `id`. In practice, visually identical cards will often be displayed, but they will not be duplicates because if the same card belongs to different sets, it will be assigned a unique `id` for each set in the database.

- `/deck` - is used to get information about the cards within a deck by the deck code or `ids` of the cards that make up the deck. Within this application, it is used to retrieve data about the base hero (class) and is the only option in this regard, since the base hero (class) is a separate entity and the API does not allow to query the list of `ids` of base heroes (classes) at once, so a separate query has to be made to get the data for each hero.

## Application structure

### `components`

Divided into 3 folders:

- `appComponents` make up the permanent visible structure of the application:
  - `App` is the main component also responsible for routing. Pages of single cards and heroes are not implemented as nested roots, because, in fact, each time a separate page is rendered, and `outlet` should have been placed in the `MainSection` component, in relation to which these routers are not nested.
  - `AppHeader` is the application header which contains the navigation buttons and a field for a full-text search in the database.
  - `MainSection` is a wrapper component within which child page components are rendered. Made in order to render the spinner and error components in the centre of the page.
- `minorComponents` contains all child components:
  - `SectionHeader` contains page header, takes the text for a particular page as a prop.
  - `SectionLayout` a wrapper component which contains a common layout template page.
  - `NavBar` contains the navigation bar of the App's header.
  - `FilterButton` contains a button in the App's header leading to the filter page.
  - `SearchField` contains a full-text search component in the App's header.
  - `PaginationButton` contains a button component to navigate through the pages within `CardsListPage` (if more than 10 results are downloaded) and `SingleHeroPage` (view alternative hero images).
  - `TextComponent` contains a standard text component.
  - `TextFieldComponent` - contains a standard text component, visually designed as a field with text.
  - `Spinner` contains the spinner component.
  - ErrorBoundary`is a wrapper component which catches errors in the phases of the life cycle of child components. This is a class component because it uses the`componentDidCatch()` lifecycle hook. Does not catch errors within event handlers and asynchronous code. A separate error component is made for this purpose.
  - `ErrorMessage` contains an error component with a button to return to the home page with automatic page reloading. It accepts text to display as props.
- `Pages` contains all components of the page, rendered within the `MainSection`:
  - `StartPage` is the start page of the application with the general information.
    - `StartSlice` is a store slice to handle metadata.
  - `CardsListPage` is a page to display the cards received from the API with the number of cards matching the request, as well as the number of pages (the basic setting of the request is to display 10 cards per page). The default query returns all available collectible cards (4000+ cards).
    - `CardsSlice` is a store slice to handle cards' data.
  - `SingleCardPage` is a page to display information about a particular card.
  - `HeroesListPage` is a page that displays a list of all available heroes (classes) in the game at the time of the request. The Demon Hunter class image is different from other cards, but such data comes from the [Hearthstone API](https://develop.battle.net/documentation/hearthstone/game-data-apis).
    - `heroesSlice` is a store slice to handle hero data.
  - `SingleHeroPage` is a page to display information about a particular hero. Allows for alternate hero cards within a single class.
  - `FiltersPage` is a page containing a form with fields to select different card selection conditions. The data in the selection fields are obtained from `metadata`. The form is created using the `Formik` library.

### `styles`

- `styles.scss` - common app styles.
- `variables.scss` - common variables (here only colors).

### `assets`

- `fonts` - contains official `Hearthstone` font - `Belwe`.
- `img` - contains all static images.

### `store`

Contains the App store which has 3 slices.

### `services`

Contains nethods for correct working with [Hearthstone API](https://develop.battle.net/documentation/hearthstone/game-data-apis) and common request settings objects.

### `hooks`

Contains a custom hook that exports a function to make a request to the API.

## Application logic

When the application starts, the `StartPage` is rendered:

- The `token` is requested and stored in the `Session Storage` - decided to do this so as not to make an expiry date check. The same token gets 3600s each time it's issued, so there's a chance that there would be double data from API. So I decided to limit myself to storing the token within the session.

- There is a request to the API to get `metadata`. Since the metadata is later used on almost all other pages, it is logical to get it at application startup:

  - `FiltersPage` - generation of lists of card filtering parameters.
  - `HeroesListPage` - generation of a list of `ids` classes of heroes with the further making of a list of hero cards and displaying them on the page.
  - `SingleCardPage` and `SingleHeroPage` - getting names (classes, types, sets, etc.) by index.

When you go to `CardsListPage`, a list of cards retrieved on request is generated. Navigation through the list pages is done by changing the state of the `currentPage` property. The slice also contains a settings object of the current `query`, which changes depending on the parameters selected on the filtering page.

`FiltersPage` - when you submit the form, the generated object updates `query` in the `cards` slice, there happens a transition to `CardsListPage`, where the cards are displayed according to the updated query object.

In general, the API query process is done by forming the `url` string according to the required parameters. In the case of card lists, the data from the `query` object is necessarily taken into account.

`HeroesListPage` - the peculiarity of this component is that in order to form and display a list of heroes you need to go through 2 steps:

- Generate an array of `ids` of base heroes (classes),
- Make a separate request to API to retrieve data on each hero and generate an array of retrieved objects.
  Such limitations are imposed by the API itself, as the `/deck` endpoint cannot work off the list of `ids` of base class heroes. Therefore, `ReduxDevTools` will show 10 requests - by the number of individual heroes. However, it is possible to get a list of common cards by `ids` - for example, this is how data on alternate (non-base) heroes within the same class is obtained for display in `SingleHeroPage`.

## Things to improve

- Adaptive layout for tablets, smartphones and 2K monitors.
- Save the current settings on the filter page and create a button to reset filters.
- Re-display content when `SingleCardPage` is reloaded.
