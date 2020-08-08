import React from "react"
import "./SortingVisualizer.css"
import {mergeSort} from "../SortingAlgorithms/MergeSort.js";
import {mergeSortAnimation} from "../SortingAlgorithms/MergeSort.js"

// Constants
const ARR_SIZE = 200
const ANIMATION_DELAY = 5;
const DEFAULT_COLOR = "black"
const PRIMARY_COLOR = "pink";
const SECONDARY_COLOR = "green";

export default class SortingVisualizer extends React.Component{

    constructor() {
        super(); 

        // Initilize the array that will be sorted
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.generateArray(ARR_SIZE);
    }

    // Generate an array of desired size with random element 
    generateArray(size) {
        const arr = [];
        for (let i = 0; i < size; i++) {
            arr.push(genRandomNums(1, 700));
        }

        this.setState({array: arr});
    }

    // Button handlers that show animations
    mergeSortButton() {
        const animations = mergeSortAnimation(this.state.array);
        // Get the array items
        const arrayItems = document.getElementsByClassName('array-item');
        for (let i = 0; i < animations.length; i++) {
            /* The animation array is set up like
                1. Highlight color
                2. Revert color
                3. Change pos */
            const changeColor = i % 3 !== 2;
            if (changeColor) {
                // Get the items that we are comparing
                const [x, y] = animations[i];
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    // Change color of item x and item y
                    arrayItems[x].style.backgroundColor = color;
                    arrayItems[y].style.backgroundColor = color;
                }, i * ANIMATION_DELAY);
            } else {
                // Reposition the items
                const [idx, height] = animations[i];
                setTimeout(() => {
                    arrayItems[idx].style.height = `${height}px`;
                }, i * ANIMATION_DELAY);
            }
        }
    }

    quickSortButton() {

    }

    bubbleSortButton() {

    }

    heapSortButton() {

    }

    testSortingAlgorithm(algo) {
        const official = this.state.array.slice().sort((a, b) => a - b);
        const mine = algo(this.state.array);

        if (arrayAreEqual(official, mine)) {
            console.log("YES!")
        } else {
            console.log("NO!!")
        }
    }

    genPerfectArray(size) {
        const arr = [];
        for (let i = 0; i < size; i++) {
            arr.push(i);
        }
        // Shuffule the array
        arr.sort(() => Math.random() - 0.5);

        this.setState({array : arr});
    }

    render() {

        return (
            <div>
                {/* Display the array elements as bars with height === value */}
                <div className = "array-container">
                    {this.state.array.map((value, id) => (
                    <div
                        className="array-item"
                        key={id}
                        style = {{height: `${value}px`}}>
                    </div>
                    ))}
                </div>

                {/* Create buttons */}
                <div className = "button-container">
                    <button onClick = {() => this.generateArray(ARR_SIZE)}>Generate new array</button>
                    <button onClick = {() => this.genPerfectArray(ARR_SIZE)}>Generate Perfect Array</button>
                    <button onClick = {() => this.mergeSortButton()}>Merge Sort</button>
                    <button onClick = {() => this.quickSortButton()}>Quick Sort</button>
                    <button onClick = {() => this.bubbleSortButton()}>Bubble Sort</button>
                    <button onClick = {() => this.heapSortButton()}>Heap Sort</button>
                    <button onClick = {() => this.testSortingAlgorithm(mergeSort)}>Test Merge Sort</button>
                </div>

            </div>
        )
    }
}

function genRandomNums(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

// Helper function that checks if two arrays are equal or not
function arrayAreEqual(a1, a2) {
    for (let i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) {
            return false;
        }
    }

    return true;
}

