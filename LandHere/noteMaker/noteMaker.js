document.getElementById('notes-btn').addEventListener('click',()=>{
    const outline = document.getElementById('out')
    outline.innerHTML=''

    const notesWrapper = document.createElement('div')
    outline.appendChild(notesWrapper);
    notesWrapper.className = 'quick-access-wrapper'

    const btns = document.createElement('div')
    notesWrapper.appendChild(btns)
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
        let allNotesWrapper = document.createElement('div')
        outline.style.maxHeight = '600px'
        outline.style.overflowY = 'scroll'
        allNotesWrapper.className = 'all-notes-wrapper'
        notesWrapper.appendChild(allNotesWrapper)
        
        let allNotes = []
        if(localStorage.getItem('workifyNotes')){
            allNotes = JSON.parse(localStorage.workifyNotes)
        }

        for(let note in allNotes){
            let noteWrapper = document.createElement('div')
            noteWrapper.className = 'note-wrapper'
            allNotesWrapper.appendChild(noteWrapper)
            
            let noteName = allNotes[note].NoteName
            let NoteValue = allNotes[note].NoteValue

            let nameAndDelete = document.createElement('div')
            nameAndDelete.className = 'name-and-delete'
            noteWrapper.appendChild(nameAndDelete)

            let showNoteName = document.createElement('span')
            showNoteName.className = 'show-note-name'
            showNoteName.innerHTML = noteName
            nameAndDelete.appendChild(showNoteName)

            let delBtn = document.createElement('button')
            delBtn.className='note-sub-btn del-note'
            delBtn.innerText = 'DELETE'
            delBtn.style.background='red'
            nameAndDelete.appendChild(delBtn)
            
            let hrLine = document.createElement('hr')
            hrLine.className='note-hrline'
            noteWrapper.appendChild(hrLine)

            let showNoteAndCopy = document.createElement('div')
            showNoteAndCopy.className = 'show-note-and-copy'
            noteWrapper.appendChild(showNoteAndCopy)

            let showNote = document.createElement('p')
            showNote.className = 'show-note'
            NoteValue = NoteValue.replaceAll('\n','<br>')
            showNote.innerHTML = NoteValue
            showNoteAndCopy.appendChild(showNote)
            
            let copyBtn = document.createElement('button')
            copyBtn.className='note-sub-btn copy-btn'
            copyBtn.style.background = 'none'
            copyBtn.style.border='1px solid white'
            copyBtn.style.borderRadius = '5px'
            copyBtn.innerHTML = 'COPY'
            showNoteAndCopy.appendChild(copyBtn)
        }

        let delBtnArray = document.getElementsByClassName('del-note')
        for(let btn in delBtnArray){
            delBtnArray[btn].onclick = () => {
                let NoteWrapperArray = document.getElementsByClassName('note-wrapper')
                NoteWrapperArray[btn].remove()
                allNotes = []
                if(localStorage.getItem('workifyNotes')){
                    allNotes = JSON.parse(localStorage.workifyNotes)
                }
                allNotes = allNotes.filter(function(n){
                    return n.NoteName != allNotes[btn].NoteName
                })
                localStorage.workifyNotes = JSON.stringify(allNotes)
            }

        }

        let copyBtnArray = document.getElementsByClassName('copy-btn')
        for(let btn in copyBtnArray){
            copyBtnArray[btn].onclick = ()=>{
                const type = 'text/plain';
                const blob = new Blob([allNotes[btn].NoteValue], { type });
                let data = [new ClipboardItem({ [type]: blob })];
                navigator.clipboard.write(data)      
            }
        }

    }

    addBtn.onclick = function addNoteBtnHandler() {
        btns.remove();

        let nameAndNote = document.createElement('div')
        nameAndNote.className = 'name-and-note'
        nameAndNote.style.width = '100%'
        notesWrapper.appendChild(nameAndNote)

        let noteName = document.createElement('input')
        noteName.setAttribute('placeholder','Enter Name')
        noteName.className = 'note-name input-path'
        nameAndNote.appendChild(noteName)

        let note = document.createElement('textArea')
        note.className = 'note'
        note.setAttribute('placeholder','Enter Note')
        note.setAttribute('cols','30')
        note.setAttribute('rows','10')
        nameAndNote.appendChild(note)

        let subBtn = document.createElement('button')
        subBtn.innerHTML = 'SUBMIT'
        subBtn.className = 'add-site-button note-sub-btn'
        subBtn.style.background='brown'
        subBtn.style.border='1px solid white'
        nameAndNote.appendChild(subBtn)

        subBtn.onclick = ()=>{
            let allNotes = []
            if(localStorage.getItem('workifyNotes')){
                allNotes = JSON.parse(localStorage.workifyNotes)
            }
            let notedName = noteName.value

            let noted = note.value
            let obj = {
                NoteName: notedName,
                NoteValue: noted,
            }
            
            allNotes.push(obj)
            localStorage.workifyNotes = JSON.stringify(allNotes)
            notesWrapper.innerHTML=''
            outline.innerHTML+='<h5> Note Created </h5>'
        }
        
    }
})
