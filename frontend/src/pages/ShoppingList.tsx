import ShoppingListItem from "../components/ShoppingListItem";
import { type ShoppingList as ShoppingListType } from "../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getShoppingList } from "../backend";

export default function ShoppingList() {
	const { id: idString } = useParams();

	const id = Number(idString);

	const [shoppingList, setShoppingList] = useState<ShoppingListType | null>(null);
	useEffect(() => {
		getShoppingList(id).then(setShoppingList);
	}, [id]);

	const setIsPurchased = (itemId: number, isPurchased: boolean) => {};

	return (
		<div>
			{!shoppingList && <p>Loading...</p>}
			{shoppingList &&
				<>
                    <h1>{shoppingList.name}</h1>
					{shoppingList.items.map((item) => (
						<ShoppingListItem
							key={item.id}
							item={item}
							setIsPurchased={(isPurchased) => setIsPurchased(item.id, isPurchased)}
						/>
					))}
				</>
			}
		</div>
	);

}