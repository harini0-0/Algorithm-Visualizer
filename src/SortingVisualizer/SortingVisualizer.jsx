import React, { Component } from 'react'

import './SortingVisualizer.css';
import { selectionSort, bubbleSort, insertionSort, mergeSort, quickSort } from './SortingAlgorithms';
import Pile from './Pile/Pile'

export const SortingNote = () => {
	return (
		<>
			<p>
				Sorting is a process of arranging an ordered sequence. It is a common operation in many applications.
			</p>
			<div>
				Common uses of sorted sequences are:
				<div className="uses-list">
					<p>·lookup or search efficiently</p>
					<p>·merge sequences efficiently</p>
					<p>·process data in a defined order</p>
				</div>
				Now please choose a sorting algorithm and visualize it!
			</div>
		</>
	);
}

const getRandomInt = (min, range) => Math.floor(Math.random() * range) + min;

const algorithmDesc = [
	'Selection Sort: repeatedly find the minimum element from the unsorted part and append it to the sorted part.',
	'Bubble Sort: repeatedly swap the adjacent elements if they are in wrong order.',
	'Insertion Sort: repeatedly place value from the unsorted part at the correct position in the sorted part(by finding the closest left-side element that is smaller than it).',
	'Merge Sort: divide the array into two halves, sort them recursively using merge sort, and then merge the two halves.',
	'Quick Sort: choose an element as pivot, arrange the array such that the elements smaller than pivot are on its left and others are on its right, sort the two halves recursively.'
];

class SortingVisualizer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			piles: [],
			numPiles: 40,
			finished: false,
			changingPiles: [],
			pileDelayTimes: [30, 40, 40, 80, 80],
			speed: "medium",
			DelayTimesSizeBased: { 'fast': [15, 20, 20, 40, 40], 'medium': [30, 40, 40, 80, 80], 'slow': [60, 80, 80, 160, 160] },
			colorSetIndex: getRandomInt(0, 3),
			currentAlgorithm: -1,
			descriptions: algorithmDesc,
			unsortedPiles: [],
			algorithms: ['Selection Sort', 'Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'],
			sortingAlgorithms: [selectionSort, bubbleSort, insertionSort, mergeSort, quickSort]
		};
		this.randomizePiles = this.randomizePiles.bind(this);
		this.visualizeSorting = this.visualizeSorting.bind(this);
		this.setAlgorithm = this.setAlgorithm.bind(this);
		this.props.getFunctions(this.visualizeSorting, this.randomizePiles, this.setAlgorithm, this.state.algorithms);
	}

	componentDidMount() {
		const piles = this.initializePiles();
		this.setState({ piles: piles, unsortedPiles: piles.slice() });
	}

	setAlgorithm(algoId) {
		if (this.state.unsortedPiles !== [])
			this.setState({ finished: false, changingPiles: [], piles: this.state.unsortedPiles, pivot: -1 });
		this.setState({ currentAlgorithm: algoId });
	}

	initializePiles() {
		let piles = [];
		for (let i = 0; i < this.state.numPiles; i++)
			piles.push(i + 5);

		for (let i = 0; i < this.state.numPiles; i++) {
			let j = getRandomInt(0, i);
			let temp = piles[i];
			piles[i] = piles[j];
			piles[j] = temp;
		}
		piles.push(this.state.numPiles + 5);
		return piles;
	}

	visualizeSorting() {
		if (this.state.currentAlgorithm === -1 || this.state.rendering) return;
		if (this.state.finished) {
			this.setState({ finished: false, changingPiles: [], piles: this.state.unsortedPiles });
		}
		this.setState({ rendering: true });
		this.props.setVisualizerRendering(true);
		const piles = this.state.piles.slice();

		const statesInOrder = this.state.sortingAlgorithms[this.state.currentAlgorithm](piles);
		for (let i = 0; i < statesInOrder.length; i++) {
			const { piles: state, changing: changingPiles, pivot } = statesInOrder[i];
			setTimeout(() => {
				this.setState({ piles: state, changingPiles: changingPiles, pivot: pivot });
			}, this.state.pileDelayTimes[this.state.currentAlgorithm] * i);
		}
		setTimeout(() => {
			this.setState({ rendering: false, finished: true });
			this.props.setVisualizerRendering(false);
		}, this.state.pileDelayTimes[this.state.currentAlgorithm] * statesInOrder.length);
	}

	randomizePiles() {
		if (this.state.rendering) return;
		this.setState({ finished: false, changingPiles: [], colorSetIndex: getRandomInt(0, 3) });
		const piles = this.initializePiles();
		this.setState({ piles: piles, unsortedPiles: piles.slice() });
	}

	setSpeed(speed) {
		this.setState({ speed: speed, pileDelayTimes: this.state.DelayTimesSizeBased[speed] });
	}

	render() {
		document.title = 'Sorting | Algorithm Visualizer';

		const piles = this.state.piles;
		let nSquare = <p>Time Complexity: θ(n&#178;)</p>
		let nLogn = <p>Time Complexity: θ(n·log(n))</p>
		return (
			<>
				<div className='piles' className="container">
					{piles.map((pile, pileId) => {
						return (
							<Pile
								finished={this.state.finished}
								className='pile'
								key={pileId}
								index={pileId}
								val={pile}
								isChanging={this.state.changingPiles.indexOf(pileId) !== -1}
								isPivot={this.state.pivot === pile}
								colorSetIndex={this.state.colorSetIndex}
							/>
						)
					})}
				</div>

				<div className="d-flex">
					<div className="dropdown" style={{ width: "50%", marginLeft: "45%", marginRight: "50%", marginTop: "3%" }}>
						<button className="btn btn-outline-dark dropdown-toggle" type="button" disabled={this.state.rendering} id="dropdownMenuSpeed" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ height: "30px", width: "150px" }}>
							<p style={{ "marginTop": "-5px" }}>{`Speed: ${this.state.speed}`}</p>
						</button>
						<div className="dropdown-menu" aria-labelledby="dropdownMenuSpeed">
							<li>
								<button type="button" className="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setSpeed('slow')}><p style={{ "marginTop": "-5px" }}>{`slow`}</p></button>
								<button type="button" className="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setSpeed('medium')}><p style={{ "marginTop": "-5px" }}>{`medium`}</p></button>
								<button type="button" className="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setSpeed('fast')}><p style={{ "marginTop": "-5px" }}>{`fast`}</p></button>
							</li>
						</div>
					</div>
				</div>

				<h6 className='algoDescription'>{this.state.currentAlgorithm === -1 ? "Welcome to Sorting. Select an algorithm first." : this.state.descriptions[this.state.currentAlgorithm]}</h6>
				<h5 className='algoComplexity' style={{ marginTop: "-4.5%", color: "rgb(90,90,90)" }}>{
					this.state.currentAlgorithm === -1 ?
						"" : this.state.currentAlgorithm < 3 ?
							nSquare : nLogn
				}</h5>
			</>
		);
	}
}

export default SortingVisualizer
