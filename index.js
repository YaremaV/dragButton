const input = document.querySelector('#input'),
      btn = document.querySelector('#btn');
      
 
btn.addEventListener('click',(e) => {
  e.preventDefault();
  createElementAndAddInDom();
});
 
function createElementAndAddInDom(){
  const form = document.querySelector('form');
  const div = document.createElement('div');
  const inputText = input.value.split('');
  input.value = '';
 
  div.classList.add('desc');
  form.insertAdjacentElement('afterend', div);
  createSpanAndText(div,inputText)
 
  let bodyChildren = document.body.children;
  deleteNextSiblingElement([...bodyChildren])
}
 
function deleteNextSiblingElement(elements){
  elements.forEach(element => {
   
    const nextDivDesc = element.nextElementSibling;
    if(element.nodeName === 'DIV' && element.className === 'desc' && nextDivDesc !== null){     
      nextDivDesc.remove();
    }
  })
}
 
function createSpanAndText(element,textArr){
  const fragment = document.createDocumentFragment();
    textArr.forEach(word => {
      const span = document.createElement('span');
      span.textContent = word;
      fragment.appendChild(span);
 
      grabWord(element,span)
    })
 
  element.appendChild(fragment)  
}
 
 
function grabWord(descContainer,wordElement){
  
  wordElement.addEventListener('click', e => {
  
    const word = e.target;
    word.classList.add('positionAbs');
    const container = document.querySelector('.desc');
   
    
    let listener = (e) =>{
      word.style.top = `${e.layerY}px`;
      word.style.left = `${e.layerX}px`;
    }
    container.addEventListener('mousemove', listener,false);
  
    descContainer.addEventListener('click', (e) => {
      if(e.target.nodeName === 'DIV'){
          container.removeEventListener('mousemove', listener,false)
      } 
    });
  })
}
