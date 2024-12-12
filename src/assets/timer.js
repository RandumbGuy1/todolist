function start() {
    setInterval(() => {
        tasks = document.querySelectorAll(".task-list");
        
        tasks.forEach(task => {
            let display = task.querySelector(".timer-display");
            let startTime = task.querySelector(".start-time");

            let deltaMilliseconds = new Date() - new Date(startTime.innerHTML);
            display.innerHTML = millisecondsToStopWatch(deltaMilliseconds);
        })
    }, 1000);

    function millisecondsToStopWatch(milliseconds) {
        time = []
        // time units in milliseconds
        s = 1000;
        m = 60 * s;
        h = 60 * m;
        d = 24 * h;
        conversions = [d, h, m, s];
        // get the number of days
        conversions.forEach(t => {
            elapsed = Math.floor(milliseconds / t);
            if (elapsed > 0 || time.length > 0) {
                time.push(elapsed);
                // remove the time elapsed from milliseconds
                milliseconds -= elapsed * t
            }
        })
        if (time.length > 1) {
            return time.map(el => el.toString().padStart(2, '0')).join(':');
        }
        if (time.length > 0) {
            return `:${time[0]?.toString().padStart(2, '0')}`;
        }
        return ":00";
    }
}