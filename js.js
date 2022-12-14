/*
	requestAnimationFrame polyfill
*/
(function (w) {
    var lastTime = 0,
        vendors = ['webkit', /*'moz',*/ 'o', 'ms'];
    for (var i = 0; i < vendors.length && !w.requestAnimationFrame; ++i) {
        w.requestAnimationFrame = w[vendors[i] + 'RequestAnimationFrame'];
        w.cancelAnimationFrame = w[vendors[i] + 'CancelAnimationFrame'] ||
            w[vendors[i] + 'CancelRequestAnimationFrame'];
    }

    if (!w.requestAnimationFrame)
        w.requestAnimationFrame = function (callback, element) {
            var currTime = +new Date(),
                timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                id = w.setTimeout(function () {
                    callback(currTime + timeToCall)
                }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!w.cancelAnimationFrame)
        w.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
})(window);

/*
	Slot Machine
*/
/*
	requestAnimationFrame polyfill
*/


/*
	Slot Machine
*/
var sm = (function (undefined) {


    var tMax = 3000, // animation time, ms
        height = 210,
        speeds = [],
        r = [],
        reels = [
            ['coffee maker', 'teapot', 'espresso machine'],
            ['coffee filter test', 'tea strainer test', 'espresso tamper test'],

        ],
        $reels,
        // $msg,
        start;

    function init() {
        $reels = document.querySelectorAll('.reel').forEach(function (el, index) {
            el.innerHTML = '<div><p>' + reels[index].join('</p><p>') + '</p></div><div><p>' + reels[index].join('</p><p>') + '</p></div>'
        });

        // $msg = document.getElementsByClassName('msg')[0];

        // document.getElementById('click').addEventListener('click',action);
    }


    function action() {
        if (start !== undefined) return;

        for (var i = 0; i < 3; ++i) {
            speeds[i] = Math.random() + .5;
            r[i] = (Math.random() * 3 | 0) * height / 3;
        }

        // $msg.textContent = 'Spinning...';
        animate();
    }

    function animate(now) {
        if (!start) start = now;
        var t = now - start || 0;

        for (var i = 0; i < 2; ++i)

            document.querySelectorAll('.reel')[i].scrollTop = (speeds[i] / tMax / 2 * (tMax - t) * (tMax - t) + r[i]) % height | 0;


        if (t < tMax)
            requestAnimationFrame(animate);
        else {
            start = undefined;
            // check();
            onceRoll = true
        }

    }

    // function check() {
    //     $msg.textContent =
    //         r[0] === r[1] && r[1] === r[2] ?
    //         'You won! Enjoy your ' + reels[1][(r[0] / 70 + 1) % 3 | 0].split(' ')[0] :
    //         'Try again';
    // }

    return {
        init: init,
        action:action
    }

})();

sm.init();
// ---------------
// slide btn
// ------------------
var isMouseIn = false
var slider = document.getElementById('slider')
var sliderTube = document.getElementById('button-background')
slider.addEventListener('mousedown', (e) => {
    isMouseIn = true
})
window.addEventListener('mouseup', (e) => {
    isMouseIn = false
})
var sliderTubetopPos = sliderTube.getBoundingClientRect().top
var sliderTubeRelativeHeight = sliderTubetopPos + sliderTube.offsetHeight
var sliderTopPos = slider.getBoundingClientRect().top
var first = true;
var onceRoll = true
document.addEventListener('mousemove', (e) => {
     console.log(sliderTubetopPos,sliderTubeRelativeHeight)
    if (isMouseIn && e.y > sliderTubetopPos && e.y < sliderTubeRelativeHeight) {
        slider.style.top = (e.y - sliderTubetopPos - slider.offsetHeight/2) + 'px'
        if((slider.getBoundingClientRect().top > sliderTubeRelativeHeight - 100) && onceRoll) {
            
            sm.action()
            onceRoll = false
        }
    } else {

        if (sliderTopPos < slider.getBoundingClientRect().top) {
            if (first) {
                interval()
            }
        }
    }
})

var intervall;

function interval() {
    first = false;
    intervall = setInterval(() => {
        // var crnt = slider.getBoundingClientRect().top
        if (sliderTopPos < slider.getBoundingClientRect().top) {
            console.log(slider.getBoundingClientRect().top - 1)
            slider.style.top = (slider.getBoundingClientRect().top - 1) + 'px'

        } else {
            slider.style.top = '-10px'
            first = true
            clearInterval(intervall)
        }
    }, 2000);
}