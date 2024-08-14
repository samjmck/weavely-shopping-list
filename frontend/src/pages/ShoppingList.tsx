import ShoppingListItem from "../components/ShoppingListItem";
import { useParams } from "react-router-dom";
import { updateShoppingListItem, useShoppingList } from "../backend";

export default function ShoppingList() {
	const { id: idString } = useParams();

	const id = Number(idString);

	const shoppingList = useShoppingList(id);

	const setIsPurchased = (itemId: number, isPurchased: boolean) => {
		updateShoppingListItem(id, itemId, isPurchased);
	}

	if (shoppingList === null) {
		return <p>Loading...</p>;
	} else {
		return <>
			<h1>{shoppingList.name}</h1>
			{shoppingList.items.map((item) => (
				<ShoppingListItem key={item.id} item={item} setIsPurchased={(isPurchased) => setIsPurchased(item.id, isPurchased)} />
			))}
		</>
	}
}