import { type ShoppingListItem as ShoppingListItemType } from "../types";

type Props = {
	item: ShoppingListItemType;
	setIsPurchased: (isPurchased: boolean) => void;
};

export default function ShoppingListItem({ item, setIsPurchased }: Props) {
	return (
		<div>
			<input
				type="checkbox"
				checked={item.isPurchased}
				onChange={() => setIsPurchased(!item.isPurchased)}
			/>
			<span>{item.name}</span>
		</div>
	);
}