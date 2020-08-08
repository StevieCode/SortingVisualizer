// Returns the animations that are taken place during sorting
// Does not return the sorted array!
export function mergeSortAnimation(arr) {
    let animations = [];
    if (arr.length <= 1) {
        return arr;
    }

    const aux = arr.slice();
    mergeSortHelper(arr, aux, 0, arr.length - 1, animations);
    return animations;
}

// Return the sorted array
export function mergeSort(arr) {
    let animations = [];
    if (arr.length <= 1) {
        return arr;
    }

    const aux = arr.slice();
    mergeSortHelper(arr, aux, 0, arr.length - 1, animations);
    return arr;
}

function mergeSortHelper(arr, aux, start, end, animations) {
    // Base case when arr size is one
    if (start === end) {
        return;
    }

    // Get mid index
    const mid = Math.floor((start + end) / 2);
    // Recursion step
    mergeSortHelper(aux, arr, start, mid, animations);
    mergeSortHelper(aux, arr, mid + 1, end, animations);
    // Merge back together
    merge(arr, aux, start, mid, end, animations);

}

function merge(arr, aux, start, mid, end, animations) {
    let left = start;
    let ori = start;
    let right = mid + 1;

    while (left <= mid && right <= end) {
        // Push values that are being compared into the animation array for color change
        animations.push([left, right]);
        // Push them in again to revert color
        animations.push([left, right]);

        // Compare values from the left and right side
        if (aux[left] <= aux[right]) {
            // Placing the sorted value into the original array
            animations.push([ori, aux[left]]);
            arr[ori++] = aux[left++];
        } else {
            // Placing the sorted value into the original array
            animations.push([ori, aux[right]]);
            arr[ori++] = aux[right++];
        }
    }

    // Push the remaining values from the left side
    while (left <= mid) {
        // Push it twice to change color and revert it
        animations.push([left, left]);
        animations.push([left, left]);
        // Place the sorted value into the original array
        animations.push([ori, aux[left]]);
        arr[ori++] = aux[left++];
    }
    // Push the reamining values from the right side
    while (right <= end) {
        // Push it twice to change color and revert it
        animations.push([right, right]);
        animations.push([right, right]);
        // Place the sorted value into the original array
        animations.push([ori, aux[right]]);
        arr[ori++] = aux[right++];
    }
}