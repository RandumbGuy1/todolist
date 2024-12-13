var tasks = undefined;

function start() {
    interval = setInterval(() => {
        tasks = document.querySelectorAll(".task-list");
        
        tasks.forEach(task => {
            let display = task.querySelector(".timer-display");
            let startTime = task.querySelector(".start-time");

            let deltaMilliseconds = new Date() - new Date(startTime.innerHTML);
            display.innerHTML = millisecondsToStopWatch(deltaMilliseconds);
        })
    }, 1000);
}

function refresh() {
    tasks = document.querySelectorAll(".task-list");
}

function millisecondsToStopWatch(milliseconds) {
    time = []       
    s = 1000;
    m = 60 * s;
    h = 60 * m;
    d = 24 * h;
    conversions = [d, h, m, s];
   
    conversions.forEach(t => {
        elapsed = Math.floor(milliseconds / t);
        if (elapsed > 0 || time.length > 0) {
            time.push(elapsed);

            milliseconds -= elapsed * t
        }
    })

    if (time.length > 1) {
        return time.map(el => el.toString().padStart(2, '0')).join(':');
    }
    if (time.length > 0) {
        return `0:${time[0]?.toString().padStart(2, '0')}`;
    }
    return "0:00";
}