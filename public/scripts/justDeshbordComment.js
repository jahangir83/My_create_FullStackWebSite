window.onload = function () {
    let comment_hold = document.getElementById("comment-holder")
          
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
}

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