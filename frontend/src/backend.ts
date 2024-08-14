import { type ShoppingList as ShoppingListType, ShoppingList } from "./types";

export async function getShoppingLists(): Promise<ShoppingList[]> {
	return [
		{
			id: 1,
			name: "Groceries",
			items: [
				{
					id: 1,
					name: "Milk",
					isPurchased: false,
				},
				{
					id: 2,
					name: "Bread",
					isPurchased: false,
				},
			],
		},
		{
			id: 2,
			name: "Hardware Store",
			items: [
				{
					id: 3,
					name: "Nails",
					isPurchased: false,
				},
				{
					id: 4,
					name: "Hammer",
					isPurchased: false,
				},
			],
		},
	];
}

export async function getShoppingList(id: number): Promise<ShoppingList | null> {
	const shoppingLists = await getShoppingLists();
	return shoppingLists.find((shoppingList) => shoppingList.id === id) || null;
}