import React from 'react'
import TextLoop from "react-text-loop";

const Home = ({ state, setState }) => {
    document.title = 'Algorithm Visualizer';

    const quotes = [
        "An algorithm must be seen to be believed.",
        "Algorithms are central objects of study in Computer Science.",
        "Algorithms are apprehensible magics.",
        "An algorithm is like a recipe."
    ]

    return (
        <div className="welbotron">
            <div className="container welc">
                <h1 className="welcome">
                    Algorithm Visualizer
                    <div className="quote">
                        <TextLoop
                            interval={3800}
                            springConfig={{ stiffness: 200 }}
                            adjustingSpeed={300}
                        >
                            {quotes.map((quote, index) => (
                                <p key={index} className="quoteText"> {quote} </p>
                            ))}
                        </TextLoop>
                    </div>
                </h1>

                <hr />
                <p className="lead">
                    Click on one of the categories below to visualize algorithms.
                </p>
                <a
                    href="#"
                    className="mainpage-b"
                    onClick={() => {
                        if (!state.rendering) {
                            setState({
                                mode: "pathfinding",
                                currentAlgorithm: null,
                                pathClicked: true,
                            });
                        }
                    }}
                    data-toggle={state.pathClicked ? "" : "modal"}
                    data-target="#pathIntroModal"
                >
                    PATH FINDING
                </a>

                <a
                    href="#"
                    className="mainpage-b"
                    onClick={() => {
                        if (!state.rendering) {
                            setState({
                                mode: "sorting",
                                currentAlgorithm: null,
                                sortClicked: true,
                            });
                        }
                    }}
                    data-toggle={state.sortClicked ? "" : "modal"}
                    data-target="#sortingIntroModal"
                >
                    Sorting
                </a>

                <a
                    href="#"
                    className="mainpage-b"
                    onClick={() => {
                        if (!state.rendering) {
                            setState({
                                mode: "searching",
                                currentAlgorithm: null,
                                searchClicked: true,
                            });
                        }
                    }}
                    data-toggle={state.searchClicked ? "" : "modal"}
                    data-target="#searchingIntroModal"
                >
                    Searching
                </a>

                <a
                    href="#"
                    className="mainpage-b"
                    onClick={() => {
                        if (!state.rendering) {
                            setState({
                                mode: "trie",
                                currentAlgorithm: null,
                                trieClicked: true,
                            });
                        }
                    }}
                    data-toggle={state.trieClicked ? "" : "modal"}
                    data-target="#trieIntroModal"
                >
                    Trie
                </a>
            </div>
        </div>
    )
}

export default Home
