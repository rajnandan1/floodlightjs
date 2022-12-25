
class FloodLight {
    constructor(config) {
        let _this = this;
        let randomStr = makeid(8);
        let prefix = "bisar-" + randomStr + "-";
        if (config && !!config.cssClassPrefix) {
            prefix = config.cssClassPrefix + "-";
        }
		let paramSeparator = ","
		if(config && config.paramSeparator && config.paramSeparator.length == 1){
			paramSeparator = config.paramSeparator;
		}
        let wrapper = prefix + "wrapper";
        let dropDown = prefix + "dropdown";
        let inputBox = prefix + "input";
        let itemBox = prefix + "item";
        let itemClass = prefix + "item";
        let search = prefix + "search";

        let colorItem = "#fff";
        let colorItemActive = "#efefef";
        let fontColor = "#1A1A40";
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            colorItem = "#111";
            colorItemActive = "#231e24";
            fontColor = "#efefef";
        }
        if (config && !!config.theme) {
			if(typeof config.theme == "string"){
				let th = config.theme
				config.theme = {}
				config.theme[th] = {}
			}
            let pref = Object.keys(config.theme);

            if (pref[0] == "light") {
                colorItem = "#fff";
                colorItemActive = "#e1ebf7";
                fontColor = "#1A1A40";
            } else if (pref[0] == "dark") {
                colorItem = "#111";
                colorItemActive = "#231e24";
                fontColor = "#efefef";
            }
            if (!!config.theme[pref[0]].primary) {
                colorItem = config.theme[pref[0]].primary;
            }
            if (!!config.theme[pref[0]].primary) {
                colorItemActive = config.theme[pref[0]].secondary;
            }
            if (!!config.theme[pref[0]].fontColor) {
                fontColor = config.theme[pref[0]].fontColor;
            }
        }

        let allCommands = [];
        let keyCharToCode = {
            Backspace: 8,
            Tab: 9,
            Enter: 13,
            Shift: 16,
            Ctrl: 17,
            Alt: 18,
            "Pause/Break": 19,
            "Caps Lock": 20,
            Esc: 27,
            Space: 32,
            "Page Up": 33,
            "Page Down": 34,
            End: 35,
            Home: 36,
            Left: 37,
            Up: 38,
            Right: 39,
            Down: 40,
            Insert: 45,
            Delete: 46,
            0: 48,
            1: 49,
            2: 50,
            3: 51,
            4: 52,
            5: 53,
            6: 54,
            7: 55,
            8: 56,
            9: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            Windows: 91,
            "Right Click": 93,
            "Numpad 0": 96,
            "Numpad 1": 97,
            "Numpad 2": 98,
            "Numpad 3": 99,
            "Numpad 4": 100,
            "Numpad 5": 101,
            "Numpad 6": 102,
            "Numpad 7": 103,
            "Numpad 8": 104,
            "Numpad 9": 105,
            "Numpad *": 106,
            "Numpad +": 107,
            "Numpad -": 109,
            "Numpad .": 110,
            "Numpad /": 111,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            "Num Lock": 144,
            "Scroll Lock": 145,
            "My Computer": 182,
            "My Calculator": 183,
            ";": 186,
            "=": 187,
            ",": 188,
            "-": 189,
            ".": 190,
            "/": 191,
            "`": 192,
            "[": 219,
            "\\": 220,
            "]": 221,
            "'": 222,
        };
        _this.run = function () {
            for (let i = 0; i < allCommands.length; i++) {
                const element = allCommands[i];
				let cmdCombo = element.key.toUpperCase().split("+");
				let comboKey = cmdCombo[0];
				let comboTrigger = "";
				if(cmdCombo.length > 1){
					comboKey = cmdCombo[1];
					comboTrigger = cmdCombo[0];
					
				}
				if(!["SHIFT", "CMD", "CTRL", ""].includes(comboTrigger)){
					throw new Error("Invalid Cmd");
				}
				 
                document.addEventListener("keydown", function logKey(e) {
                    if(comboTrigger == "" && e.keyCode == keyCharToCode[comboKey]){
						if (!isTextInput(document.activeElement)) {
                            addContainer(i);
                        }
					}else if (comboTrigger == "SHIFT" && e.keyCode == keyCharToCode[comboKey] && e.shiftKey) {
                        if (!isTextInput(document.activeElement)) {
                            addContainer(i);
                        }
                    } else if(["CMD", "CTRL"].includes(comboTrigger) && e.keyCode == keyCharToCode[comboKey] && (e.ctrlKey || e.metaKey)){
						e.preventDefault();
						addContainer(i);
					} else if (e.key === "Escape") {
                        hideBisar();
                    }
                });
            }
        };

