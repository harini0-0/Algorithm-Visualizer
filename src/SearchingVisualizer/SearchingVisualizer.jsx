import React, { Component } from 'react'

import './SearchingVisualizer.css'
import { linearSearch, binarySearch } from './SearchingAlgorithms'
import Pile from './Pile/Pile'

export const SearchingNote = () => {
    return (
        <>
            <p>
                Searching is the process of finding a given value position in a list of values. It is the algorithmic process of finding a particular item in a collection of items.
            </p>
            <div>
                Common uses of search algorithms are:
                <div className="uses-list">
                    <p>·find solutions with specified properties in a large search space</p>
                    <p>·process data in a defined order</p>
                    <p>·applied for explicitly stored databases, virtual search spaces, quantum computers</p>
                </div>
                Now please choose a searching algorithm and visualize it!
            </div>
        </>
    );
}

const getRandomInt = (range) => Math.floor(Math.random() * range);

const algorithmDesc = [
    'Linear Search : sequentially check each element of the list until a match is found or the whole list has been searched.',
    'Binary Search : search a sorted array by repeatedly dividing the search interval in half.'
];

class SearchingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            piles: [],
            target: -1,
            numPiles: 41,
            finished: false,
            pileStates: [],
            pileDelayTimes: [60, 80],
            speed: "medium",
            DelayTimesSizeBased: { 'fast': [30, 40], 'medium': [60, 80], 'slow': [100, 120] },
            colorSetIndex: getRandomInt(3),
            currentAlgorithm: -1,
            descriptions: algorithmDesc,
            algorithms: ['Linear Search', 'Binary Search'],
            searchingAlgorithms: [linearSearch, binarySearch]
        };
        this.randomizePiles = this.randomizePiles.bind(this);
        this.visualizeSearching = this.visualizeSearching.bind(this);
        this.setAlgorithm = this.setAlgorithm.bind(this);
        this.props.getFunctions(this.visualizeSearching, this.randomizePiles, this.setAlgorithm, this.state.algorithms);
    }

    componentDidMount() {
        this.initializePiles(false);
    }

    initializePiles(createTarget = true) {
        let piles = [];
        for (let i = 0; i < this.state.numPiles; i++)
            piles.push(i + 5);

        if (this.state.currentAlgorithm !== 1)
            for (let i = 0; i < this.state.numPiles; i++) {
                let j = getRandomInt(i);
                piles[i] = piles[i] + piles[j] - (piles[j] = piles[i]);
            }

        const target = createTarget ? piles[getRandomInt(this.state.numPiles)] : -1;
        const pileStates = new Array(this.state.numPiles).fill(1);
        this.setState({ piles: piles, target: target, pileStates: pileStates });
        // console.log("A" + piles + " : " + target);
    }

    visualizeSearching() {
        if (this.state.currentAlgorithm === -1 || this.state.rendering) return;
        this.setState({ rendering: true, finished: false, pileStates: new Array(this.state.numPiles).fill(1) });
        this.props.setVisualizerRendering(true);

        const piles = this.state.piles.slice();
        const statesInOrder = this.state.searchingAlgorithms[this.state.currentAlgorithm](piles, this.state.target);
        // console.log(statesInOrder);
        for (let i = 0; i < statesInOrder.length; i++) {
            setTimeout(() => {
                // this.setState.pileStates = statesInOrder[i];
                this.setState({ pileStates: statesInOrder[i] });
                // console.log(i + " : " + statesInOrder[i]);
            }, this.state.pileDelayTimes[this.state.currentAlgorithm] * i * 10);
        }
        setTimeout(() => {
            this.setState({ rendering: false, finished: true });
            this.props.setVisualizerRendering(false);
        }, this.state.pileDelayTimes[this.state.currentAlgorithm] * statesInOrder.length);
    }

    randomizePiles() {
        if (this.state.currentAlgorithm === -1 || this.state.rendering) return;
        this.setState({ finished: false, pileStates: new Array(this.state.numPiles).fill(1), colorSetIndex: getRandomInt(3) });
        this.initializePiles();
    }

    setAlgorithm(algoId) {
        if (this.state.rendering || this.state.currentAlgorithm === algoId) return;
        this.state.currentAlgorithm = algoId;
        this.setState({ currentAlgorithm: algoId });
        this.randomizePiles();
        // console.log("B" + this.state.piles + " : " + this.state.target);
    }

    setSpeed(speed) {
        this.setState({ speed: speed, pileDelayTimes: this.state.DelayTimesSizeBased[speed] });
    }

    render() {
        document.title = 'Searching | Algorithm Visualizer';

        const piles = this.state.piles;
        let n = <p>Time Complexity: θ(n)</p>
        let Logn = <p>Time Complexity: θ(log(n))</p>
        return (
            <>
                <div className="target">
                    {this.state.target !== -1 &&
                        <div>
                            Target : {this.state.target}
                            <hr />
                        </div>
                    }
                </div>

                <div className='piles container'>
                    {piles.map((pile, pileId) => {
                        return (
                            <Pile
                                type={this.state.pileStates[pileId]}
                                className='pile'
                                key={pileId}
                                index={pileId}
                                val={pile}
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

                <h6 className='algoDescription'>{this.state.currentAlgorithm === -1 ? "Welcome to Searching. Select an algorithm first." : this.state.descriptions[this.state.currentAlgorithm]}</h6>
                <h5 className='algoComplexity' style={{ marginTop: "-4.5%", color: "rgb(90,90,90)" }}>{
                    this.state.currentAlgorithm === -1 ?
                        "" : this.state.currentAlgorithm === 0 ?
                            n : Logn
                }</h5>
            </>
        );
    }
}

export default SearchingVisualizer
