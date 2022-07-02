import React, { Component } from 'react'

import './PathFindingVisualizer.css'
import { dijkstra, BFS, DFS, getShortestPath, primMaze } from './PathFindingAlgorithms'
import Node from './Node/Node';
import start from '../assets/start.svg';
import finish from '../assets/finish.svg';

export const PathFindingNote = () => {
    return (
        <div>
            <p>
                Pathfinding is generally the process of finding a route between
                two points. It is closely related to the shortest path problem
                in graph theory, which examines how to identify the "best" paths
                valued by different criteria (Ex. distance, cost, time
                consumption).
            </p>
            <p>
                Pathfinding is also similar to Searching in some circumstances.
                For instance, we can use [breadth-first search] to find the
                shortest path in a grid world.
            </p>
            <p>
                In our scenario, the paths are valued by the number of cells
                they passed
                from START : <img src={start} width="20" height="20" /> to
                the TARGET : <img src={finish} width="20" height="20" />
            </p>
            <p>
                You may drag the START and TARGET icons to change their
                positions, and click on the blank nodes to add Walls.
            </p>

            <p>Now please choose a sorting algorithm and visualize it!</p>
            <p className="tips">
                (after choosing an algorithm, click on the [Actions] button.)
            </p>
            <br />
            <p className="tips">
                Note: there could be multiple "best" paths, so paths generated
                by different algorithms may not be consistent.
            </p>
        </div>
    );
}
const algorithmDesc = [
    "Breadth First Search : starts at the root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level.",
    "Dijkstra's Algorithm : a greedy algorithm that finds the shortest path from a start node to the nearest node with a zero distance to the end node.",
    "Depth First Search : starts at the root and explores as far as possible along each branch before backtracking.",
]

class PathFindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            FR: 7,
            FC: 31,
            mouseIsPressed: false,
            changingStart: false,
            changingFinish: false,
            visualized: false,
            rendering: false,
            numRow: 17,
            numCol: 37,
            SR: 7,
            SC: 5,
            speed: 'medium',
            delays: { 'slow': 17, 'medium': 7, 'fast': 3 },
            currentAlgorithm: -1,
            descriptions: algorithmDesc,
            algorithms: ['BFS', 'Dijkstra', 'DFS'],
            pathfindingAlgorithms: [BFS, dijkstra, DFS]
        };
        this.visualizePathfinding = this.visualizePathfinding.bind(this);
        this.clearVisualizer = this.clearVisualizer.bind(this);
        this.setAlgorithm = this.setAlgorithm.bind(this);
        this.props.getFunctions(this.visualizePathfinding, this.clearVisualizer, this.setAlgorithm, this.state.algorithms);
    }

    setAlgorithm(algoId) {
        this.setState({ currentAlgorithm: algoId });
    }

    isRendering() {
        return this.state.rendering;
    }

    componentDidMount() {
        const grid = this.initializeGrid(false);
        this.setState({
            grid: grid,
            currentAlgorithm: -1
        });
    }

    initializeGrid(clearWall) {
        const grid = [];
        for (let row = 0; row < this.state.numRow; row++) {
            const currentRow = [];
            for (let col = 0; col < this.state.numCol; col++) {
                let isW = false;
                const element = document.getElementById(`node-${row}-${col}`);
                if (element && (element.className === 'node node-path' || element.className === 'node node-visited')) {
                    element.className = 'node';
                }
                if (!clearWall && element && element.className === 'node node-wall') {
                    isW = true;
                }
                currentRow.push(this.createNode(row, col, isW));
            }
            grid.push(currentRow);
        }
        return grid;
    }

    createNode(row, col, isW) {
        return {
            col,
            row,
            isStart: row === this.state.SR && col === this.state.SC,
            isFinish: row === this.state.FR && col === this.state.FC,
            distance: Infinity,
            heuristic: Infinity,
            isVisited: false,
            isWall: isW,
            previousNode: null,
        };
    }

    handleMouseDown(row, col) {
        if (row === this.state.SR && col === this.state.SC) {
            this.setState({ changingStart: true });
        }
        else if (row === this.state.FR && col === this.state.FC) {
            this.setState({ changingFinish: true });
        }
        else if (!this.state.rendering) {
            this.updateGridWithWall(this.state.grid, row, col);
            this.setState({ mouseIsPressed: true });
            this.clearVisitedAndPath();
        }
    }

    handleMouseEnter(row, col) {
        if (this.state.mouseIsPressed) {
            this.updateGridWithWall(this.state.grid, row, col);
            this.setState({ mouseIsPressed: true });
        }

        else if (this.state.changingStart && !(row === this.state.FR && col === this.state.FC)) {
            const start = document.getElementById(`node-${this.state.SR}-${this.state.SC}`);
            if (start) {
                start.className = 'node';
                start.isStart = false;
                this.state.grid[this.state.SR][this.state.SC].isStart = false;
            }
            const newStart = document.getElementById(`node-${row}-${col}`);
            if (newStart) {
                newStart.isStart = true;
                newStart.className = 'node node-start';
                this.state.grid[row][col].isStart = true;
            }
            this.setState({ SR: row, SC: col });
            this.clearVisitedAndPath();

        }
        else if (this.state.changingFinish && !(row === this.state.SR && col === this.state.SC)) {
            const finish = document.getElementById(`node-${this.state.FR}-${this.state.FC}`);
            if (finish) {
                finish.className = 'node';
                finish.isFinish = false;
                this.state.grid[this.state.FR][this.state.FC].isFinish = false;
            }
            const newFinish = document.getElementById(`node-${row}-${col}`);
            if (newFinish) {
                newFinish.isFinish = true;
                newFinish.className = 'node node-finish';
                this.state.grid[row][col].isFinish = true;
            }
            this.setState({ FR: row, FC: col });
            this.clearVisitedAndPath();
        }

    }

    handleMouseUp() {
        this.setState({
            changingStart: false,
            changingFinish: false,
            mouseIsPressed: false
        });
    }

    updateGridWithWall(grid, row, col) {
        const node = grid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall
        }
        grid[row][col] = newNode;
    }

    visualizePathfinding() {
        if (this.state.currentAlgorithm === -1) return;
        if (this.state.rendering) return;

        this.setState({ visualized: true, rendering: true });
        this.props.setVisualizerRendering(true);
        const grid = this.initializeGrid(false);
        this.setState({
            grid: grid
        });
        const start = grid[this.state.SR][this.state.SC];
        const finish = grid[this.state.FR][this.state.FC];
        const visitedInOrder = this.state.pathfindingAlgorithms[this.state.currentAlgorithm](grid, start, finish);
        const shortedPath = getShortestPath(finish);
        for (let i = 0; i < visitedInOrder.length; i++) {
            setTimeout(() => {
                const node = visitedInOrder[i];
                if (!node.isStart && !node.isFinish)
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, this.state.delays[this.state.speed] * i);
        }

        for (let i = 0; i < shortedPath.length; i++) {
            setTimeout(() => {
                const node = shortedPath[i];
                if (!node.isStart && !node.isFinish)
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-path';
            }, this.state.delays[this.state.speed] * visitedInOrder.length + 50 * i);

        }
        setTimeout(() => {
            this.setState({ rendering: false });
            this.props.setVisualizerRendering(false);
        }, this.state.delays[this.state.speed] * visitedInOrder.length + 50 * shortedPath.length);

    }

    clearVisualizer() {
        if (!this.state.rendering)
            this.setState({ grid: this.initializeGrid(true), visualized: false });

    }

    clearVisitedAndPath() {
        for (let row = 0; row < this.state.numRow; row++)
            for (let col = 0; col < this.state.numCol; col++) {
                let n = document.getElementById(`node-${row}-${col}`);
                // console.log(n);
                if (n && (n.className === 'node node-visited' || n.className === 'node node-path'))
                    n.className = 'node';
            }
    }

    setSpeed(speed) {
        this.setState({ speed: speed });
    }

    render() {
        document.title = 'Pathfinding | Algorithm Visualizer';

        const grid = this.state.grid;
        return (
            <>
                <div className="grid">
                    {grid.map((row, rowId) => {
                        return (
                            <div key={rowId}>
                                {row.map((node, nodeId) => {
                                    const { row, col, isFinish, isStart, isWall } = node;
                                    return (
                                        <Node
                                            key={nodeId}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isWall={isWall}
                                            mouseIsPressed={this.state.mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                            onMouseUp={() => this.handleMouseUp()}
                                        ></Node>
                                    )
                                })
                                }
                            </div>
                        );
                    })
                    }
                </div>

                <div class={"dropdown"} style={{ marginTop: "40px" }}>
                    <button class="btn btn-outline-dark dropdown-toggle" type="button" disabled={this.state.rendering} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ marginRight: "5px", height: "30px", width: "150px" }}>
                        <p style={{ "margin-top": "-5px" }}>{`Speed: ${this.state.speed}`}</p>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ maxWidth: "150px" }}>
                        <button type="button" class="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setSpeed('slow')}><p style={{ "margin-top": "-5px" }}>{`slow`}</p></button>
                        <button type="button" class="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setSpeed('medium')}><p style={{ "margin-top": "-5px" }}>{`medium`}</p></button>
                        <button type="button" class="btn btn-light navbtn" style={{ height: "30px" }} onClick={() => this.setSpeed('fast')}><p style={{ "margin-top": "-5px" }}>{`fast`}</p></button>
                    </div>

                    <button
                        onClick={() => {
                            primMaze(this.state.grid);
                            this.setState({ finish: false });
                            this.clearVisitedAndPath();
                        }}
                        type="button" class="btn btn-outline-dark"
                        style={{ marginLeft: "5px", "height": "30px" }}
                        disabled={this.state.rendering}>
                        <p style={{ "margin-top": "-6px" }}>Generate Maze</p>
                    </button>
                </div>

                <h6 className='algoDescription'>{this.state.currentAlgorithm === -1 ? "Welcome to Pathfinding. Select an algorithm first." : this.state.descriptions[this.state.currentAlgorithm]}</h6>
            </>
        )
    }
}

export default PathFindingVisualizer