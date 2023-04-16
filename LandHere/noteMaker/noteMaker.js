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
})