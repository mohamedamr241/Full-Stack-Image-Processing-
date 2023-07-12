const btn = document.getElementById("btn");
let imgPath="";
let final="";
btn.addEventListener('click',()=>{
    const height = document.getElementById('inp2').value;
    const width = document.getElementById("inp1").value;
    const val = document.getElementById('images').value;
    if(width=='' || height==''){
        function perform() {
            const err = document.getElementById('err');
            err.textContent = "Please enter width and heigh";
            err.classList.remove('hidden');
          
            setTimeout(function() {
              err.classList.add('hidden');
            }, 3000);
          }
          const tt = setTimeout(perform, 1000);
    }
    else{
        postData('/main/saveData',{name:val,height:height,width:width})
        .then(async ()=>{
            final = await imageProcessing('/main/processImage',{name:val,height:height,width:width});
        })
        .then(()=>{
            if(final['error']!="width and height must be integers, please write a valid data")
                updateUI('/main/saveImage',{name:imgPath});
            else{
                function perform() {
                    const err = document.getElementById('err');
                    err.textContent = final['error'];
                    err.classList.remove('hidden');
                  
                    setTimeout(function() {
                      err.classList.add('hidden');
                    }, 3000);
                  }
                  const tt = setTimeout(perform, 1000);
            }
        })
    }
});
const postData = async(url='',data={})=>{
    const res = await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },        
        body: JSON.stringify(data), 
    });

    try{
        const newData = await res.json();
        return newData;
    }
    catch(error){
        console.log(`sending data to server error: ${error}`);
    }
}
const imageProcessing = async(url='',data={})=>{
    const res = await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },        
        body: JSON.stringify(data), 
    });
    try{
        const newData= await res.json();
        imgPath=newData[0];
        return newData;
    }
    catch(error){
        console.log(`getting data from API error: ${error}`);
    }
}
const updateUI= async (url='',data={})=>{
    const res = await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },        
        body: JSON.stringify(data), 
    });
    try{
        const newData = await res.json();
        if(newData[0]!="")
            window.open('http://localhost:8000/main/showImage', '_blank');
        return newData;
    }
    catch(error){
        console.log(`sending data to server error: ${error}`);
    }
    
}