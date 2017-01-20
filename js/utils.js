//This file contains utility functions

/**
 * Generate random number
 *
 * @returns {number} greater then 3 or equal
 */
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

/**
 * Generate array filled with random numbers
 *
 * @param count - array size
 * @returns {[*]} generated array
 */
function generateArray(count) {
    var array = [count];
    for (var i = 0; i < count; i++) {
        array[i] = (Math.floor((Math.random() * 100) + 1))
    }
    return array;
}

/**
 * Sorted data render
 *
 * @param element - element for adding container to render data
 * @param array - data to render
 * @param arrayId - new element id
 */
function appendListFromArray(element, array, arrayId) {
    appendListFromArrayCustom(element, array, arrayId, undefined)
}

/**
 * Sorted data render with custom style for compared array elements
 *
 * @param element - element for adding container to render data
 * @param array - data to render
 * @param arrayId - new element id
 * @param index - array index for customization
 */
function appendListFromArrayCustom(element, array, arrayId, index) {
    var input = $("<ul id=" + arrayId + "></ul>");
    $(element).append(input);
    for (var i = 0; i < array.length; i++) {
        var li = $("<li>" + array[i] + "</li>");
        if (index !== undefined) {
            if (i === index) {
                li.css("background-color", "#ca8833");
            }
            if (i === (index + 1)) {
                li.css("background-color", "#ca8833");
            }
        }
        li.appendTo($("#" + arrayId));
    }
}

/**
 * Redraw data
 *
 * @param element - element for adding container to render data
 * @param array - data to render
 * @param arrayId - new element id
 * @param index - array index for customization
 */
function redraw(element, array, arrayId, index) {
    $("#" + arrayId).remove();
    appendListFromArrayCustom(element, array, arrayId, index);
}

/**
 * Redraw data with timeout
 *
 * @param element - element for adding container to render data
 * @param data - data to render
 * @param arrayId - new element id
 * @param index - array index for customization
 * @param timeout - timeout
 */
function redrawWithTimeout(element, data, arrayId, index, timeout) {
    var array = data.slice();
    setTimeout(function () {
        redraw(element, array, arrayId, index);
    }, timeout);
}

/**
 * Draw tooltip
 *
 * @param appendTo - element for adding container of tooltip
 * @param element - element for display tooltip
 * @param text - tooltip text
 */
function drawTooltip(appendTo, element, text) {
    element.mouseenter(function () {
        var tooltip = $("<div id=\"tooltip\">" + text + "</div>");
        appendTo.append(tooltip);
        tooltip.css({left: 50, top: -70})
            .animate({opacity: 1}, 100);
        setTimeout(function () {
            tooltip.fadeOut(1000);
        }, 1000);
    }).mouseleave(function () {
        $("#tooltip").remove();
    })
}

/**
 * Draw message with timeout
 *
 * @param element - element for adding container of message
 * @param timeout - drawing timeout
 * @param msg - message text
 */
function drawMessage(element, timeout, msg) {
    var finish = $("<p>" + msg + "</p>");
    setTimeout(function () {
        finish.hide();
        element.append(finish);
        finish.fadeIn(1000).fadeOut(3000);
    }, timeout);
    setTimeout(function () {
        finish.remove();
    }, timeout + 3500)
}