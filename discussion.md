## Task

- **Creating a shopping list**: semi-implemented, UI issues
- **Deleting a shopping list**: only implemented on backend
- **Separate page for each shopping list**: implemented
- **Mechanism for marking items as purchased**: semi-implemented, UI issues

## Backend

- **Types**
  - `Base` types without automatically generated IDs, normal types with IDs
    - `ShoppingList`
    - `ShoppingListItem`
- **REST API**
  - `GET /shopping_lists`
  - `GET /shopping_lists/:id`
  - `POST /shopping_lists`
  - `DELETE /shopping_lists/:id`
  - `POST /shopping_lists/:id/items/:itemId/purchased`
- **Server-sent events**
  - One-way communication, WebSockets would be overkill
  - Sends full shopping list on changes

### Considerations

- **REST API**
  - Maybe `PATCH /shopping_lists/:id/items/:itemId` for marking items as purchased, also allows for more flexibility e.g. editing item name
  - No input validation
- **Server-sent events**
  - Allow subscribing to specific shopping lists, e.g. `/events/shopping_lists` and `/events/shopping_lists/:id`

## Frontend

- React router with 3 pages
- `backend` file containing wrappers for API calls
- `backend` file also contains hooks for subscribing to server-sent events

## Things implemented 18 minutes after deadline

- Fix backend sending events before changes take place `notifyAll` in wrong place
- Create shopping list
  - Fix unchangeable textarea
  - Fix wrong item names
- New hook for getting 1 shopping list specifically
- Allow items to be marked as purchased

## Things I wish I did differently

- Spent too much time on creating different 'events' for the SSE; the end solution, which was very simple, also works quite well
- Spent too little time on getting a working prototype by the deadline

i.e. was over-engineering the backend, under-engineered the frontend

## Things I would've done with more time
- Implement deleting shopping lists
- Persistent storage with SQLite or a KV-store such as redis
- Unit tests
- Input validation

