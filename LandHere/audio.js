let isPlaying = true
let audioOn = false
let isSignedIn = false

document.getElementById("spotify-btn").addEventListener('click', () => {

    if(!isSignedIn){
        chrome.runtime.sendMessage({action: 'openAuthPage'})
    }

    console.log("clicked spotify")
    const tasks = document.getElementById("permanentTasks")

    let audioContainer = document.createElement('div')
    audioContainer.className = 'audioContainer'
    
    let crossBtn = document.createElement('button')
    crossBtn.innerHTML='CLOSE'
    crossBtn.className = 'crossBtn-Audio'

    let hline = document.createElement('hr')
    crossBtn.addEventListener('click',()=>{
        audioOn=false
        audioMatter.remove()
        hline.remove()
    })

    let audioMatter = document.createElement('div')
    if(!audioOn) {
        audioMatter.className = 'audioMatter'
        audioMatter.appendChild(crossBtn)
        tasks.appendChild(audioMatter)
        audioMatter.appendChild(audioContainer)
        audioOn = true
        tasks.appendChild(hline)
    }
    
    let songAttributes = document.createElement('div')
    audioMatter.appendChild(songAttributes)

    let SongTitle = document.createElement('span')
    songAttributes.appendChild(SongTitle)
    SongTitle.className='SongTitle'
    SongTitle.innerHTML = 'SONG TITLE'

    let singerName = document.createElement('span')
    songAttributes.appendChild(singerName)
    singerName.innerHTML = 'SingerName'
    singerName.className = 'singerName'

    let playlist = document.createElement('span')
    audioContainer.appendChild(playlist)
    playlist.innerHTML = '<i class="bi bi-cassette-fill audio-btns"></i>'

    let prevBtn = document.createElement('span')
    audioContainer.appendChild(prevBtn)
    prevBtn.innerHTML = '<i class="bi bi-skip-start-fill audio-btns"></i>'
    
    let pausePlayBtn = document.createElement('span')
    audioContainer.appendChild(pausePlayBtn)
    pausePlayBtn.innerHTML = '<i class="bi bi-play-fill audio-btns"></i>'
    pausePlayBtn.addEventListener('click',()=>{
        if(isPlaying){
            pausePlayBtn.innerHTML='<i class="bi bi-pause-fill audio-btns"></i>'
            isPlaying = (!isPlaying)
        } else {
            pausePlayBtn.innerHTML='<i class="bi bi-play-fill audio-btns"></i>'
            isPlaying = (!isPlaying)
        }
    })

    let nextBtn = document.createElement('span')
    audioContainer.appendChild(nextBtn)
    nextBtn.innerHTML = '<i class="bi bi-skip-end-fill audio-btns"></i>'

    let outline = document.getElementById('out')
    let queue = document.createElement('span')
    queue.innerHTML = '<i class="bi bi-music-note-list audio-btns"></i>'
    audioContainer.appendChild(queue)
    queue.addEventListener('click',showQueue)

})

function showQueue(tracks){
    for(let track in tracks){

    }
}