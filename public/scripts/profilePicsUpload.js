


window.onload = function () {
    let baseCrppoimg = $('#cropped-image').croppie({
        enableExif: true,
    viewport: {
        width: 200,
        height: 200,
        type: 'circle'
    },
        boundary: { width: 300, height: 300 },
    
        mouseWheelZoom:true,



    })

    function readableFile(file) {
        let reader = new FileReader()
        reader.onload = function (event) {
            baseCrppoimg.croppie('bind', {
                url: event.target.result,
            }).then(() => {
                $('.cr-slider').attr({
                    'min': 0.5000,
                    'max':0.5000
                })
               
            })

        }
        reader.readAsDataURL(file)
    }

    $('#profilePicsFile').on('change', function (e) {
        console.log(this.files)
        if (this.files[0]) {
            readableFile(this.files[0])
            $('#crop-modal').modal({
                backdrop: 'static',
                keyboard:false
            })
        }
    })

    $('#cances-crpping').on('click', function () {
        $('#crop-modal').modal('hide')
        // setTimeout(() => {
        //     baseCrppoimg.croppie('destroy')
        // }, 1000)
    })

$('#upload-image').on('click', function () {
    baseCrppoimg.croppie('result','blob')
        .then(blob => {
            let formData =  new FormData()
            let file = document.getElementById('profilePicsFile').files[0]
            let name = generateFileNmae(file.name)
            formData.append('profilePics', blob, name)

            
            let heder =  new Headers()
            heder.append('Accept', 'Application/JSON')
            

            let req = new Request('/upload/profilePica',{
                method: 'POST',
                heder,
                body: formData,
                

            })
            
            return fetch(req)
            
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.getElementById('removeProfilePics').style.display ='block'
            document.getElementById("jahangir").src = data.profilePic
            document.getElementById('profilePicsFrom').reset()
            $('#crop-modal').modal('hide')
            // setTimeout(() => {
            //     baseCrppoimg.croppie('destroy')
                
            // }, 1000 )
        })
})
    //
    $('#removeProfilePics').on('click', function () {
        let req = new Request('/upload/profilepics', {
            method: 'DELETE',
            mode:'cors'
        })
        fetch(req)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            document.getElementById('removeProfilePics').style.display ='none'
            document.getElementById("jahangir").src = data.profilePic
            document.getElementById('profilePicsFrom').reset()
            }).catch(e => {
                console.log(e)
                alert("Server Error Occru")
        })
    })
    
}
    function generateFileNmae(name) {
        const types = /(.jpeg|.jpg|.png|.gif)/
        return name.replace(types, '.png')
    }
