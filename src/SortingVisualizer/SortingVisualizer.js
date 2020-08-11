import React from "react"
import "./SortingVisualizer.css"
import * as mergeSort from "../SortingAlgorithms/MergeSort.js"
import * as quickSort from "../SortingAlgorithms/QuickSort.js"

// Constants
const ARR_SIZE = 310
const ANIMATION_DELAY = 1;
const PRIMARY_COLOR = "rgb(225, 192, 255)";
const SECONDARY_COLOR = "blue";

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
        const animations = mergeSort.mergeSortAnimation(this.state.array);
        console.log(animations);
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
        const animations = quickSort.quickSortAnimation(this.state.array);
        console.log(animations);
        // Get the array items
        const arrayItems = document.getElementsByClassName('array-item');
        let changeColor = true;
        for (let i = 0; i < animations.length; i++) {
            // There is a flag in the format of [false, false] to indicate a swap
            if (animations[i] === "FLAG") {
                changeColor = false;
                i++;
            }

            if (changeColor) {
                // Get the items that we are comparing
                const [x, y, z] = animations[i];
                const color = z ?  SECONDARY_COLOR : PRIMARY_COLOR;
                
                setTimeout(() => {
                // Change the color of item x and item y
                arrayItems[x].style.backgroundColor = color;
                arrayItems[y].style.backgroundColor = color;

                    
                }, i * ANIMATION_DELAY);
            } else {
                // Reposition the items
                const [idxA, heightA] = animations[i++];
                const [idxB, heightB] = animations[i];

                setTimeout(() => {
                    arrayItems[idxA].style.height = `${heightA}px`;
                    arrayItems[idxB].style.height = `${heightB}px`;
                }, i * ANIMATION_DELAY);
                changeColor = true;
            }
        }

    }

    bubbleSortButton() {

    }

    heapSortButton() {

    }

    // Function to test whether the customized algo yields the same result as the built in one
    // Param: a function
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
                        style = {{height: `${value}px`,
                                  color: "pink"}}>
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
                    <button onClick = {() => this.testSortingAlgorithm(quickSort.quickSort)}>Test Quick Sort</button>
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

