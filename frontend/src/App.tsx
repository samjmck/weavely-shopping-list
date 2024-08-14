import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import ShoppingList from "./pages/ShoppingList";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/shopping-list/:id" element={<ShoppingList />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;
