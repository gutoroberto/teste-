var ops = document.querySelectorAll('.op')

for (let i = 0; i < ops.length; i++) {
    ops[i].onclick = function (e) {
        if (e.target.innerText === '')
            e.target.innerText = 'X'
    }
}