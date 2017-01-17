$(document).ready(function () {
    var count = generateCount();
    var data = generateArray(count);
    var inputTitle = $("<p id=\"input_txt\">Input array</p>");
    $("#input").append(inputTitle);
    appendListFromArray(inputTitle, data, "input_array");

    $("#generate_btn").click(function () {
        count = generateCount();
        $("#input_array").remove();
        data = generateArray(count);
        appendListFromArray(inputTitle, data, "input_array")
    });

    $("#sort_btn").click(function () {
        $("#output_txt").remove();
        $("#output").append("<p id=\"output_txt\">Output array</p>");
        var sortingType = $('input[name=sortingType]:checked').val();
        if (sortingType == "BubbleSort") {
            bubbleSort(data);
        }
    })
});

function printOutputArray(array) {
    $("#output_array").remove();
    appendListFromArray($("#output_txt"), array, "output_array");
}

function bubbleSort(array) {
    printOutputArray(array);
    var tmp;
    for (var i = array.length - 1; i > 0; i--) {
        var counter = 0;
        for (var j = 0; j < i; j++) {
            var list = $("#output_array").find("li");
            $(list[j]).css("background-color", "#ca8833");
            $(list[j + 1]).css("background-color", "#ca8833");
            if (array[j] > array[j + 1]) {
                tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
                counter++;
            }
            printOutputArray(array);
        }
        if (counter == 0) {
            break;
        }
    }
}