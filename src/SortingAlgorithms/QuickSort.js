export function quickSortAnimation(arr) {
    let animations = [];
    quickSortHelper(arr, 0, arr.length - 1, animations);
    
    return animations;
}


// Helped by guru99.com/quicksort-in-javascript.html
export function quickSort(arr) {
    let animations = [];
    const sortedArray = quickSortHelper(arr, 0, arr.length - 1, animations);

    return sortedArray;
}

function quickSortHelper(arr, left, right, animations) {
    // Base case when the array size is one
    if (arr.length <= 1) {
        return
    }

    // Get the first pivot
    var pivot = partition(arr, left, right, animations);

    // If there are more elements on the left side
    if (left < pivot - 1) {
        quickSortHelper(arr, left, pivot - 1, animations);
    }

    // If there are more elements on the right side
    if (pivot < right) {
        quickSortHelper(arr, pivot, right, animations);
    }

    return arr;
}

// Helper function that rearrange an array so that all elements left to the pivot are smaller than the pivot and vice versa
function partition(arr, left, right, animations) {
    // Choose the middle of the arr to be the pivot
    let pivot_ptr = Math.floor((left + right) / 2)
    let pivot = arr[pivot_ptr]

    while (left <= right) {
        // Increment the left pointer until reaching an element larger than the pivot
        while (arr[left] < pivot) {
            // Push to animations twice to change and revert color
            animations.push([left, pivot_ptr, true]);
            animations.push([left, pivot_ptr, false]);
            left++;
        }
        // Decrement the right pointer until reaching an element smaller than the pivot
        while (arr[right] > pivot) {
            // Push to animations twice to change and revert color
            animations.push([right, pivot_ptr, true]);
            animations.push([right, pivot_ptr, false]);
            right--;
        }
        // Swap the two elements
        if (left <= right) {
            swap(arr, left, right, animations);
            left++;
            right--;
        }
    }

    // Return the index that slice up the new sub arrays
    return left;
}

// Helper function that swaps two elements in an array by index
function swap(arr, left, right, animations) {
    const temp = arr[left];
    // Insert a flag that indicate a swap
    animations.push("FLAG")
    animations.push([left, arr[right]]);
    animations.push([right, arr[left]])
    arr[left] = arr[right];
    arr[right] = temp;
    
}
