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

function generateArray(count) {
    var array = [count];
    for (var i = 0; i < count; i++) {
        array[i] = (Math.floor((Math.random() * 100) + 1))
    }
    return array;
}

function appendListFromArray(element, array, arrayId) {
    var input = $("<ul id=" + arrayId + "></ul>");
    $(element).append(input);
    for (var i = 0; i < array.length; i++) {
        var li = $("<li>" + array[i] + "</li>");
        li.hide().appendTo($("#" + arrayId)).show("slow");
    }
}