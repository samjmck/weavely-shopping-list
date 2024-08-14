import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { ShoppingList } from "./types";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

let shoppingListId = 0;
let shoppingListItemId = 0;
const shoppingLists: ShoppingList[] = [];

app.get('/shopping_lists', (request, response) => {
    response.json(shoppingLists);
});

app.get('/shopping_lists/:id', (request, response) => {
    const id = parseInt(request.params.id);

    const shoppingList = shoppingLists.find((shoppingList) => shoppingList.id === id);

    if (shoppingList) {
        response.json(shoppingList);
    } else {
        response.status(404).json({ error: 'Shopping list not found' });
    }
});

app.post('/shopping_lists', express.json(), (request, response) => {
    const shoppingList = <ShoppingList> structuredClone(request.body);

    shoppingList.id = shoppingListId++;
    for (const shoppingListItem of shoppingList.items) {
        shoppingListItem.id = shoppingListItemId++;
    }
    shoppingLists.push(shoppingList);

    response.status(201).json(shoppingList);
});

app.delete('/shopping_lists/:id', (request, response) => {
    const id = parseInt(request.params.id);

    const index = shoppingLists.findIndex((shoppingList) => shoppingList.id === id);

    if (index !== -1) {
        shoppingLists.splice(index, 1);
        response.status(204).end();
    } else {
        response.status(404).json({ error: 'Shopping list not found' });
    }
});

app.post('/shopping_lists/:id/items/:itemId/purchased', express.json(), (request, response) => {
    const id = parseInt(request.params.id);
    const itemId = parseInt(request.params.itemId);
    const isPurchased = request.body.isPurchased;

    const shoppingList = shoppingLists.find((shoppingList) => shoppingList.id === id);

    if (shoppingList) {
        const shoppingListItem = shoppingList.items.find((shoppingListItem) => shoppingListItem.id === itemId);

        if (shoppingListItem) {
            shoppingListItem.isPurchased = isPurchased;
            response.json(shoppingListItem);
        } else {
            response.status(404).json({ error: 'Shopping list item not found' });
        }
    } else {
        response.status(404).json({ error: 'Shopping list not found' });
    }
});