

window.onload = function () {
    tinymce.init({
        selector: '#tiny-mc-post-body',
        plugins: ["allychecker ,autolink image autoresize paste"],
    //     plugins : ['advlist autolink lists link image charmap print preview anchor',
    // 'searchreplace visualblocks advcode fullscreen',
    // 'insertdatetime media table powerpaste hr code']
        // toolbar: 'bold italic underline | alignleft aligncenter aliignright aignjustify | bullist numlist outdent indent | link image media | forecolor  backcolor emoticons | code preview',

        toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image code',
        powerpaste_allow_local_images: true,
        // powerpaste_word_import: 'prompt',
        // powerpaste_html_import: 'prompt',
        content_style: 'body { font-size:8vw, font-family:Helvetica,Arial,sans-serif; font-size:14px, overflow-wrap: break-word ,word-wrap: break-word }',
        
        height: 300,
        automatic_uploads: true,
        images_upload_url: 'public/uploads/postImages',
        relative_urls : false,
        images_upload_handler: function (blobInfo, success, failure) {
            let heder =  new Headers()
            heder.append('Accept', 'Application/JSON')

            let formData = new FormData()
            formData.append('post-image', blobInfo.blob(), blobInfo.filename())
            let req = new Request('/upload/postimage', {
                method: 'POST',
                body: formData,
                headers: heder,
                mode: 'cors',
               
            })

            fetch(req)
                .then(res => res.json())
                .then(data => {
                success(data.imgUrl)
                })
                .catch(() => {
                failure('HTTP Error')
            })
        }
    })
}