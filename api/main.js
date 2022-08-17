var ScratchTools = {}
ScratchTools.Storage = {}
console.log("ScratchTools API Created")
if (window.location.href.startsWith('https://scratch.mit.edu/projects/') && window.location.href.includes('/editor')) {
  ScratchTools.type = 'Editor'
} else {
 ScratchTools.type = 'Website' 
}

ScratchTools.createModal = function(titleText, description, buttons) {
  if (document.querySelector('.scratchtoolsUpdateInfo') === null) {
      var box = document.createElement('div')
      box.className = 'box scratchtoolsUpdateInfo'
      var boxHeader = document.createElement('div')
      boxHeader.className = 'box-header'
      var boxContent = document.createElement('div')
      boxContent.className = 'box-content'
      box.appendChild(boxHeader)
      box.appendChild(boxContent)
      var title = document.createElement('h4')
      title.textContent = titleText
      var p = document.createElement('p')
      p.innerHTML = description
      boxContent.appendChild(p)
      boxHeader.appendChild(title)
      box.style.position = 'fixed'
      box.style.left = '2rem'
      box.style.bottom = '2rem'
      boxContent.style.padding = '8px 20px'
      boxHeader.style.padding = '8px 20px'
      document.body.appendChild(box)
      boxHeader.style.display = 'block'
      boxHeader.style.clear = 'both'
      boxHeader.style.margin = '0'
      boxHeader.style.borderTop = '1px solid #fff'
      boxHeader.style.borderBottom = '1px solid #d9d9d9'
      boxHeader.style.borderRadius = '10px 10px 0 0'
      boxHeader.style.backgroundColor = '#f2f2f2'
      boxHeader.style.padding = '8px 20px'
      boxHeader.style.height = '20px'
      boxHeader.style.overflow = 'hidden'
      boxContent.style.backgroundColor = '#fff'
      box.style.display = 'inline-block'
      box.style.border = '1px solid #d9d9d9'
      box.style.borderRadius = '10px 10px 0 0'
      box.style.backgroundColor = '#fff'
      buttons.forEach(function(el) {
        var button = document.createElement('button')
        button.className = 'button'
        button.style.marginRight = '5px'
        button.textContent = el.label
        if (el.type === 'link') {
          var a = document.createElement('a')
          a.href = el.href
          a.target = '_blank'
          a.appendChild(button)
          boxContent.appendChild(a)
        } else {
          if (el.type === 'close') {
            button.onclick = function() {
              box.remove()
            }
          } else {
            button.onclick = el.callback
          }
          boxContent.appendChild(button)
        }
      })
      box.style.width = '40vw'
  }
}