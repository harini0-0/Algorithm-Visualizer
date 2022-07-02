import React, { Component } from "react";

import PathFindingVisualizer, { PathFindingNote } from "../PathFindingVisualizer/PathFindingVisualizer";
import SearchingVisualizer, { SearchingNote } from "../SearchingVisualizer/SearchingVisualizer";
import SortingVisualizer, { SortingNote } from "../SortingVisualizer/SortingVisualizer";
import TrieVisualizer, { TrieNote } from "../TrieVisualizer/TrieVisualizer";

import Home from "./Home";
import Navbar from "./Navbar";
import "./Visualizer.css";

class Visualizer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: 'main',
			rendering: false,
			algorithms: [],
			currentAlgorithm: null,
			goFunction: () => { },
			resetFunction: () => { },
			setAlgorithm: () => { },
			sortingClicked: false,
			pathClicked: false,
			searchingClicked: false,
			trieClicked: false,
		};
		this.getFunctions = this.getFunctions.bind(this);
		this.changeRenderingState = this.changeRenderingState.bind(this);
	}

	changeRenderingState(rendering) {
		this.setState({ rendering: rendering });
	}

	getFunctions(go, reset, setAlgo, algorithms) {
		this.setState({
			goFunction: go,
			resetFunction: reset,
			setAlgorithm: setAlgo,
			algorithms: algorithms,
		});
	}

	render() {
		let renderObj = null;
		if (this.state.mode === "pathfinding")
			renderObj = <PathFindingVisualizer setVisualizerRendering={this.changeRenderingState} getFunctions={this.getFunctions} />;
		else if (this.state.mode === "searching")
			renderObj = <SearchingVisualizer setVisualizerRendering={this.changeRenderingState} getFunctions={this.getFunctions} />;
		else if (this.state.mode === "sorting")
			renderObj = <SortingVisualizer setVisualizerRendering={this.changeRenderingState} getFunctions={this.getFunctions} />;
		else if (this.state.mode === "trie")
			renderObj = <TrieVisualizer setVisualizerRendering={this.changeRenderingState} getFunctions={this.getFunctions} />;
		else
			renderObj = <Home state={this.state} setState={(newState) => this.setState(newState)} />;

		return (
			<>
				<Navbar state={this.state} setState={(newState) => this.setState(newState)} />

				<div className="modal fade" id="setAlgoModal" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">No Algorithm Selected</h5>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>

							<div className="modal-body-alert">
								<p>Please select an algorithm first.</p>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-dark"
									data-dismiss="modal"
									style={{ width: "100px" }}
								>
									OK
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="modal fade" id="pathIntroModal" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content intro">
							<div className="modal-header">
								<h5 className="modal-title">Pathfinding</h5>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>

							<div className="modal-body intro">
								<PathFindingNote />
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-dark"
									data-dismiss="modal"
									style={{ width: "100px" }}
								>
									OK
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="modal fade" id="sortingIntroModal" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content intro">
							<div className="modal-header">
								<h5 className="modal-title">Sorting</h5>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>

							<div className="modal-body intro">
								<SortingNote />
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-dark"
									data-dismiss="modal"
									style={{ width: "100px" }}
								>
									OK
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="modal fade" id="searchingIntroModal" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content intro">
							<div className="modal-header">
								<h5 className="modal-title">Searching</h5>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>

							<div className="modal-body intro">
								<SearchingNote />
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-dark"
									data-dismiss="modal"
									style={{ width: "100px" }}
								>
									OK
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="modal fade" id="trieIntroModal" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content intro">
							<div className="modal-header">
								<h5 className="modal-title">Trie</h5>
								<button type="button" className="close" data-dismiss="modal">
									&times;
								</button>
							</div>

							<div className="modal-body intro">
								<TrieNote />
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-dark"
									data-dismiss="modal"
									style={{ width: "100px" }}
								>
									OK
								</button>
							</div>
						</div>
					</div>
				</div>


				<div>{renderObj}</div>
			</>
		);
	}
}

export default Visualizer;