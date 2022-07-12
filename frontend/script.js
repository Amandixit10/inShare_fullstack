
const dropZone = document.querySelector(".drop-zone");
const fileInput= document.querySelector("#fileInput");
const browseBtn=document.querySelector(".browseBtn");
const host="https://reqres.in/api/users?page=2";
const uploadURL=`${host}+"api/files"`;
const bgProgress = document.querySelector(".bg-progress");
const percentDiv=document.querySelector("#percent");
const progressBar=document.querySelector(".progress-bar");
const progressContainer=document.querySelector(".progress-container");


dropZone.addEventListener("dragover",(e)=>{
    e.preventDefault();
    if(!dropZone.classList.contains("dragged"))
    {
        dropZone.classList.add("dragged");
    }
})

dropZone.addEventListener("dragleave",()=>{
    dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop",(e)=>{
 e.preventDefault();
 dropZone.classList.remove("dragged");
  const files=e.dataTransfer.files;
  if(files.length)
  {
    fileInput.files=files;
    uploadFile();
  }
});

browseBtn.addEventListener("click",()=>{
fileInput.click();
uploadFile();
});

  const uploadFile=()=>{
    progressContainer.style.display="block";
const file=fileInput.files[0];
const formData=new FormData();
formData.append("myFile",file);

const xhr=new XMLHttpRequest();
xhr.onreadystatechange=()=>{
if(xhr.readyState === XMLHttpRequest.DONE)
{
showLink(JSON.parse(xhr.response));
}
}
xhr.open("POST",uploadURL);
xhr.upload.onprogress=updateProgress;
xhr.send(formData);
  }
  

  const updateProgress=(e)=>{
  const percent = Math.round((e.loaded/e.total)*100);
  //console.log(percent);
  progressBar.style.transform=`scaleX(${percent/100})`;
  bgProgress.style.width=`${percent}%`;
  percentDiv.innerText=percent;
  }

const showLink=({file})=>{
  progressContainer.style.display="none";
}