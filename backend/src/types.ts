export type ShoppingListBase = {
	name: string;
	items: string[];
}

export type ShoppingList = ShoppingListBase & {
	id: number;
}

export type CreateShoppingListInput = ShoppingListBase;