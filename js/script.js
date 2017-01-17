$(document).ready(function () {
    var count = generateCount();
    var input_array = generate(count);
    $("#input").append("<p id=\"input_txt\">Input array</p>");
    var input_txt = $("#input_txt");
    appendArray(input_txt, input_array, "input_array");

    $("#generate_btn").click(function () {
        count = generateCount();
        $("#input_array").remove();
        input_array = generate(count);
        appendArray(input_txt, input_array, "input_array")
    });

    $("#sort_btn").click(function () {
        $("#output_txt").remove();
        $("#output").append("<p id=\"output_txt\">Output array</p>");
        var sortingType = $('input[name=sortingType]:checked').val();
        if (sortingType == "BubbleSort") {
            bubbleSort(input_array);
        }
    })
});

function generateCount() {
    var count = Math.floor((Math.random() * 10 + 1));
    switch (count) {
        case 0:
            return count + 3;
        case 1:
            return count + 2;
        case 2:
            return ++count;
        default:
            return count;
    }
}

function generate(count) {
    var array = [count];
    for (var i = 0; i < count; i++) {
        array[i] = (Math.floor((Math.random() * 100) + 1))
    }
    return array;
}

function appendArray(element, array, array_id) {
    var input = "<ul id=" + array_id + "></ul>";
    $(element).append(input);
    for (var i = 0; i < array.length; i++) {
        var li = $("<li>" + array[i] + "</li>");
        $("#" + array_id).append(li);
    }
    $(element).hide().fadeIn(500);
}

function printOutputArray(array) {
    $("#output_array").remove();
    appendArray($("#output_txt"), array, "output_array");
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