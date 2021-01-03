function emptyChildren(...args) {

    for (let index in args) {
        let node = args[index];
        while (node.firstChild) {
            node.removeChild(node.lastChild);
        }
    }
}