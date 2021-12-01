const getAllDataBtn = document.querySelector("#getAllData")

const specificPostInput = document.querySelector("#specificPost")
const getSpecificDataButton = document.querySelector("#getSpecificData")

const postTitle = document.querySelector("#postTitle")
const postBody = document.querySelector("#postBody")
const postUserId = document.querySelector("#postUserId")
const postDataBtn = document.querySelector("#postDataBtn")

const idToUpdate = document.querySelector("#idToUpdate")
const updatedTitle = document.querySelector("#putTitle")
const updatedBody = document.querySelector("#putBody")
const updatedUserId = document.querySelector("#putUserId")
const putRequestBtn = document.querySelector("#putDataBtn")

const idToPatch = document.querySelector("#idToPatch")
const patchTitle = document.querySelector("#patchTitle")
const patchBody = document.querySelector("#patchBody")
const patchUserId = document.querySelector("#patchUserId")
const patchDataBtn = document.querySelector("#patchDataBtn")

const deletePostId = document.querySelector("#deletePost")
const deleteSpecificDataBtn = document.querySelector("#deleteSpecificData")

const filterPostUserId = document.querySelector("#filterPostUserId")
const filterSpecificDataBtn = document.querySelector("#filterSpecificDataBtn")

const listOfItemOrderedList = document.querySelector("#list-of-items")

const serverAPIUrl = "https://jsonplaceholder.typicode.com/posts"


//Get Request for All Data
getAllDataBtn.addEventListener('click',()=>{
    axios.get(serverAPIUrl)
    .then(res=>{
        let data = res.data;
        data.forEach(item=>
            {
                const listItem = document.createElement('li')
                const titleText = `<h2>${item.title}</h2>`
                const bodyText = `<p>${item.body}</p>`

                listItem.innerHTML = `${titleText} ${bodyText}`
                listOfItemOrderedList.append(listItem)
            })
    })
})

//Get Request for Specific Data
getSpecificDataButton.addEventListener('click',()=>{
    let postNumber = specificPostInput.value
    console.log(postNumber)
    let specificPostURL = `${serverAPIUrl}/${postNumber}`

    console.log(specificPostURL)
    axios.get(specificPostURL)
    .then(res=>{
        let data = res.data;
        const listItem = document.createElement('li')
        const itemTitle = `<h2>${data.title}</h2>`
        const itemBody = `<p>${data.body}</p>`
        
        listItem.innerHTML=`${itemTitle} ${itemBody}`
        listOfItemOrderedList.append(listItem)
    })
})

//Post Request to Create Data
postDataBtn.addEventListener('click',()=>{
    axios.post(
            serverAPIUrl,
            {
                method : 'POST',
                body : JSON.stringify({
                    title: `${postTitle.value}`,
                    body : `${postBody.value}`,
                    userId: Number(postUserId.value)
                }),
                headers :{
                    'Content-type': 'application/json; charset=UTF-8'} 
            } 
         )
    .then(res=>
    {
        data = JSON.parse(res.data.body);
        const postedItemLi = document.createElement('li')
        postedItemLi.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p><p>UserId :${data.userId}</p><p>Id :${res.data.id}</p>`
        listOfItemOrderedList.append(postedItemLi)
    })
})

//Put Request to Update Existing Data
putRequestBtn.addEventListener('click',()=>{
    let urlOfPostToBeUpdated = `${serverAPIUrl}/${idToUpdate.value}`
    
    axios.put(
        urlOfPostToBeUpdated,
        {
            method : 'PUT',
            body : JSON.stringify({
                id : `${idToUpdate.value}`,
                title : `${updatedTitle.value}`,
                body : `${updatedBody.value}`,
                userId : `${updatedUserId.value}`
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        }
    )
    .then(res=>{
        data = JSON.parse(res.data.body)
        const updatedLi = document.createElement('li')
        updatedLi.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p><p>UserId :${data.userId}</p><p>Id :${data.id}</p>`
        listOfItemOrderedList.append(updatedLi)
    })
})

//Patch Request to Update Existing Specific Data
patchDataBtn.addEventListener('click',()=>{
    let urlOfPostToBePatched = `${serverAPIUrl}/${idToPatch.value}`
    
    let obj = {
        id : `${idToPatch.value}`,
        title : `${patchTitle.value}`,
        body : `${patchBody.value}`,
        userId : `${patchUserId.value}`
    }

    let removeEmptyAttributeFunction = (obj) => {
        for (var propName in obj) {
          if (obj[propName] === "") {
            delete obj[propName];
          }
        }
        return obj
      }
    
    let patchedObject = removeEmptyAttributeFunction(obj)

    axios.patch(
        urlOfPostToBePatched,
        {
            method : 'PATCH',
            body : JSON.stringify(patchedObject),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        }
    )
    .then(res=>{
        data = JSON.parse(res.data.body)
        const updatedLi = document.createElement('li')
        updatedLi.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p><p>UserId :${data.userId}</p><p>Id :${data.id}</p>`
        listOfItemOrderedList.append(updatedLi)
    })
})

//Delete Specific Post
deleteSpecificDataBtn.addEventListener('click',()=>{
    let deletedPostURL = `${serverAPIUrl}/${deletePostId.value}`

    axios.delete(deletedPostURL,{method:'DELETE'})
    .then(res=>{
        if(res.status==200||res.status==201)
        {
            let listItem = document.createElement('li')
            listItem.innerText = `Item ${deletePostId.value} Deleted`
            listOfItemOrderedList.append(listItem)
        }
    })
})


//Filter specific posts for a specific User
filterSpecificDataBtn.addEventListener('click',()=>{
    const filterPostURL = `${serverAPIUrl}?userId=${filterPostUserId.value}`
    
    axios.get(filterPostURL)
    .then(res=>{
        data = res.data;
        data.forEach(item=>
            {
                const listItem = document.createElement('li')
                const titleText = `<h2>${item.title}</h2>`
                const id = `<p>Id :${item.id}</p>`
                const bodyText = `<p>${item.body}</p>`
                const userId = `<p>UserId :${item.userId}</p>`

                listItem.innerHTML = `${titleText} ${id} ${bodyText} ${userId}`
                listOfItemOrderedList.append(listItem)
            })
    })
})