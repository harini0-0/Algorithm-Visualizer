import React from "react";
import "./Visualizer.css";

const Navbar = (props) => {
	let invisibleOrNot = "";
	if (props.state.mode === "main" || props.state.mode === "trie") invisibleOrNot = " invisible";
	let algorithms = props.state.algorithms;
	// console.log(props);
	return (
		<nav className="navbar navbar-expand-lg navbar-light fixed-top bg-dark">
			<button
				onClick={() => {
					if (!props.state.rendering) {
						props.setState({ ...props.state, mode: "main" });
					}
				}}
				type="button"
				className="btn btn-dark navbtn"
				disabled={props.state.rendering}
			>
				Main
			</button>

			<button
				onClick={() => {
					if (!props.state.rendering) {
						props.setState({
							...props.state,
							mode: "pathfinding",
							currentAlgorithm: null,
							pathClicked: true,
						});
						props.state.setAlgorithm(-1);
					}
				}}
				type="button"
				className="btn btn-dark navbtn"
				data-toggle={props.state.pathClicked ? "" : "modal"}
				data-target="#pathIntroModal"
				disabled={props.state.rendering}
			>
				Pathfinding
			</button>

			<button
				onClick={() => {
					if (!props.state.rendering) {
						props.setState({
							...props.state,
							mode: "sorting",
							currentAlgorithm: null,
							sortingClicked: true,
						});
						props.state.setAlgorithm(-1);
					}
				}}
				type="button"
				className="btn btn-dark navbtn"
				data-toggle={props.state.sortingClicked ? "" : "modal"}
				data-target="#sortingIntroModal"
				disabled={props.state.rendering}
			>
				Sorting
			</button>

			<button
				onClick={() => {
					if (!props.state.rendering) {
						props.setState({
							...props.state,
							mode: "searching",
							currentAlgorithm: null,
							searchingClicked: true,
						});
						props.state.setAlgorithm(-1);
					}
				}}
				type="button"
				className="btn btn-dark navbtn"
				data-toggle={props.state.searchingClicked ? "" : "modal"}
				data-target="#searchingIntroModal"
				disabled={props.state.rendering}
			>
				Searching
			</button>

			<button
				onClick={() => {
					if (!props.state.rendering) {
						props.setState({
							...props.state,
							mode: "trie",
							currentAlgorithm: null,
							trieClicked: true,
						});
						props.state.setAlgorithm(-1);
					}
				}}
				type="button"
				className="btn btn-dark navbtn"
				data-toggle={props.state.trieClicked ? "" : "modal"}
				data-target="#trieIntroModal"
				disabled={props.state.rendering}
			>
				Trie
			</button>

			<div className={"dropdown" + invisibleOrNot}>
				<button
					className="btn btn-secondary dropdown-toggle navbtn"
					type="button"
					id="dropdownMenuButton"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
					disabled={props.state.rendering}
				>
					{props.state.currentAlgorithm == null
						? "Algorithms"
						: props.state.currentAlgorithm}
				</button>

				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					<li>
						{algorithms.map((algorithm, algoId) => {
							return (
								<button
									type="button"
									className="btn btn-light navbtn"
									key={algoId}
									onClick={() => {
										props.state.setAlgorithm(algoId);
										props.setState({
											...props.state,
											currentAlgorithm: props.state.algorithms[algoId],
										});
									}}
								>
									{algorithm}
								</button>
							);
						})}
					</li>
				</div>
			</div>

			<div className={"dropdown" + invisibleOrNot}>
				<button
					className="btn btn-light dropdown-toggle navbtn"
					type="button"
					id="dropdownMenuButton"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
					disabled={props.state.rendering}
				>
					Actions
				</button>
				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					<li>
						<button
							type="button"
							className="btn btn-light navbtn"
							onClick={() => props.state.goFunction()}
							data-toggle={props.state.currentAlgorithm === null ? "modal" : ""}
							data-target="#setAlgoModal"
							disabled={
								props.state.mode === "ai" &&
								props.state.currentAlgorithm === "Minimax"
							}
						>
							Go!
						</button>

						<button
							type="button"
							className="btn btn-light navbtn"
							onClick={() => props.state.resetFunction()}
						>
							Reset
						</button>
					</li>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
