let ArrTabs = []

function makeObject(url,name,icon){
    let obj1 = {
        "url": url,
        "name": name,
        "favIconUrl": icon
    }
    ArrTabs.push(obj1);
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action == 'STARTLISTENER') {
            chrome.tabs.query({},(tabs)=>{
                console.log(tabs);
                ArrTabs = []
                for(let tab in tabs){
                    let url = tabs[tab].url
                    let name = tabs[tab].title
                    let iconUrl = tabs[tab].favIconUrl
                    makeObject(url,name,iconUrl)
                    // console.log(tabs[tab].url)
                }    
            })
            chrome.runtime.sendMessage({
                msg: "addInPopup",
                data: {
                    tabsArray: ArrTabs
                }
            })
        }
        // console.log(ArrTabs)
    }
)