(() => {
    let names = ["progress-bar"];
    let handlers = {
        "progress-bar": function (element, data) {
            data = {
                ...{
                    "progress-bar-min": 0,
                    "progress-bar-max": 100,
                    "progress-bar-width": 100,
                    "progress-bar-value": 0,
                    "progress-bar-end-action": "none"
                },
                ...data
            };
            if (data["progress-bar-max"] <= data["progress-bar-value"]) {
                if (!element.getAttribute("progress-bar-end-action") && data["progress-bar-end-action"] != "none")
                    element.setAttribute("progress-bar-end-action", data["progress-bar-end-action"]);
            }
        }
    };

    function parseStyle(element) {
        let style = element.getAttribute("style");
        let data = {};
        style = style.split(/[\s;]+/);
        for (let item of style) {
            let name = item.split(":")[0].substring(2);
            let value = item.split(":")[1];
            value && (data[name] = value);
        }
        return data;
    }

    function HandleCssAnimations() {
        window.requestAnimationFrame(HandleCssAnimations);
        if (!document.body) return;
        let elements = document.querySelectorAll(".progress-bar");
        for (let elem of elements) {
            let data = parseStyle(elem);
            let clas = elem.getAttribute("class").split(" ");
            for (let class_name of clas) {
                handlers[class_name] && handlers[class_name](elem, data);
            }
        }
    }
    HandleCssAnimations();
})();
let progress_bar_value = 0;

function loop() {
    window.requestAnimationFrame(loop);
    if (!document.body) return;
    !document.getElementById("progress-bar").getAttribute("progress-bar-end-action") && (document.getElementById("progress-bar").style = `--progress-bar-value:${document.getElementById("range").value};--progress-bar-width:200;--progress-bar-end-action:${document.getElementById("end-action").value};`);
}
loop();