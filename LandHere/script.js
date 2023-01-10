var button = document.getElementById(`add-btn`);
button.addEventListener(`click`, function() {
    chrome.runtime.sendMessage({action: `STARTLISTENER`});
});


let tabs=[]

function funnc() {                                          //Handler for delete event or urlList
  // console.log("infunnc")
  let str = this.id;
  let strint = str.substring(3,str.length);
  let tb = parseInt(strint);
  tabs.splice(tb,1);

  const outline = document.getElementById("out");
    let mss = ""
    // console.log(tabs);
    for(let tab in tabs){
      mss += `
      <span class="item">
        <img src = "`+ tabs[tab].favIconUrl +`" width="28rem" height="28rem">
        <h5 class="text-url">URL :</h5><input type="text" class="url" value="`+ tabs[tab].url +`">
        <h5 class="text-url">Name :</h5><input type="text" class="url" value="`+ tabs[tab].name +`">
        <button class="add-site-button del-btn" id = "it-`+tab+`">Delete -</button>
      </span>`
    }
    outline.innerHTML = mss
    var btns = document.getElementsByClassName("del-btn");
    var btnCnt = btns.length;
    for(var i=0;i<btnCnt;i+=1){
      btns[i].addEventListener('click',funnc,true);
    }
  }


chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse) {
    if(request.msg === "addInPopup"){
      const outline = document.getElementById("out");
      let mss = ""
      tabs = request.data.tabsArray
      // console.log(tabs);
      for(let tab in tabs){
        mss += `
        <span class="item">
          <img src = "`+ tabs[tab].favIconUrl +`" width="28rem" height="28rem">
          <h5 class="text-url">URL :</h5><input type="text" class="url" value="`+ tabs[tab].url +`">
          <h5 class="text-url">Name :</h5><input type="text" class="url" value="`+ tabs[tab].name +`">
          <button class="add-site-button del-btn" id = "it-`+tab+`">Delete -</button>
        </span>`
      }
      outline.innerHTML = mss
    }
    var btns = document.getElementsByClassName("del-btn");
    var btnCnt = btns.length;
    for(var i=0;i<btnCnt;i+=1){
      btns[i].addEventListener('click',funnc,true);
    }
  }
)



document.getElementById('create-btn').addEventListener('click',()=>{
  document.getElementById("out").innerHTML = `
    <h5 class="text-url">Enter Name:</h5>
    <input id="brow-name" type="text" placeholder="Enter name"/>
    <button id="save-btn" class="add-site-button">Save</button>
    `
  // console.log('CreateBtnClicked');
  document.getElementById('save-btn').addEventListener('click',()=>{
    let nam = String(document.getElementById('brow-name').value)
    let objj = {
        name : nam,
        tabsArr : tabs
      }
    
    if(localStorage.getItem('Browsers') !== null && localStorage.getItem('Browsers')!== []){
      let AllData = JSON.parse(localStorage.Browsers);
      let found = false;
      for(let data in AllData){
        if(AllData[data].name === objj.name) {
          found = true
        }
      }
      if(!found){
        let old = JSON.parse(localStorage.Browsers);
        old.push(objj);
        localStorage.Browsers = JSON.stringify(old);
        document.getElementById('out').innerHTML = '<h5 class="text-url">Created Successfully</h5>'
      }
      else{
        console.log("Here");
        document.getElementById('out').innerHTML = '<h5 class="text-url">Bundle With Same Name Exist</h5>'
      }
    }
    else {
      let arr = [];
      arr.push(objj);
      localStorage.Browsers = JSON.stringify(arr);
      document.getElementById('out').innerHTML = '<h5 class="text-url">Created Successfully</h5>'
    }
    console.log(localStorage.Browsers);
  })  
})

document.getElementById("show-btn").addEventListener('click',()=>{
  console.log("show-btn clicked")
  let arr = JSON.parse(localStorage.Browsers);
  const outline = document.getElementById('out');
  let htmlLine = `<div class="bundle-list">`
  for(let bundle in arr){
    htmlLine+=`<div class="ele">
    <div class="bundle-list-element" id=bunName-`+arr[bundle].name+'>'+arr[bundle].name+`
    </div>
    <button id="del-`+ bundle +`" class="list-del-btn">X</button>
    </div>`;
  }
  htmlLine+='</div>'
  outline.innerHTML = htmlLine
  let delArr = document.getElementsByClassName('list-del-btn')
  
  htmlLine+='</ul>'
  let classArr = document.getElementsByClassName("bundle-list-element");
  let len = classArr.length
  for(let i=0;i<len;i++){
    classArr[i].addEventListener('mouseover',()=>{
      console.log("inHover")
      let name = classArr[i].id.substring(8,classArr[i].id.length);
      // console.log(name);
      // console.log(arr)
      let tabs = []
      for(let itr in arr){
        if(arr[itr].name===name){
          tabs = arr[itr].tabsArr
        }
      }
      console.log(tabs);
      let mss=''
      for(let tab in tabs){
        mss += `
        <span class="item">
          <img src = "`+ tabs[tab].favIconUrl +`" width="28rem" height="28rem">
          <h5 class="text-url">URL :</h5><input type="text" class="url" value="`+ tabs[tab].url +`">
          <h5 class="text-url">Name :</h5><input type="text" class="url" value="`+ tabs[tab].name +`">
        </span>`
      }
      document.getElementById('pop').innerHTML = mss;   
    })
    classArr[i].addEventListener('mouseout',()=>{
      document.getElementById('pop').innerHTML = '';
    })
    classArr[i].addEventListener('click',()=>{
      let name = classArr[i].id.substring(8,classArr[i].id.length);
      // console.log(name);
      // console.log(arr)
      let tabs = []
      for(let itr in arr){
        if(arr[itr].name===name){
          tabs = arr[itr].tabsArr
        }
      }
      for(let itr in tabs){
        chrome.tabs.create({url: tabs[itr].url})
      }
    })
  }
  for(let itr in delArr) {
    delArr[itr].addEventListener('click',()=>{
      console.log("del-btn press")
      arr.splice(itr,1);
      localStorage.Browsers = JSON.stringify(arr);
      let arrAg = arr;
      const outline = document.getElementById('out');
      let htmlL = `<div class="bundle-list">`
      for(let bund in arrAg){
        htmlL+=`<div class="ele">
        <div class="bundle-list-element" id=bunName-`+arrAg[bund].name+'>'+arrAg[bund].name+`
        </div>  
        <button id="del-`+ bund +`" class="list-del-btn">X</button>
        </div>`;
      }
      htmlL+='</div>'
      
      outline.innerHTML = htmlL
    })
  }
})


