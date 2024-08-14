import React, { useEffect, useState } from "react";
import type { ShoppingList as ShoppingListType } from "../types";
import { getShoppingLists } from "../backend";
import { Link } from "react-router-dom";

const Index = () => {
	const [shoppingLists, setShoppingLists] = useState<ShoppingListType[]>([]);

	useEffect(() => {
		getShoppingLists().then(setShoppingLists);
	}, []);

	return (
		<div>
			<h1>Shopping list</h1>
			<ul>
				{shoppingLists.map((shoppingList) => (
					<li>
						<Link key={shoppingList.id} to={`/shopping-list/${shoppingList.id}`}>{shoppingList.name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Index;