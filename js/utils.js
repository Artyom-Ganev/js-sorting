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

/**
 * Create new Node
 * @param val - new node value
 */
function Node(val, id) {
    this.value = val;
    this.id = id;
    this.name = val;
    this.children = [];
    this.left = null;
    this.right = null;
}

/**
 * Create new binary tree
 */
function BinaryTree() {
    if (!(this instanceof BinaryTree)) {
        return new BinaryTree();
    }
    this.root = null;
}

/**
 * Insert value to Binary tree
 *
 * @param val - value to insert
 */
BinaryTree.prototype.insert = function (val, id) {
    var root = this.root;
    var newNode = new Node(val, id);

    if (!root) {
        this.root = newNode;
        return;
    }

    var currentNode = root;
    while (currentNode) {
        if (val < currentNode.value) {
            if (!currentNode.left) {
                currentNode.left = newNode;
                addChild(currentNode, newNode);
                break;
            }
            else {
                currentNode = currentNode.left;
            }
        }
        else {
            if (!currentNode.right) {
                currentNode.right = newNode;
                addChild(currentNode, newNode);
                break;
            }
            else {
                currentNode = currentNode.right;
            }
        }
    }
};

function addChild(parent, child) {
    var children = parent.children;
    var size = children.length;
    if (size === 0) {
        children[0] = child;
    } else {
        children[1] = child;
    }
}

/**
 * Write node values in ascending order
 *
 * @param node - start node
 * @param saveTo - array to save values
 * @param index - start index
 * @returns {*} array with sorted values
 */
function incOrder(node, saveTo, index) {
    if (node) {
        if (node.left) {
            index = incOrder(node.left, saveTo, index);
        }
        saveTo[index++] = node.value;
        if (node.right) {
            index = incOrder(node.right, saveTo, index);
        }
    }
    return index;
}

function redrawTreeWithTimeout(element, node, timeout) {
    var newNode = JSON.parse(JSON.stringify(node));
    setTimeout(function () {
        redrawTree(element, newNode);
    }, timeout);
}

function redrawTree(element, node) {
    $("#tree").remove();
    var treeViewer = $("<div id=\"tree\"></div>");
    element.append(treeViewer);
    var json = JSON.stringify(node, ["id", "name", "children"]);
    var reg = new RegExp("\"", 'g');
    var data = eval("[" + json.replace(reg, "") + "]");
    $("#tree").tree({
        data: data,
        autoOpen: true,
        dragAndDrop: false,
        openedIcon: ""
    });
}