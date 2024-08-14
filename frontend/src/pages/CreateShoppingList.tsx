import { useState } from "react";
import { ShoppingListBase } from "../types";
import { createShoppingList } from "../backend";

export default function CreateShoppingList() {
	const [text, setText] = useState(`name\n- item1\n- item2`);

	const onClick = () => {
		const lines = text.split("\n");
		const name = lines[0];
		const items = lines.slice(1).map((line) => {
			return { name: line.slice(2), isPurchased: false };
		});
		const shoppingList = { name, items } as ShoppingListBase;
		createShoppingList(shoppingList);
	}
	
	return (
		<div>
			<textarea style={{width: "500px", height: "500px"}} value={text} onChange={e => setText(e.target.value)}></textarea>
			<button onClick={onClick}>Create</button>
		</div>
	);
}