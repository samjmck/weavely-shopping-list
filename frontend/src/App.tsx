import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShoppingsLists from "./pages/ShoppingsLists";
import ShoppingList from "./pages/ShoppingList";
import CreateShoppingList from "./pages/CreateShoppingList";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<CreateShoppingList />} />
				<Route path="/shopping-lists" element={<ShoppingsLists />} />
				<Route path="/shopping-list/:id" element={<ShoppingList />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;
