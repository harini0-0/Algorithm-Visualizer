function createTrie(sentence, state, setState) {
    let words = sentence.split(' ');
    let trie = JSON.parse('{ "*" : "*" }');
    for (let i = 0; i < words.length; i++)
        addWord(words[i], trie);

    const newState = { ...state, sentence: sentence, search: '', searchResult: '', trie: JSON.stringify(trie) };
    setState(newState);
    return JSON.stringify(trie);
}

function addWord(word, root) {
    let curr_node = root;
    for (let i = 0; i < word.length; i++) {
        if (!curr_node.hasOwnProperty(word[i]))
            curr_node[word[i]] = {};
        curr_node = curr_node[word[i]];
    }
    curr_node['*'] = '*';
}

function search(word, state, setState) {
    let root = JSON.parse(state.trie);
    let curr_node = root;
    let search_result = "";
    word = word.replaceAll(' ', '');
    if (word === state.word) return state.search_result;

    for (let i = 0; i < word.length; i++) {
        if (!curr_node.hasOwnProperty(word[i])) {
            search_result = "not found";
            break;
        }
        curr_node = curr_node[word[i]];
    }
    search_result = (search_result === "" && curr_node.hasOwnProperty('*')) ? "found" : "not found";
    const newState = { ...state, search: word, searchResult: search_result };
    setState(newState);
    // console.log(newState);
    return search_result;
}

export { createTrie, search };