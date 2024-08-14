import { type ShoppingList as ShoppingListType, ShoppingList, ShoppingListBase } from "./types";
import { useEffect, useRef, useState } from "react";

export const useShoppingLists = () => {
	const [shoppingLists, setShoppingLists] = useState<ShoppingListType[]>([]);

	const eventSourceRef = useRef<EventSource | null>(null);

	useEffect(() => {
		getShoppingLists().then(setShoppingLists);

		const eventSource = new EventSource("http://localhost:3050/events");
		eventSourceRef.current = eventSource;

		eventSource.onmessage = (event) => {
			const parsedData = JSON.parse(event.data);
			setShoppingLists(parsedData);
		};

		// Cleanup on component unmount
		return () => {
			if (eventSourceRef.current) {
				eventSourceRef.current.close();
			}
		};
	}, []);

	return { shoppingLists };
}

// now use only 1 shopping list
export const useShoppingList = (id: number) => {
	const { shoppingLists } = useShoppingLists();
	const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);

	useEffect(() => {
		setShoppingList(shoppingLists.find((shoppingList) => shoppingList.id === id) || null);
	}, [shoppingLists]);

	return { shoppingList };
};

export async function getShoppingLists(): Promise<ShoppingList[]> {
	const response = await fetch('http://localhost:3050/shopping_lists');
	const shoppingLists = await response.json();
	return shoppingLists;
}

export async function getShoppingList(id: number): Promise<ShoppingList | null> {
	const shoppingLists = await getShoppingLists();
	return shoppingLists.find((shoppingList) => shoppingList.id === id) || null;
}

export async function createShoppingList(shoppingList: ShoppingListBase): Promise<void> {
	await fetch('http://localhost:3050/shopping_lists', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(shoppingList)
	});
}