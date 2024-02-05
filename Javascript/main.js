window.addEventListener("DOMContentLoaded", () => {
    "use strict"
    const elTemplate = document.querySelector(".js-template").content;
    const elFormContact = document.querySelector(".js-form-contact")
    const elListContact = document.querySelector(".js-contact-list")

    let contacts = []
    const handleRenderContacts = (arr) => {
        if(arr?.length){
            const documentFragment = document.createDocumentFragment()
            elListContact.innerHTML = '';
            for (const contact of arr) {
                const clone = elTemplate.cloneNode(true)
                clone.querySelector(".contact__name").textContent = contact.username
                clone.querySelector(".contact__type").textContent = contact.person_type
                clone.querySelector(".contact__phone").textContent = contact.phone
                clone.querySelector(".contact__delete").dataset.id = contact.id
                documentFragment.appendChild(clone)
            }
            elListContact.append(documentFragment)
        }else{
            elListContact.innerHTML = ''
        }
    }
    const handleSub = (evt) => {
        evt.preventDefault()
        const contact = {
            id: uuid.v4(),
            username: username.value,
            person_type: person_type.value,
            phone: phone.value
        }
        for (const key in contact) {
            if(contact[key]){
                if(!contacts.length){
                    contacts.push(contact)
                }else{
                    let findIndex = contacts.findIndex((item) => item.phone ===  contact.phone)
                    if(findIndex == -1){
                        contacts.push(contact)
                    }
                }
            }
        }
        username.value = ''
        person_type.value = ''
        phone.value = ''
        handleRenderContacts(contacts)
    }
    elFormContact.addEventListener("submit", handleSub)

    elListContact.addEventListener("click", (evet) => {
        const target = evet.target;
        if(target.matches(".contact__delete")){
            const idx = contacts.findIndex((item) => target.dataset.id === item.id)
            contacts.splice(idx, 1)
            console.log(contacts)
            handleRenderContacts(contacts ? contacts : [])
        }      
    })
    
})


