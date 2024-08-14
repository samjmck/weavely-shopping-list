import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { ShoppingList } from "./types";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use((request, response, next) => {
    // Allow any origin for now
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    next();
});

const eventsConnections: Response[] = [];

function notifyAll( data: object) {
    for (const connection of eventsConnections) {
        connection.write(`data: ${JSON.stringify(data)}\n\n`);
    }
}

let shoppingListId = 0;
let shoppingListItemId = 0;
const shoppingLists: ShoppingList[] = [
    {
        id: shoppingListId++,
        name: 'Groceries',
        items: [
            {
                id: shoppingListItemId++,
                name: 'Milk',
                isPurchased: false
            },
            {
                id: shoppingListItemId++,
                name: 'Eggs',
                isPurchased: false
            },
            {
                id: shoppingListItemId++,
                name: 'Bread',
                isPurchased: false
            }
        ]
    },
    {
        id: shoppingListId++,
        name: 'Hardware store',
        items: [
            {
                id: shoppingListItemId++,
                name: 'Nails',
                isPurchased: false
            },
            {
                id: shoppingListItemId++,
                name: 'Hammer',
                isPurchased: false
            }
        ]
    }
];

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

    notifyAll(shoppingLists);

    response.status(201).json(shoppingList);
});

app.delete('/shopping_lists/:id', (request, response) => {
    const id = parseInt(request.params.id);

    const index = shoppingLists.findIndex((shoppingList) => shoppingList.id === id);

    if (index !== -1) {
        shoppingLists.splice(index, 1);

        notifyAll(shoppingLists);

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

            notifyAll(shoppingLists);

            response.json(shoppingListItem);
        } else {
            response.status(404).json({ error: 'Shopping list item not found' });
        }
    } else {
        response.status(404).json({ error: 'Shopping list not found' });
    }
});

app.get('/events', (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    eventsConnections.push(response);

    request.on('close', () => {
        const index = eventsConnections.indexOf(response);
        eventsConnections.splice(index, 1);
    });
});