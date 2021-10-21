let inDarkMode = false
let inDarkModeKey = 'inDarkMode'
let sidebar = document.getElementById('sidebar')
let images = ['showcase1.png', 'showcase2.png', 'showcase3.png', 'showcase4.png']
let imageCounter = 0
let slideShow = "#slideshow"
let width = 0
let height = 0


if (typeof localStorage != undefined) {
    console.log(localStorage)
    inDarkMode = localStorage.getItem(inDarkModeKey) == 'true'
}

window.onclick = (event) => {
    if (event.target == sidebar) toggleSideBar()
}

window.onload = () => { updateSize() }

window.onresize = () => { updateSize() }

slideThroughImages()

function updateSize() {
    width = window.innerWidth
    height = window.innerHeight
    $('#slideshowcontainer').css({ 'width': width, 'height': height })
}

function slideThroughImages() {
    setTimeout(() => {
        $(slideShow).animate({ left: `${width}px`, opacity: '0' }, 500, () => {
            imageCounter++
            if (imageCounter == images.length) imageCounter = 0
            document.getElementById("slideshow").src = 'images/' + images[imageCounter]
            $(slideShow).css('left', `-${width}px`)
            $(slideShow).animate({ left: `0px`, opacity: '1' }, 500, slideThroughImages)
        })
    }, 4000);
}

function toggleTheme(toggle) {
    if (toggle) inDarkMode = !inDarkMode
    textColor = ''

    if (inDarkMode) {
        backgroundImage = "#1d1d1d"
        textColor = '#FFFFFF'
    } else {
        backgroundImage = "#FFFFFF"
        textColor = '#00000'
    }

    $('body').css('color', textColor)
    $('body').css('background', backgroundImage)
    $('.sidebar-content').css('background', backgroundImage)
    if (typeof localStorage != undefined) {
        localStorage.setItem(inDarkModeKey, String(inDarkMode))
        console.log(localStorage)
    }
}

function toggleSideBar() {
    isVisible = $('#sidebar').css('display') == 'block'
    isVisible = !isVisible

    // $('#sidebarButton').toggle()

    if (isVisible) {
        // $('.navigation_bar_style').css('box-shadow', 'none')
        $('#sidebarButton').animate({ rotate: '180deg' }, 200, () => {
            $('#sidebar').css('display', 'block')
            $("#sidebar").animate({ left: '0px' })
        })
    } else $("#sidebar").animate({ left: '-300px' }, 300, () => {
        $('#sidebar').css('display', 'none')
        $("#sidebarButton").animate({ rotate: '0deg' })
    })

}