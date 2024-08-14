import React from "react";
import { useShoppingLists } from "../backend";
import { Link } from "react-router-dom";

export default function ShoppingsLists() {
	const { shoppingLists } = useShoppingLists();

	return (
		<div>
			<h1>Shopping lists</h1>
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