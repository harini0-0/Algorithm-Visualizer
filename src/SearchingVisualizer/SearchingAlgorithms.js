function linearSearch(array, target) {
    // console.log(array + " : " + target);
    let statesInOrder = [];
    let state = new Array(array.length).fill(1);
    for (let i = 0; i < array.length; i++) {
        statesInOrder.push(state.slice());
        // console.log(state);
        if (array[i] === target) {
            state[i] = 2;
            statesInOrder.push(state.slice());
            return statesInOrder;
        }
        state[i] = 0;
    }
    return statesInOrder;
}

function getbinarySearchState(low, high, mid, state) {
    // console.log(low + " " + high + " " + mid);
    for (let j = 0; j < state.length; j++)
        state[j] = (j >= low && j <= high) ? 1 : 0;
    state[mid] = 2;
    return state;
}

function binarySearch(array, target) {
    // console.log(array + " :: " + target);
    let statesInOrder = [];
    let state = new Array(array.length).fill(1);
    let low = 0, high = array.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        statesInOrder.push(getbinarySearchState(low, high, mid, state).slice());
        if (array[mid] === target)
            return statesInOrder;
        else if (array[mid] < target)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return statesInOrder;
}

export { linearSearch, binarySearch };