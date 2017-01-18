$(document).ready(function () {
    var count = generateCount();
    var data = generateArray(count);
    var inputTitle = $("<p id=\"input_txt\">Input array:</p>");

    $("#input").append(inputTitle);
    appendListFromArray(inputTitle, data, "input_array");

    $("#generate_btn").click(function () {
        count = generateCount();
        $("#input_array").remove();
        data = generateArray(count);
        appendListFromArray(inputTitle, data, "input_array")
    });

    var outputTitleAdded = false;

    $("#sort_btn").click(function () {
        var outputTitle = $("<p id=\"output_txt\">Sorting:</p>");
        if (!outputTitleAdded) {
            $("#output").append(outputTitle);
            outputTitleAdded = true;
        }
        var sortingType = $('input[name=sortingType]:checked').val();
        if (sortingType === "BubbleSort") {
            bubbleSort($("#output_txt"), data, "output_array");
        }
    })
});

function bubbleSort(element, data, arrayName) {
    var array = data.slice();
    var timeout = 0;
    redraw(element, array, arrayName);
    for (var i = array.length - 1; i > 0; i--) {
        var counter = 0;
        var j = 0;
        while (j < i) {
            timeout += 500;
            redrawWithTimeout(element, array, arrayName, j, timeout);
            if (array[j] > array[j + 1]) {
                var tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
                counter++;
            }
            timeout += 500;
            redrawWithTimeout(element, array, arrayName, j, timeout);
            j++;
        }
        if (counter === 0) {
            break;
        }
    }
    timeout += 500;
    redrawWithTimeout(element, array, arrayName, undefined, timeout);
}