import React, { useState } from 'react';
import ReactJson from 'react-json-view';

import './TrieVisualizer.css'
import { createTrie, search } from './TrieAlgorithms'

export const TrieNote = () => {
    return (
        <>
            <p>
                Trie is an efficient information reTrieval data structure.
            </p>
            <div>
                Common uses of Trie are:
                <div className="uses-list">
                    <p>·lookup or search efficiently</p>
                    <p>·no collisions of different keys</p>
                    <p>·used in search engines like google</p>
                </div>
                Now please enter a sentence and visualize it!
            </div>
        </>
    );
}

const SourceText = ({ state, setState }) => {
    const handleChange = async (event) => {
        let trie = await createTrie(event.target.value, state, (newState) => setState(newState));
    }

    return (
        <div className="container-sentence">
            <input className="input-sentence" type="text" value={state.sentence} onChange={handleChange} placeholder="Enter Sentence ..." />
        </div>
    )
}

const Search = ({ state, setState }) => {
    const handleChange = async (event) => {
        let searchResult = await search(event.target.value, state, (newState) => setState(newState));
    }

    return (
        <>
            <div className="container-search">
                <input className="input-search" type="text" placeholder="Search Word" value={state.search} onChange={handleChange} />
            </div>
        </>
    )
}

const Trie = ({ state }) => {
    let trie = JSON.parse(state.trie);
    return (
        <>
            <div className="container">
                {state.search !== '' && state.searchResult !== '' &&
                    <div className="searchResult">
                        {state.search} {state.searchResult} in given trie.
                        <hr />
                    </div>
                }
                <ReactJson src={trie} />
            </div>
        </>
    );
}

const TrieVisualizer = () => {
    document.title = "Trie | Algorithm Visualizer";
    const [state, setState] = useState({
        sentence: '',
        trie: '{ "*" : "*" }',
        search: '',
        searchResult: '',
    });

    return (
        <>
            <div className="root">
                <div className="header">
                    <SourceText state={state} setState={(newState) => setState(newState)} />
                    <Search state={state} setState={(newState) => setState(newState)} />
                </div>
                <Trie state={state} />
            </div>
        </>
    )
}

export default TrieVisualizer
