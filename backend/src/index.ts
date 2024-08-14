import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { ShoppingList } from "./types";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

let id = 0;
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
    const shoppingList = <ShoppingList> { ...request.body };
    shoppingList.id = id++;
    shoppingLists.push(shoppingList);
    response.status(201).json(shoppingList);
});