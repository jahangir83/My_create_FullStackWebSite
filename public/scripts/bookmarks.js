window.onload = function () {
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