window.addEventListener('load', function() {
    getData('/main/getData')
    .then(function(Data){
        UpdateUI(Data);
    })
})
const getData = async(url='')=>{
    const res= await fetch(url);
    try{
        const newData= await res.json();
        return newData;
    }
    catch(error){
        console.log(`getting data from API error: ${error}`);
    }
}

const UpdateUI = async(Data)=>{
    try{
        const parent = document.getElementById('images');
        for(let i=0;i<Data.length;i++){
            let opt = document.createElement('option');
            opt.setAttribute('class','opt');
            opt.textContent=Data[i];
            parent.appendChild(opt);
        }
    }
    catch(err){
        console.log("error");
    }
}