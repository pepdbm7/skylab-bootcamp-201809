document.querySelector('#test-splice').addEventListener('click', function() {
    var months = ['Jan', 'March', 'April', 'June'];
    var removed = splice(months, 1, 2);
    console.log(months);
    console.log(removed);
});

function splice(arr, start, count) {
    var removed = []
    for (var i = start; i < start + count; i++) {
        removed[removed.length] = arr[i];
    }
    return removed;
}
