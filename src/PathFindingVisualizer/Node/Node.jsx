import React from "react";
import "./Node.css";

const Node = (props) => {
	const {
		row,
		col,
		isFinish,
		isStart,
		onMouseDown,
		onMouseEnter,
		onMouseUp,
		isWall,
	} = props;

	const nodeClass = isFinish ? "node-finish"
		: isStart ? "node-start"
			: isWall ? "node-wall" : "";

	return (
		<div
			id={`node-${row}-${col}`}
			className={`node ${nodeClass}`}
			onMouseDown={() => onMouseDown(row, col)}
			onMouseEnter={() => onMouseEnter(row, col)}
			onMouseUp={() => onMouseUp()}
		></div>
	);
};

export default Node;
