document.getElementById('quick-access-btn').addEventListener('click',()=>{

    const outline = document.getElementById('out')
    outline.innerHTML=''

    const quickAccessWrapper = document.createElement('div')
    outline.appendChild(quickAccessWrapper);
    quickAccessWrapper.className = 'quick-access-wrapper'

    const btns = document.createElement('div')
    quickAccessWrapper.appendChild(btns)
    btns.className = 'quick-btns'

    const addBtn = document.createElement('button')
    btns.appendChild(addBtn);
    addBtn.className='add-site-button btn quick-btn'
    addBtn.style.backgroundColor='purple'
    addBtn.innerHTML = 'ADD NEW'

    const showBtn = document.createElement('button')
    btns.appendChild(showBtn);
    showBtn.className='add-site-button btn quick-btn'
    showBtn.style.backgroundColor='purple'
    showBtn.innerHTML='SHOW'

    showBtn.onclick = () => {
        btns.remove()
        const showWrapper = document.createElement('div')
        showWrapper.className = 'show-wrapper'

        const folderWrapper = document.createElement('div')
        folderWrapper.className = 'folder-wrapper'

        quickAccessWrapper.appendChild(showWrapper)
        let allUrls = JSON.parse(localStorage.FolderAndURL)
        let folders = []
        for(let urlBundle in allUrls){
            folders.push(allUrls[urlBundle].FolderName)
        }

        showWrapper.appendChild(folderWrapper)

        for(let folder in folders){
            let folderDel = document.createElement('div')
            folderDel.className = 'folder-del'
            folderDel.id = 'foldName-'
            let showNewFolder = document.createElement('div')

            let delFolderBtn = document.createElement('button')
            delFolderBtn.id = 'delfold69-' + folders[folder]
            delFolderBtn.innerHTML='DELETE'
            delFolderBtn.className='add-site-button del-folder-btn'
            delFolderBtn.style.background='none'

            showNewFolder.style.color='white'
            showNewFolder.className = 'show-new-folder'
            showNewFolder.id = 'folname69-' + folders[folder]
            showNewFolder.innerHTML = folders[folder]

            folderWrapper.appendChild(folderDel)
            folderDel.appendChild(showNewFolder)
            folderDel.appendChild(delFolderBtn)
        }

        let folderDelArr = document.getElementsByClassName('folder-del')
        for(let btn in folderDelArr){
            folderDelArr[btn].onclick = () =>{
                let urls = allUrls[btn].LocalURLs

                console.log(urls)

                // UrlName : name,
                // UrlPath : path,

                for(let url in urls){
                    let wholeUrl = document.createElement('div')
                    wholeUrl.className = 'whole-url'
                    folderAndDelArr[btn].appendChild(wholeUrl)

                    let urlName = document.createElement('span')
                    urlName.innerHTML = urls[url].UrlName
                    wholeUrl.appendChild(urlName)
                    urlName.className='url-name'

                    let urlPath = document.createElement('span')
                    urlPath.innerHTML = urls[url].UrlPath
                    urlPath.className = 'url-path'
                    wholeUrl.appendChild(urlPath)

                }

            }
        }

        let delBtnArr = document.getElementsByClassName('del-folder-btn')
        // console.log(delBtnArr)
        let folderAndDelArr = document.getElementsByClassName('folder-del')
        // console.log(folderAndDelArr)
        for(let btn in delBtnArr){
            delBtnArr[btn].onclick = ()=>{
                allUrls = allUrls.filter(function(u){
                    console.log(allUrls[btn])
                    return u.FolderName!=allUrls[btn].FolderName;
                })
                localStorage.FolderAndURL = JSON.stringify(allUrls)
                folderAndDelArr[btn].remove()
            }
        }

    }

    addBtn.addEventListener('click',()=>{
        btns.remove();
        let addScreen = document.createElement('div');
        quickAccessWrapper.appendChild(addScreen)
        addScreen.style.width='100%'

        let fileUrl = document.createElement('div');
        addScreen.appendChild(fileUrl)
        fileUrl.className = 'file-url'

        let inputPath = document.createElement('input')
        inputPath.setAttribute('type','text')
        inputPath.setAttribute('placeholder','Enter URL')
        inputPath.style.height='30px'
        inputPath.className='input-path'
        
        let subBtn = document.createElement('button');
        subBtn.innerHTML='SUBMIT'
        subBtn.className = 'add-site-button btn quick-btn sub-btn'
        subBtn.style.background='brown'
        subBtn.style.border='1px solid white'
        
        // let pathViaExplore = document.createElement('button')
        // pathViaExplore.innerHTML='EXPLORE'
        // pathViaExplore.className='add-site-button btn quick-btn'
        // pathViaExplore.style.backgroundColor='brown'

        fileUrl.appendChild(inputPath)
        // let ortext = document.createElement('span')
        // addScreen.appendChild(ortext)
        // ortext.innerHTML='OR'
        // ortext.className='or-text'
        // addScreen.appendChild(pathViaExplore)
        
        let fileName = document.createElement('div');
        addScreen.appendChild(fileName)
        fileName.className = 'file-name'
        
        let inputName = document.createElement('input')
        inputName.setAttribute('placeholder','Name')
        inputName.className = 'input-path'
        fileName.appendChild(inputName)

        let btnsAndFolder = document.createElement('div')
        btnsAndFolder.className='btns-and-folder'
        addScreen.appendChild(btnsAndFolder);

        let newSubBtns = document.createElement('div')
        newSubBtns.className='new-sub-btns'
        btnsAndFolder.appendChild(newSubBtns)
        
        
        let newBtn = document.createElement('button');
        newBtn.innerHTML='NEW FOLDER'
        newBtn.className = 'add-site-button btn quick-btn'
        newBtn.style.background='none'
        newBtn.style.border='1px solid white'

        newSubBtns.appendChild(newBtn)
        newSubBtns.appendChild(subBtn)

        let allUrls = []
        if(localStorage.getItem('FolderAndURL')){
            allUrls = JSON.parse(localStorage.FolderAndURL)
        }
        let folders = []
        for(let urlBundle in allUrls){
            folders.push(allUrls[urlBundle].FolderName)
        }
        
        let selectFolder = document.createElement('select');
        btnsAndFolder.appendChild(selectFolder)
        
        selectFolder.className = 'select-folder'

        for(let folder in folders){
            let newFolder = document.createElement('option')
            newFolder.setAttribute('value',folders[folder])
            newFolder.style.color='black'
            newFolder.innerHTML = folders[folder]
            selectFolder.appendChild(newFolder)
        }

        

        newBtn.onclick = () => {
            let newFolderData = document.createElement('input');
            newFolderData.setAttribute('placeholder','Enter Folder Name');
            newFolderData.className = 'input-path'

            let makeFolderBtn = document.createElement('button');
            makeFolderBtn.className='add-site-button btn quick-btn'
            makeFolderBtn.innerText = 'CREATE'

            addScreen.appendChild(newFolderData)
            addScreen.appendChild(makeFolderBtn)

            makeFolderBtn.onclick = () => {
                
                console.log("here")
                let obj = {
                    FolderName: newFolderData.value,
                    LocalURLs : []
                }

                if(localStorage.getItem('FolderAndURL')!==null && localStorage.getItem('FolderAndURL')!==[]){
                    let AllUrlData = JSON.parse(localStorage.FolderAndURL)  
                    let foundFolder = false
                    for(let data in AllUrlData){
                        if(AllUrlData[data].FolderName === obj.FolderName){
                            foundFolder = true
                        }
                    }
                    if(!foundFolder){
                        let OldURLData = JSON.parse(localStorage.FolderAndURL)
                        OldURLData.push(obj)
                        localStorage.FolderAndURL = JSON.stringify(OldURLData)
                        
                        let newFolder = document.createElement('option')
                        newFolder.setAttribute('value',obj.FolderName)
                        newFolder.style.color='black'
                        newFolder.innerHTML = obj.FolderName
                        selectFolder.appendChild(newFolder)
                        

                        outline.innerHTML += '<h5 class="text-url">Folder Created</h5>'
                    }
                    else {
                        outline.innerHTML += '<h5 class="text-url">Folder By Same Name Exist</h5>'
                    }
                }
                else{
                    console.log('folder here')
                    let array = []
                    array.push(obj)
                    localStorage.FolderAndURL = JSON.stringify(array)
                    outline.innerHTML += '<h5 class="text-url">Folder Created</h5>'
                    let newFolder = document.createElement('option')
                        newFolder.setAttribute('value',obj.FolderName)
                        newFolder.style.color='black'
                        newFolder.innerHTML = obj.FolderName
                        selectFolder.appendChild(newFolder)
                }
            }
        }

        subBtn.onclick = () => {
            let path = inputPath.value
            let name = inputName.value
            let foldName = selectFolder.value
            let obj2 = {
                UrlName : name,
                UrlPath : path,
            }

            let OldURLData = JSON.parse(localStorage.FolderAndURL)
            console.log(OldURLData)
            for(let data in OldURLData) {
                if(OldURLData[data].FolderName === foldName){
                    OldURLData[data].LocalURLs.push(obj2)
                    break
                }
            }

            localStorage.FolderAndURL = JSON.stringify(OldURLData)
            outline.innerHTML += '<h5 class="text-url">URL Created</h5>'
        }

        //SHOW ALL THE FOLDERS
        //FOLDER WILL OPEN ON CLICK WITH A BACK BUTTON
        //CLICK ON THE LINK TO OPEN A FILE INSIDE BROWSER
    })

})