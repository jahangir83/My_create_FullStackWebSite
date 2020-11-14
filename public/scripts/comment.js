


window.onload = function () {
    console.log("I am comment")
    let comment = document.getElementById("comment")
    let comment_hold = document.getElementById("comment-holder")
console.log("I am commentjs ")
    comment.addEventListener('keypress', function (e) {
        if (e.key == 'Enter') {
            if (e.target.value) {
                let postId = comment.dataset.post
                let data = {
                    body: e.target.value
                }

                let req = genarateReques(`/api/comment/${postId}`, 'POST', data)
                fetch(req)
                    .then(res => res.json())
                    .then(data => {
                    let commentElement = createComment(data)
                        comment_hold.insertBefore(commentElement, comment_hold.children[0])
                        e.target.value = ''
                    })
                    .catch(er => {
                        console.log(er);
                        alert(er)
                })
            } else {
                alert("Please Enter A valid comment")
            }
        }
    })
//Reply section
    comment_hold.addEventListener('keypress', function (e) {
        if (comment_hold.hasChildNodes(e.target)) {
            if (e.key == 'Enter') {
                let commentId = e.target.dataset.comment
                let value = e.target.value
                //Value check
                if(value) {
                    let data = {
                        body : value
                    }
                    let replyReq = genarateReques(`/api/comment/replie/${commentId}`, 'POST', data)
                    fetch(replyReq)
                        .then(res => res.json())
                        .then(data => {
                            let replyElement = createReplyElement(data)
                            let parent = e.target.parentElement
                            parent.previousElementSibling.appendChild(replyElement)
                            e.target.value = ''
                        })
                        .catch(e => {
                        console.log("Reply e = ", e)
                    })

                } else {
                     alert("Please Enter A Valid Reply")
                }
        }
        }
    })








function genarateReques(url, method, data) {
   let headers = new Headers()
        headers.append('Accept', 'Application/JSON')
        headers.append('Content-Type', 'Application/JSON')

    let requws = new Request(url, {
        method,
        body:  JSON.stringify(data),
        headers,
        mode: 'cors',


        

    })

    return requws
    
}
//
function createComment(comment) {
console.log(comment.user)
    let innerHTML = `
    <img
        src="${comment.user.profilePic}"
        class="rounded-circle mx-3 my-3" style="width:40px">
        <div class="media-body my-3">
        <p>${comment.body}</p>

        <div class="my-3">
            <input class="form-control" name="reply" type="text" placeholder="Enter Your Reply" data-comment="${comment.id}"/>
        </div>
    </div>

    `
    let div = document.createElement('div')
    div.className = 'media border'
    div.innerHTML = innerHTML

    return div
}
// Reply CreateElement
function createReplyElement(reply) {
    let innerHTML = `
    
        <img src="${reply.profilePic}" style="width: 40px;" 
        class="align-self-start mr-3 rounded-circle"
        >
        <div class="media-body">
            <p>${reply.body}</p>
        </div>
        

    `
    let div = document.createElement('div')
    div.className= 'media mt-3'
    div.innerHTML = innerHTML
    return div
    }
    
    //

    let deleteBtn = document.getElementById("commentDelete")
    
    deleteBtn.addEventListener('click', function (e) {
        
        let deleteId = deleteBtn.dataset.comment

        let header = new Headers()
        header.append('Accept', 'Application/JSON')

        let req = new Request(`/api/delete/${deleteId}`, {
            headers: header,
            mode: "cors",
            method: 'DELETE'
        })

        fetch(req)
            .then(res => res.json())
            .catch(e => console.log(e))
        
    })

    //

//------------------------------------------------------------------------------------//
// Like controler

    let likeBtn    = document.getElementById("likesBtn")
    let dislikeBtn = document.getElementById("dislikeBtn")
    console.log("I am Like Dislike js")
    likeBtn.addEventListener('click', function (e) {
        let postId = likeBtn.dataset.post
        reqLikeDislike('likes', postId)
            .then(res => res.json())
            .then(data => {
                let likeText = data.liked ? 'liked' : 'like'
                likeText = likeText + ` ( ${data.totalLike} ) `
                let dislikeText = `Dislike ( ${data.totalDislike} )`
                
                likeBtn.innerHTML = likeText
                dislikeBtn.innerHTML = dislikeText
            })
            .catch(er => {
                console.log(er);
                alert(er)
        })
    })

    dislikeBtn.addEventListener('click', function (e) {
        let postId = dislikeBtn.dataset.post
        reqLikeDislike('deslike', postId)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let dislikeText = data.desLiked ? 'DisLiked' : 'DisLike'
                dislikeText = dislikeText + ` ( ${data.totalDislike} ) `
                let likeText = `Like ( ${data.totalLike} )`

                dislikeBtn.innerHTML = dislikeText
                likeBtn.innerHTML = likeText
                
            })
            .catch(er => {
                console.log(er);
                alert(er)
        })
    })

    function reqLikeDislike(type, postId) {
        
        let headers = new Headers()
        headers.append('Accept', 'Application/JSON')
        headers.append('Content-Type', 'Application/JSON')

        let req = new Request(`/api/${type}/${postId}`, {
            method: 'GET',
            headers,
            mode: 'cors'
        })

        return fetch(req)
            
    }

//----------------------------------------------------------------
//Bookmark controler

    const bookmarks = document.getElementsByClassName('bookmark');
    [...bookmarks].forEach(bokmark => {
        bokmark.style.cursor = 'pointer'
        bokmark.addEventListener('click', function (e) {
            let target = e.target.parentElement

            let header = new Headers()
            header.append('Accept', 'Application/JSON')

            let request = new Request(`/api/bookmarks/${target.dataset.post}`, {
                method: 'Get',
                header,
                mode: 'cors'
            })

            fetch(request)
                .then(res => res.json())
                .then(data => {
                    
                    if (data.bookmarks) {
                        target.innerHTML = '<ion-icon name="bookmark"></ion-icon>'
                    } else {
                        target.innerHTML = '<ion-icon name="bookmark-outline"></ion-icon>'
                    }
                })
                .catch(er => {
                    
                    alert(er.response.date.error)
            })
        })
    })

}