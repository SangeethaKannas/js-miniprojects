const TITLE = 'Javascript Mini Projects'

document.title = TITLE
document.getElementById('title').innerText = TITLE

const menu = document.querySelector('nav ul')

function addEventListeners() {   

    document.getElementById('openup').addEventListener('click', function(e) {
        e.preventDefault()
        slideToggle(menu, 500)
    })

    window.addEventListener('resize', function() {
        var w = window.innerWidth;
        if (w > 480 && (menu.style.display === '' || menu.style.display === 'none') ) {
            menu.removeAttribute('style');
        }
    })

    document.querySelectorAll('nav li').forEach(function(el) {
        el.addEventListener('click', function() {
            var w = window.width();
            if (w < 480) {
                slideToggle(menu, 500)
            }
        })
    })
}

addEventListeners()