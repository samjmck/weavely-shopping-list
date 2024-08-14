export type ShoppingListBaseItem = {
	name: string;
	isPurchased: boolean;
}

export type ShoppingListItem = ShoppingListBaseItem & {
	id: number;
}

export type ShoppingListBase = {
	name: string;
	items: ShoppingListBaseItem[];
}

export type ShoppingList = Omit<ShoppingListBase, 'items'> & {
	id: number;
	items: ShoppingListItem[];
}