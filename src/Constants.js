var editMode = false;
var tagWhiteList = [];
var tagBlackList = [];
var girlWhiteList = [];
var girlBlackList = [];

var tagWhiteListHandlers = [];
function broadcastTagWhiteListChange() {
    tagWhiteListHandlers.forEach(f => f(tagWhiteList))
}
var tagBlackListHandlers = [];
function broadcastTagBlackListChange() {
    tagBlackListHandlers.forEach(f => f(tagBlackList))
}
var girlWhiteListHandlers = [];
function broadcastGirlWhiteListChange() {
    girlWhiteListHandlers.forEach(f => f(girlWhiteList))
}
var girlBlackListHandlers = [];
function broadcastGirlBlackListChange() {
    girlBlackListHandlers.forEach(f => f(girlBlackList))
}

function Constants() {
    return {
        getEditMode: function () {
            return editMode;
        },
        setEditMode: function (value) {
            editMode = value;
        },
    
        // Tag WhiteList
        getTagWhiteList: function () {
            return tagWhiteList;
        },
        addToTagWhiteList: function (tag) {
            if (!tagWhiteList.includes(tag)) {
                tagWhiteList.push(tag);
                tagWhiteList.sort();
                broadcastTagWhiteListChange();
            }
        },
        removeFromTagWhiteList: function (tag) {
            if (tagWhiteList.includes(tag)) {
                var idx = tagWhiteList.indexOf(tag);
                tagWhiteList.splice(idx, 1);
                broadcastTagWhiteListChange();
            }
        },
        registerTagWhiteListHandler: function (handler) {
            tagWhiteListHandlers.push(handler);
        },
        unregisterTagWhiteListHandler: function (handler) {
            if (tagWhiteListHandlers.includes(handler)) {
                var idx = tagWhiteListHandlers.indexOf(handler);
                tagWhiteListHandlers.splice(idx, 1);
            }
        },
    
        // Tag Blacklist
        getTagBlackList: function () {
            return tagBlackList;
        },
        addToTagBlackList: function (tag) {
            if (!tagBlackList.includes(tag)) {
                tagBlackList.push(tag);
                tagBlackList.sort();
                broadcastTagBlackListChange();
            }
        },
        removeFromTagBlackList: function (tag) {
            if (tagBlackList.includes(tag)) {
                var idx = tagBlackList.indexOf(tag);
                tagBlackList.splice(idx, 1);
                broadcastTagBlackListChange();
            }
        },
        registerTagBlackListHandler: function (handler) {
            tagBlackListHandlers.push(handler);
        },
        unregisterTagBlackListHandler: function (handler) {
            if (tagBlackListHandlers.includes(handler)) {
                var idx = tagBlackListHandlers.indexOf(handler);
                tagBlackListHandlers.splice(idx, 1);
            }
        },
    
        // Girl Whitelist
        getGirlWhiteList: function () {
            return girlWhiteList;
        },
        addToGirlWhiteList: function (girl) {
            if (!girlWhiteList.includes(girl)) {
                girlWhiteList.push(girl);
                girlWhiteList.sort();
                broadcastGirlWhiteListChange();
            }
        },
        removeFromGirlWhiteList: function (girl) {
            if (girlWhiteList.includes(girl)) {
                var idx = girlWhiteList.indexOf(girl);
                girlWhiteList.splice(idx, 1);
                broadcastGirlWhiteListChange();
            }
        },
        registerGirlWhiteListHandler: function (handler) {
            girlWhiteListHandlers.push(handler);
        },
        unregisterGirlWhiteListHandler: function (handler) {
            if (girlWhiteListHandlers.includes(handler)) {
                var idx = girlWhiteListHandlers.indexOf(handler);
                girlWhiteListHandlers.splice(idx, 1);
            }
        },
    
        // Girl Blacklist
        getGirlBlackList: function () {
            return girlBlackList;
        },
        addToGirlBlackList: function (girl) {
            if (!girlBlackList.includes(girl)) {
                girlBlackList.push(girl);
                girlBlackList.sort();
                broadcastGirlBlackListChange();
            }
        },
        removeFromGirlBlackList: function (girl) {
            if (girlBlackList.includes(girl)) {
                var idx = girlBlackList.indexOf(girl);
                girlBlackList.splice(idx, 1);
                broadcastGirlBlackListChange();
            }
        },
        registerGirlBlackListHandler: function (handler) {
            girlBlackListHandlers.push(handler);
        },
        unregisterGirlBlackListHandler: function (handler) {
            if (girlBlackListHandlers.includes(handler)) {
                var idx = girlBlackListHandlers.indexOf(handler);
                girlBlackListHandlers.splice(idx, 1);
            }
        }
    } 
}

export default Constants();