let wordList=[0,['a','i'],
["is","go","so","it","he","of","on","no","or","am","ok","by"],
["you","are","let","and","now","new","tab","bat","why","how","was","not","old","run","map","web","pop","set","bar","due","the","end","all","for","saw","win","gap"],
["what","calm","this","that","were","math","race","heat","with","seen","give","fast","like","take","last","time","lose","mind","post","null","bool","main","void","hard","flex","work","want","fear","used","exam","pass","fail"],
["going","great","where","index","while","truth","doing","zebra","trust","blood","never","brain","plate","focus","right","wrong","light","fight","stack","queue","click","event","third"],
["screen","giveup","winner","before","little","within","inline","bright","future","repeat","worked","result","supply","broken","earlier","faster","energy","typing","vector","lenght","friend","pencil","fourth","laptop","define","return","random","column"],
["warrior","display","include","impress","website","working","certify","teacher","virtual","visible","walking","wanting","waiting","wearing"],
["absolute","relative","sentence","mountain","accepted","accident","accuracy","accurate","academic"]
];
let com=[[0,0,2,3,5,2,0,1],[0,0,0,3,5,2,2],[0,0,1,1,6,3,0,1],[0,0,0,2,6,3,1],[0,0,0,1,8,2,1]];
let arr=[];
let canType=true,startTime=true,time=15,Time,timer,timeOut,incorrectLetters=0,correctLetters=0,extraLetters=0,trueIncorrect=0,previousSelected=15;
Time=15;
let k=0,rowNumber=0,rowRemoveNumber=0,flag=0;

function option(num){
    document.getElementById("value-"+previousSelected).classList.remove("selected");
    document.getElementById("value-"+num).classList.add("selected");
    time=num;
    Time=num;
    previousSelected=num;
    restart();
}
//ye function n length ka koi bhi random Words de dega jaise 3 length ka "due" ya "now".... aise hi
function randWord(n){
    let ary=wordList[n];
    let x=Math.floor(Math.random()*ary.length);
    // console.log(ary[x]);
    return ary[x];
}

function showOnePara(){
    let index=Math.floor(Math.random()*com.length);
    let Words=com[index];
    // yaha pe hmlog ke pass ek valid combination agaya, ab yaha se
    let tem="";
    for(let i=1;i<Words.length;i++){
        for(let j=0;j<Words[i];j++){
            let Word=randWord(i);
            // console.log(Word);
            //yaha se str="complete" , aisa ayega ab tumko isko ek ek letter karke dalna hoga html mein.
            let tem1="";//here tem1 is taken for one Words only
            for(let t=0;t<Word.length;t++){
                tem1+=`
                <div id="l-${k++}" class="letter">${Word[t]}</div>
                `;
                arr.push(Word[t]);
                if(t===Word.length-1){
                    tem1+=`
                    <div id="l-${k++}"  class="letter">&nbsp;</div>
                    `;  
                    arr.push(" ");
                }
            }
            tem+=`<div class="word">${tem1}</div>`;
        }
    }
    document.getElementById("displayPara").innerHTML+=`
    <div class ="row" id="row-${rowNumber}">${tem}</div>
    `
    rowNumber++;
}

for(let i=0;i<4;i++){
  showOnePara();
}

function removeOnePara(){
   document.getElementById(`row-${rowRemoveNumber}`).style.display="none";
   rowRemoveNumber++;
}

let blinker=0,blink;
function cursorBlinking(){
    clearInterval(blink);
    blink=setInterval(() => {
        if(blinker%2===0){
            document.getElementById("l-0").classList.add("current");    
        }
        else{
            document.getElementById("l-0").classList.remove("current");
        }
        blinker++;
    }, 400);
}

let i=0;
function removeCursor(indx){
        let prev="l-";prev+=(indx);
        document.getElementById(prev).classList.remove("current");
}

function addCursor(indx){
    let str="l-";str+=(indx);
    document.getElementById(str).classList.add("current");
}


function start(){
    timer=setInterval(() => {
        time--;
        document.getElementById("timeDisplayer").innerText=`${time}`;    
    }, 1000);
    document.getElementById("timeDisplayer").style.display="flex";
    timeOut=setTimeout(() => {
       clearInterval(timer);
       canType=false;
       document.getElementById("timeDisplayer").style.display="none";
       showResult();
   }, time*1000);

}

