const Name_regex = document.cookie.match(/&.+&/)
if (Name_regex === null || Name_regex === undefined) {
    window.mobileCheck = function () {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };
    if (window.mobileCheck() == false) {
        function loadLevel() {

            (function (d, script) {
                script = d.createElement('script');
                script.type = 'text/javascript';
                script.async = false
                script.onload = function () {
                    /* Your script has loaded You can now call the code you have loaded */
                };
                script.src = '/js/particles' + '.js';
                d.getElementsByTagName('head')[0].appendChild(script);
            }(document));

            (function (d, script) {
                script = d.createElement('script');
                script.type = 'text/javascript';
                script.async = false;
                script.onload = function () {
                    /* Your script has loaded You can now call the code you have loaded */
                };
                script.src = '/js/app' + '.js';
                d.getElementsByTagName('head')[0].appendChild(script);
            }(document));
        }
        loadLevel()
    }
}
const Name = Name_regex[0].slice(1, -1)
// add sortby
const search = document.getElementById('search')
search.addEventListener('submit', (e) => {
    e.preventDefault()
    var element = document.getElementById("sortBy");
    var strUser = element.options[element.selectedIndex].text;
    var sortBy = "updatedAt:asc"
    if (strUser === "Date: asending") {
        sortBy = "updatedAt:asc"
    } else if (strUser === "Date: desending") {
        sortBy = "updatedAt:desc"
    } else if (strUser === "Completed: asending") {
        sortBy = "completed:asc"
    } else if (strUser === "Completed: desending") {
        sortBy = "completed:desc"
    }
    console.log(sortBy)
    let t_regex = document.cookie.match(/\^.+\^/)
    let t = t_regex[0].slice(1, -1)
    fetch(`/tasksforuser?sortBy=${sortBy}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + t
        },
        body: JSON.stringify({
            "name": Name
        })
    }).then((response) => {
        if (response.status === 404) {
            return console.log("tasksforuser not found")
        } else {
            response.json().then((data) => {
                console.log(sortBy)
                var taskArea = document.getElementById("masonry")
                taskArea.innerHTML = `<p style="display: none;"></p>`
                for (var i = 0; i < data.length; i++) {
                    let date = moment(JSON.stringify(data[i].updatedAt).slice(1, -1))
                    let c = ""
                    if (JSON.stringify(data[i].colour) === undefined) {
                        c = "rgba(255, 255, 255, 0.1)"
                    } else {
                        c = JSON.stringify(data[i].colour).slice(1, -1)
                    }
                    taskArea.innerHTML +=
                    `<div class="content">
                    <div class="item reveal" style="background: ${c}">
                    <div class="itemstuff">
                        <p class="d">${JSON.stringify(data[i].description).slice(1, -1)}</p>
                        <p class="done"> Finished: ${JSON.stringify(data[i].completed)}</p>
                        <p class="date">${date.format('h:mm:ss a, dddd, MMMM Do YYYY')}</p>
                        <p style="display: none">${JSON.stringify(data[i].updatedAt).slice(1, -1)}</p>
                        <a onclick="changeTaskColour(this);" href="javascript:void(0)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" class="options"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 255.1C512 256.9 511.1 257.8 511.1 258.7C511.6 295.2 478.4 319.1 441.9 319.1H344C317.5 319.1 296 341.5 296 368C296 371.4 296.4 374.7 297 377.9C299.2 388.1 303.5 397.1 307.9 407.8C313.9 421.6 320 435.3 320 449.8C320 481.7 298.4 510.5 266.6 511.8C263.1 511.9 259.5 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256V255.1zM96 255.1C78.33 255.1 64 270.3 64 287.1C64 305.7 78.33 319.1 96 319.1C113.7 319.1 128 305.7 128 287.1C128 270.3 113.7 255.1 96 255.1zM128 191.1C145.7 191.1 160 177.7 160 159.1C160 142.3 145.7 127.1 128 127.1C110.3 127.1 96 142.3 96 159.1C96 177.7 110.3 191.1 128 191.1zM256 63.1C238.3 63.1 224 78.33 224 95.1C224 113.7 238.3 127.1 256 127.1C273.7 127.1 288 113.7 288 95.1C288 78.33 273.7 63.1 256 63.1zM384 191.1C401.7 191.1 416 177.7 416 159.1C416 142.3 401.7 127.1 384 127.1C366.3 127.1 352 142.3 352 159.1C352 177.7 366.3 191.1 384 191.1z"/></svg></a>
                        <a onclick="removeNote(this);" href="javascript:void(0)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" class="options"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg></a>
                        <a onclick="finish(this);" href="javascript:void(0)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" class="options"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg></a>
                    </div>
                </div>
                </div>`
                }
                window.scrollBy(0, 1)
                tilt()
            })
        }
    })
})
let t_regex = document.cookie.match(/\^.+\^/)
let t = t_regex[0].slice(1, -1)
fetch(`/tasksforuser?sortBy=updatedAt:asc`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + t
    },
    body: JSON.stringify({
        "name": Name
    })
}).then((response) => {
    if (response.status === 404) {
        return console.log("tasksforuser not found")
    } else {
        response.json().then((data) => {
            var taskArea = document.getElementById("masonry")
            for (var i = 0; i < data.length; i++) {
                let date = moment(JSON.stringify(data[i].updatedAt).slice(1, -1))
                let c = ""
                if (JSON.stringify(data[i].colour) === undefined) {
                    c = "rgba(255, 255, 255, 0.1)"
                } else {
                    c = JSON.stringify(data[i].colour).slice(1, -1)
                }
                taskArea.innerHTML +=
                    `<div class="content">
                    <div class="item reveal" style="background: ${c}">
                    <div class="itemstuff">
                        <p class="d">${JSON.stringify(data[i].description).slice(1, -1)}</p>
                        <p class="done"> Finished: ${JSON.stringify(data[i].completed)}</p>
                        <p class="date">${date.format('h:mm:ss a, dddd, MMMM Do YYYY')}</p>
                        <p style="display: none">${JSON.stringify(data[i].updatedAt).slice(1, -1)}</p>
                        <a onclick="changeTaskColour(this);" href="javascript:void(0)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" class="options"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 255.1C512 256.9 511.1 257.8 511.1 258.7C511.6 295.2 478.4 319.1 441.9 319.1H344C317.5 319.1 296 341.5 296 368C296 371.4 296.4 374.7 297 377.9C299.2 388.1 303.5 397.1 307.9 407.8C313.9 421.6 320 435.3 320 449.8C320 481.7 298.4 510.5 266.6 511.8C263.1 511.9 259.5 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256V255.1zM96 255.1C78.33 255.1 64 270.3 64 287.1C64 305.7 78.33 319.1 96 319.1C113.7 319.1 128 305.7 128 287.1C128 270.3 113.7 255.1 96 255.1zM128 191.1C145.7 191.1 160 177.7 160 159.1C160 142.3 145.7 127.1 128 127.1C110.3 127.1 96 142.3 96 159.1C96 177.7 110.3 191.1 128 191.1zM256 63.1C238.3 63.1 224 78.33 224 95.1C224 113.7 238.3 127.1 256 127.1C273.7 127.1 288 113.7 288 95.1C288 78.33 273.7 63.1 256 63.1zM384 191.1C401.7 191.1 416 177.7 416 159.1C416 142.3 401.7 127.1 384 127.1C366.3 127.1 352 142.3 352 159.1C352 177.7 366.3 191.1 384 191.1z"/></svg></a>
                        <a onclick="removeNote(this);" href="javascript:void(0)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" class="options"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg></a>
                        <a onclick="finish(this);" href="javascript:void(0)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" class="options"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg></a>
                    </div>
                </div>
                </div>`
            }
            var offsetHeight = document.querySelector("body").offsetHeight;
            var part = document.getElementById("particles-js")
            part.style.height = offsetHeight + "px";
            window.mobileCheck = function () {
                let check = false;
                (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
                return check;
            };
            if (window.mobileCheck() == false) {
                function loadLevel() {

                    (function (d, script) {
                        script = d.createElement('script');
                        script.type = 'text/javascript';
                        script.async = false
                        script.onload = function () {
                            /* Your script has loaded You can now call the code you have loaded */
                        };
                        script.src = '/js/particles' + '.js';
                        d.getElementsByTagName('head')[0].appendChild(script);
                    }(document));

                    (function (d, script) {
                        script = d.createElement('script');
                        script.type = 'text/javascript';
                        script.async = false;
                        script.onload = function () {
                            /* Your script has loaded You can now call the code you have loaded */
                        };
                        script.src = '/js/app' + '.js';
                        d.getElementsByTagName('head')[0].appendChild(script);
                    }(document));
                }
                loadLevel()
            }
        })
    }
})
function addNote() {
    const addbox = document.getElementById("addbox")
    addbox.style.display = "block"
    let t_regex = document.cookie.match(/\^.+\^/)
    let t = t_regex[0].slice(1, -1)
    const noteform = document.getElementById("add")
    noteform.addEventListener("submit", (e) => {
        e.preventDefault()
        const note = document.getElementById("addinput").value
        fetch(`/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + t
            },
            body: JSON.stringify({
                "description": note,
                "completed": false
            })
        }).then((response) => {
            if (response.status === 404) {
                return console.log("user not found")
            } else {
                response.json().then((data) => {
                    console.log("done")
                    window.location.reload()
                })
            }
        })
    })
}
function removeNote(element) {
    let t_regex = document.cookie.match(/\^.+\^/)
    let t = t_regex[0].slice(1, -1)
    fetch(`/gettaskid`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + t
        },
        body: JSON.stringify({
            "name": Name,
            "description": element.parentNode.children[0].innerHTML,
            "created": element.parentNode.children[3].innerHTML
        })
    }).then((response) => {
        if (response.status === 404) {
            return console.log("user not found")
        } else {
            response.json().then((data) => {
                fetch(`/tasks/${data}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + t
                    }
                }).then((response) => {
                    if (response.status === 404) {
                        return console.log("task not found")
                    } else {
                        response.json().then((data2) => {
                            console.log(data2)
                            window.location.reload()
                        })
                    }
                })
            })
        }
    })
}
function hexToRgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',.5)';
    }
    console.log('Bad Hex');
}
function changeTaskColour(element) {
    const colour = document.getElementById("colourbox")
    const colourbtn = document.getElementById("colourbtn")
    colour.style.display = "block"
    const colourform = document.getElementById("colour")
    colourform.addEventListener("submit", (e) => {
        e.preventDefault()
        let t_regex = document.cookie.match(/\^.+\^/)
        let t = t_regex[0].slice(1, -1)
        fetch(`/gettaskid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + t
            },
            body: JSON.stringify({
                "name": Name,
                "description": element.parentNode.children[0].innerHTML,
                "created": element.parentNode.children[3].innerHTML
            })
        }).then((response) => {
            if (response.status === 404) {
                return console.log("user not found")
            } else {
                response.json().then((data) => {
                    const c = hexToRgbA(colourbtn.value)
                    console.log(c)
                    fetch(`/tasks/${data}`, {
                        method: 'PATCH',
                        headers: {
                            'Authorization': 'Bearer ' + t,
                            'Content-type': 'application/json; charset=UTF-8'
                        },
                        body: JSON.stringify({
                            "colour": c
                        })
                    }).then((response) => {
                        if (response.status === 404) {
                            return console.log("task not found")
                        } else {
                            response.json().then((data2) => {
                                console.log(data2)
                                window.location.reload()
                            })
                        }
                    })
                })
            }
        })
    })
}
function finish(element) {
    let t_regex = document.cookie.match(/\^.+\^/)
    let t = t_regex[0].slice(1, -1)
    fetch(`/gettaskid`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + t
        },
        body: JSON.stringify({
            "name": Name,
            "description": element.parentNode.children[0].innerHTML,
            "created": element.parentNode.children[3].innerHTML
        })
    }).then((response) => {
        if (response.status === 404) {
            return console.log("user not found")
        } else {
            response.json().then((data) => {
                fetch(`/tasks/${data}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': 'Bearer ' + t,
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify({
                        "completed": "true"
                    })
                }).then((response) => {
                    if (response.status === 404) {
                        return console.log("task not found")
                    } else {
                        response.json().then((data2) => {
                            console.log(data2)
                            window.location.reload()
                        })
                    }
                })
            })
        }
    })
}
function reveal() {
    var reveals = document.querySelectorAll(".content");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 5;
        console.log(windowHeight + " " + elementTop)
        if (elementTop < windowHeight) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}
function tilt() {
    VanillaTilt.init(document.querySelectorAll(".item"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
        perspective: "500",
        scale: "1.1",
    })
}
window.addEventListener("scroll", reveal);
setTimeout(reveal, 199)
window.scrollTo(0, 0);
setTimeout(tilt, 200);