        _this.addCommand = function (key, name) {
            let cmd = new Object();
            cmd.addAction = function (params, desc, fn) {
                if (this.parameters === undefined) {
                    this.parameters = [];
                }
				if(typeof params === "function"){
					fn = params;
					params = [];
					desc = "";
				} else if (!Array.isArray(params) || params.length == 0) {
                    throw new Error("First parameter should be a non-empty array");
                }
                this.parameters.push({
                    params: params,
                    desc: desc,
                    fn: fn,
                });
            };
            cmd.key = key.replace(/\s/g,'');
			if(cmd.key == ""){
				throw new Error("Invalid Cmd")
			}
            cmd.name = name;

            allCommands.push(cmd);
            return allCommands[allCommands.length - 1];
        };

        // allCommands
        function addItemStyle(template, item) {
            let inp = getInputArray();
            template.innerHTML = "";
            let params = item.params;
            let desc = item.desc;
            for (let i = 0; i < params.length; i++) {
                const element = params[i];
                desc = desc.replaceAll(
                    "{" + element + "}",
                    "<i>" + inp[i] + "</i>"
                );
            }
            template.classList.add(itemClass);
            template.innerHTML = desc;

            template.style.cursor = "pointer";
            template.style.padding = "15px 10px";
            template.style.color = fontColor;
            template.style.backgroundColor = colorItem;
            template.addEventListener(
                "mouseover",
                function (e) {
                    let div = e.target || e.srcElement;
                    div.style.backgroundColor = colorItemActive;
                    div.setAttribute("selected", true);
                },
                false
            );
            template.addEventListener(
                "mouseout",
                function (e) {
                    let div = e.target || e.srcElement;
                    div.style.backgroundColor = colorItem;
                    div.removeAttribute("selected");
                },
                false
            );
            template.addEventListener("click", execute, false);
            return template;
        }

