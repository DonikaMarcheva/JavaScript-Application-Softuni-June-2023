function lockedProfile() {
    (async () =>{
        let profileRequest=await fetch('http://localhost:3030/jsonstore/advanced/profiles');
        let profiles= await profileRequest.json();
        let mainSection=document.getElementById('main');
        let templateProfile=document.querySelector('.profile');
        templateProfile.remove();
        Object.keys(profiles).forEach((key,i)=>{
            let profile=profiles[key];
            let htmlProfile=createHTMLProfile(i+1,profile.username,profile.email,profile.age);
            mainSection.appendChild(htmlProfile);
        })
    })()

    function createHTMLProfile(userIndex,username,email,age){
        let profileDiv=createElements('div');
        profileDiv.classList.add('profile');

        let profileImg=createElements('img');
        profileImg.src="./iconProfile2.png";
        profileImg.classList.add('userIcon');

        let lockLabel=createElements('label','Lock');

        let lockRadio=createElements('input');
        lockRadio.type='radio';
        lockRadio.name=`user${userIndex}Locked`;
        lockRadio.value='lock';
        lockRadio.checked=true;

        let unlockLabel=createElements('label','Unlock');

       let unlockRadio=createElements('input');
        unlockRadio.type='radio';
        unlockRadio.name=`user${userIndex}Locked`;
        unlockRadio.value='unlock';

        let br=createElements('br');
        let hr=createElements('hr');
    
        let usernameLabel=createElements('label','Username');
        let usernameInput=createElements('input');
        usernameInput.type='text';
        usernameInput.name=`user${userIndex}Username`
        usernameInput.value=username;
        usernameInput.disabled=true;
        usernameInput.readOnly=true;

        let hiddenFieldsDiv=createElements('div');
        hiddenFieldsDiv.id=`user${userIndex}HiddenFields`
        let hiddenFieldsHr=createElements('hr');

        let emailLabel=createElements('label','Email:');
        let emailInput=createElements('input');
        emailInput.type='email';
        emailInput.name=`user${userIndex}Email`;
        emailInput.value=email;
        emailInput.disabled=true;
        emailInput.readOnly=true;

        let ageLabel=createElements('label','Age:');
        let ageInput=createElements('input');
        ageInput.type='email';
        ageInput.name=`user${userIndex}Age`;
        ageInput.value=age;
        ageInput.disabled=true;
        ageInput.readOnly=true;

        hiddenFieldsDiv.appendChild(hiddenFieldsHr);
        hiddenFieldsDiv.appendChild(emailLabel);
        hiddenFieldsDiv.appendChild(emailInput);
        hiddenFieldsDiv.appendChild(ageLabel);
        hiddenFieldsDiv.appendChild(ageInput);

        let showMoreButton=createElements('button','Show more');
        showMoreButton.addEventListener('click',showMore)

        profileDiv.appendChild(profileImg);
        profileDiv.appendChild(lockLabel);
        profileDiv.appendChild(lockRadio);
        profileDiv.appendChild(unlockLabel);
        profileDiv.appendChild(unlockRadio);
        profileDiv.appendChild(br);
        profileDiv.appendChild(hr);
        profileDiv.appendChild(usernameLabel);
        profileDiv.appendChild(usernameInput);
        profileDiv.appendChild(hiddenFieldsDiv);
        profileDiv.appendChild(showMoreButton);

        return profileDiv;
    }
    function showMore(e){
        let profile=e.target.parentElement;
        let hiddenFieldDiv=e.target.previousElementSibling;
        console.log(hiddenFieldDiv);
        let showMoreButton=e.target;
       let radioButton=profile.querySelector('input[type="radio"]:checked');
       if(radioButton.value!=='unlock'){
        return;
       }
       if(showMoreButton.textContent==='Show more'){
        showMoreButton.textContent='Hide It';
       }else{
        showMoreButton.textContent='Show More';
       }

     hiddenFieldDiv.style.display=hiddenFieldDiv.style.display==='block'?'none':'block';
    }
    function createElements(tagname,content){
        let el=document.createElement(`${tagname}`);
        if(content){
            el.textContent=content;
        }
        return el;
    }
}