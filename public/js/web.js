
const webform = document.querySelector('form')
const search = document.querySelector('input')
var msg1 = document.querySelector('#p1')
var msg2 = document.querySelector('#p2')


msg1.textContent = ''
msg2.textContent = ''


webform.addEventListener('submit',(e)=>{
   e.preventDefault()
   
   msg1.textContent = 'LOADING ...'
   msg2.textContent = ''
    
   if(!search.value) {
      msg1.textContent='Please provide a valid location to search'
      console.log('Please provide a valid location to search')
   } else {
      fetch('http://localhost:3000/weather?address='+search.value).then((response)=>{
    
         response.json().then((data)=>{
          if(data.error)
          {
             msg1.textContent = data.error   
          } else {
             
             
             const loc = data.Address
             const text = "Current condition "+data.Description+". Current temperature is "+data.Temperature+". Feels like "+data.Feelslike+". "
             msg1.textContent = text
             msg2.textContent = loc
             
          }
     
             
        })
     })

   }
   
})

