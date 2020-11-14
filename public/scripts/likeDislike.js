
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