document.body.addEventListener("keydown", function(event){
    let key=event.key;  
    if(key==='Alt' || key==='Enter' || key==="Tab" || key==="CapsLock" || key==="Shift" || key==="Control" || key==="Meta" || key==="ContextMenu" || key==="Delete" || key==="ArrowDown" || key==="ArrowUp" || key==="ArrowLeft" || key==="ArrowRight" || key==="Escape" || key==="Home" || key==="PageUp" || key==="PageDown" || key==="Insert" || key==="End"){
    } 
    else{ 
        removeCursor(i);
        // console.log(key);
        if(startTime){
            start();
            startTime=false;
            document.getElementById("timeDisplayer").innerText=`${time}`; 
            clearInterval(blink);
            removeCursor(i);
        }
        console.log(canType);
        if(canType){
            if(key==="Backspace"){
                let str="l-";str+=(i-1);
                if(i>0){
                    document.getElementById(str).classList.remove("incorrect");
                    document.getElementById(str).classList.remove("correct");        
                    if(arr[i-1]===" "){
                        document.getElementById(str).innerHTML=`
                        <div id="l-${k++}"  class="letter">&nbsp;</div>`;
                    }
                    else if(arr[i-1]==="incorrectSpace"){
                        document.getElementById(str).innerHTML=`
                        <div id="l-${k++}"  class="letter">&nbsp;</div>`;
                        arr[i-1]=" ";
                        incorrectLetters--;
                    }
                    else if(arr[i-1][1]==='W'){
                        incorrectLetters--;
                        arr[i-1]=arr[i-1][0];
                    }                    
                    removeCursor(i);
                    i--;
                    addCursor(i);
                    console.log(correctLetters,incorrectLetters);                    
                }
            }    
            else if(arr[i]===' '){
                if(i%63===62){
                    if(flag===1){
                        removeOnePara();
                        showOnePara();
                    }
                    // console.log("here you have to think how to change the insert the para");
                    flag=1;
                }
                let str="l-";str+=(i);
                if(arr[i]===key){
                    document.getElementById(str).classList.add("correct");
                    correctLetters++;
                    addCursor(i+1);
                    i++;

                }
                else{
                    document.getElementById(str).classList.add("incorrect");
                    document.getElementById(str).innerText=key;
                    incorrectLetters++;
                    trueIncorrect++;
                    arr[i]="incorrectSpace";
                    addCursor(i+1);
                    i++;
                }
                console.log(correctLetters,incorrectLetters);            
            }
        
            else{
                let str="l-";str+=(i);
                // console.log("the value of i: ",i);             
                if(key=== arr[i]){            
                    document.getElementById(str).classList.add("correct");                     
                    correctLetters++;               
                    // console.log(`key:${key} arr[i]:${arr[i]}-> matched`);
                }
                else{           
                    arr[i]+='W';
                    document.getElementById(str).classList.add("incorrect")
                    incorrectLetters++;
                    trueIncorrect++;                                   
                }   
                console.log(correctLetters,incorrectLetters);
                i++;        
                addCursor(i);
            }
        }
    }
});

// if(!canType){
// let showner=setInterval(() => {
        
//         console.log("showner executed");
//     }, 20);
// }

function restart(){
    clearInterval(timer);
    clearTimeout(timeOut);
    // clearInterval(showner);
    document.getElementById("displayPara").textContent="";
    document.getElementById("timeDisplayer").innerHTML=`<div id="timeDisplayer"></div>`;    
    document.getElementById("bottom").classList.add("displayNone");
    i=0;
    canType=true; 
    startTime=true;
    time=Time;
    k=0;rowNumber=0;rowRemoveNumber=0;flag=0;
    arr=[];
    correctLetters=0;
    incorrectLetters=0;
    trueIncorrect=0;
    blinker=0;
    cursorBlinking();
    setTimeout(() => {
    for(let i=0;i<4;i++){
        showOnePara();
    }
    document.getElementById("l-0").classList.add("current");
}, 80);
}

function showResult(){
    // clearInterval(showner);
    document.getElementById("bottom").classList.remove("displayNone");
    console.log("result should be shown");
    let speed,accuracy,raw,total;
    total=correctLetters+incorrectLetters;
    //formula for raw speed is total words written per min or total letters/(5*time(in minute))
    raw=total*60;
    raw/=Time;
    raw/=5;
    raw=Math.round(raw);
    document.getElementById("raw").textContent=raw;
    
    if(correctLetters-incorrectLetters>10){
    speed=raw-((incorrectLetters*60)/Time);//net wmp=rawSpeed- (incorrectLetters)/time(in minutes);
    }
    else{
        speed=correctLetters/Time;//ye vo case ke liye hai jisme user incorrect letter ko kaafi jada likha hai as compared to correct letters. toh uss case mein standarded formula se negative speed ajayega toh uss liye direct correct letters /time kar diye
    }
    // console.log("speed",speed);
    speed=Math.round(speed);
    document.getElementById("speed").textContent=speed;

    accuracy=correctLetters;
    accuracy/=(correctLetters+trueIncorrect);
    accuracy*=100;
    accuracy=Math.round(accuracy);
    document.getElementById("accuracy").textContent=accuracy;
    
    document.getElementById("stats").textContent=`${correctLetters}/${incorrectLetters}/${extraLetters}`
}