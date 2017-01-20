$(document).ready(function () {
    //data initialization
    var count = generateCount();
    var data = generateArray(count);
    var inputTitle = $("<p id=\"input_txt\">Input array:</p>");
    var generateBtn = $("#generate_btn");
    var sortBtn = $("#sort_btn");
    var buttons = $(".buttons");

    //input array render
    $("#input").append(inputTitle);
    appendListFromArray(inputTitle, data, "input_array");

    //"Generate" button click handling
    generateBtn.click(function () {
        count = generateCount();
        $("#input_array").remove();
        data = generateArray(count);
        appendListFromArray(inputTitle, data, "input_array")
    });

    //"Sort" button click handling
    var outputTitleAdded = false;
    sortBtn.click(function () {
        var outputTitle = $("<p id=\"output_txt\">Sorting:</p>");
        if (!outputTitleAdded) {
            $("#output").append(outputTitle);
            outputTitleAdded = true;
        }
        runSelectedSort(data)
    });

    //View tooltips for buttons
    drawTooltip(buttons, generateBtn, "Generate new sorting data");
    drawTooltip(buttons, sortBtn, "Sort generated data");
});

/**
 * Run function corresponding to selection sort type
 *
 * @param data - array to sort
 */
function runSelectedSort(data) {
    var sortingType = $('input[name=sortingType]:checked').val();
    var outputTxt = $("#output_txt");
    if (sortingType === "BubbleSort") {
        outputTxt.show();
        bubbleSort(outputTxt, data, "output_array");
    } else {
        outputTxt.hide();
        drawMessage($("#input_array"), 0, "Sorry, tree sort is not implemented yet.")
    }
}

/**
 * Bubble sort function
 *
 * @param element - element for adding container to render data
 * @param data - array to sort
 * @param arrayName - array id
 */
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
    timeout += 500;
    drawMessage(element, timeout, "Sorting successfully finished!");
}