        function addItems(div) {
            document.getElementById(dropDown).innerHTML = "";
            let inp = getInputArray();
            let list = getCommand().parameters;
            if (inp.length == 0 || list.length == 0) {
                return;
            }
            document.addEventListener("keydown", addDropDownEvents, false);
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                if (element.params.length > inp.length) {
                    continue;
                }
                let template = document.createElement("div");
                template.setAttribute("id", itemBox + i);
                template.setAttribute("ix", i);
                template = addItemStyle(template, element);

                if (i != list.length - 1) {
                    template.style.borderBottom =
                        "1px solid " + colorItemActive;
                }
                div.appendChild(template);
            }
            selectOne(0);
        }
        function addDropDown(div) {
            if (document.getElementById(dropDown) !== null) {
                addItems(document.getElementById(dropDown));
                return;
            }

            const template = document.createElement("div");
            template.setAttribute("id", dropDown);
            template.style.width = "100%";
            template.style.maxHeight = "400px";
            template.style.position = "absolute";
            template.style.top = "50px";
            template.style.borderRadius = "8px";
            template.style.overflowY = "auto";
            template.style.backgroundColor = colorItem;
            template.style.border = "2px solid " + colorItemActive;
            div.parentNode.appendChild(template);
            addItems(document.getElementById(dropDown));
        }
        function searchInput(e) {
            let div = e.target || e.srcElement;
            if (div.value.length > 0) {
                addDropDown(document.getElementById(inputBox));
            } else {
                let drpdiv = document.getElementById(dropDown);
                drpdiv.parentNode.removeChild(drpdiv);
            }
        }
        function addInput(div) {
            const template = document.createElement("input");
            template.setAttribute("id", inputBox);
            template.style.width = "100%";
            template.style.height = "45px";
            template.style.padding = "10px 5px";
            template.style.fontSize = "16px";
            template.style.color = fontColor;
            template.style.borderRadius = "8px";
            template.style.boxSizing = "border-box";
            template.style.outline = "none";
            template.style.backgroundColor = colorItem;
            template.style.border = "2px solid " + colorItemActive;

            template.setAttribute("placeholder", getCommand().name);
            template.value = "";

            div.appendChild(template);
            setTimeout(function () {
                document.getElementById(inputBox).focus();
            }, 10);

            document
                .getElementById(inputBox)
                .addEventListener("input", searchInput);
			document
                .getElementById(inputBox)
                .addEventListener("keydown", function(e){
					if (e.keyCode == 40 || e.keyCode == 38) {
                       e.preventDefault();
                    } 
				}, false);
        }

        function addSearch(div) {
            const template = document.createElement("div");
            template.setAttribute("id", search);
            template.style.left = "50%";
            template.style.width = "40%";
            template.style.top = "30%";
            template.style.position = "absolute";
            template.style.transform = "translate(-50%,-50%)";
            div.appendChild(template);
            addInput(document.getElementById(search));
            // document.getElementById("bisar-input").addEventListener("input", searchInput);
        }
        function addContainer(ix) {
			if(allCommands[ix].parameters[0].params.length == 0){
				allCommands[ix].parameters[0].fn();
				return;
			}
            let bisarMainDiv = document.getElementById(wrapper);
            if (bisarMainDiv === null) {
                const template = document.createElement("div");
                template.setAttribute("id", wrapper);

                template.style.position = "fixed";
                template.style.zIndex = 10000000;
                template.style.left = "0%";
                template.style.top = "0%";
                template.style.width = "100vw";
                template.style.height = "100vh";
                template.style.background = "rgba(0,0,0, .3)";
                template.setAttribute("ix", ix);
                document.body.appendChild(template);
                addSearch(document.getElementById(wrapper));
            }
        }

        function hideBisar() {
            let bisarMainDiv = document.getElementById(wrapper);
            if (bisarMainDiv !== null) {
                bisarMainDiv.parentNode.removeChild(bisarMainDiv);
                document.removeEventListener(
                    "keydown",
                    addDropDownEvents,
                    false
                );
                return;
            }
        }
        function selectUpDown(dir) {
            let allItems = document.getElementsByClassName(itemClass);
            let curItem = -1;
            for (let i = 0; i < allItems.length; i++) {
                const element = allItems[i];
                element.style.backgroundColor = colorItem;
                if (element.getAttribute("selected")) {
                    curItem = i;
                }
                element.removeAttribute("selected");
            }
            if (dir == "up") {
                curItem = curItem - 1;
                if (curItem < 0) {
                    curItem = allItems.length - 1;
                }
            } else if (dir == "down") {
                curItem = curItem + 1;
                if (curItem >= allItems.length) {
                    curItem = 0;
                }
            }

            selectOne(curItem);
        }
        function handleEnter() {
            let allItems = document.getElementsByClassName(itemClass);
            let curItem = -1;
            for (let i = 0; i < allItems.length; i++) {
                const element = allItems[i];
                if (element.getAttribute("selected")) {
                    curItem = i;
                    break;
                }
            }
            if (curItem == -1) {
                return;
            }
            execute();
        }
        function execute(e) {
            let div;
            let element;
            if (e) {
                div = e.target || e.srcElement;
                element = getSelectedItem(parseInt(div.getAttribute("ix")));
            } else {
                element = getSelectedItem();
            }

            let inp = getInputArray();
            let obj = {};
            for (let j = 0; j < element.params.length; j++) {
                const el = element.params[j];
                obj[el] = inp[j];
            }
            element.fn(obj);
            hideBisar();
        }
        function addDropDownEvents(e) {
            if (e.keyCode == 40) {
                selectUpDown("down");
            } else if (e.keyCode == 38) {
                selectUpDown("up");
            } else if (e.keyCode == 13) {
                handleEnter();
            }
        }
        function getCommand() {
            let ix = parseInt(
                document.getElementById(wrapper).getAttribute("ix")
            );
            return allCommands[ix];
        }
        function getSelectedItem(ix) {
            if (ix) {
                return getCommand().parameters[ix];
            }
            let curItem = -1;
            let allItems = document.getElementsByClassName(itemClass);
            for (let i = 0; i < allItems.length; i++) {
                const element = allItems[i];
                if (element.getAttribute("selected")) {
                    curItem = i;
                    break;
                }
            }
            return getCommand().parameters[curItem];
        }
        function getInputArray() {
            let inp = document
                .getElementById(inputBox)
                .value.trim()
                .split(paramSeparator)
                .map((x) => {
                    return x.trim();
                });
            return inp;
        }
        function selectOne(i) {
            let allItems = document.getElementsByClassName(itemClass);
			if(allItems.length == 0) return;
            for (let i = 0; i < allItems.length; i++) {
                const element = allItems[i];
                element.style.backgroundColor = colorItem;
            }
            allItems[i].setAttribute("selected", true);
            allItems[i].style.backgroundColor = colorItemActive;
        }
        function isTextInput(ele) {
            let tagName = ele.tagName;
            if (tagName === "INPUT") {
                let validType = [
                    "text",
                    "password",
                    "number",
                    "email",
                    "tel",
                    "url",
                    "search",
                    "date",
                    "datetime",
                    "datetime-local",
                    "time",
                    "month",
                    "week",
                ];
                let eleType = ele.type;
                return validType.includes(eleType);
            }
            return false;
        }
        function makeid(length) {
            var result = "";
            var characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
            }
            return result;
        }
    }
}
export default function(opt){return new FloodLight(opt);}