let $manageInviteFormContainer = $('#manageInviteFormContainer');
if ($manageInviteFormContainer.length != 0) {
    console.log('Manage invite form detected. Binding event handling logic to form elements.');
    //If the jQuery object which represents the form element exists,
    //the following code will create a method to submit registration details
    //to server-side api when the #submitButton element fires the click event.
    $('#submitButton').on('click', function (event) {
        event.preventDefault();
        const baseUrl = 'http://ec2-3-223-249-44.compute-1.amazonaws.com:5000';
        let fullName = $('#fullNameInput').val();
        let email = $('#emailInput').val();
        let userId = localStorage.getItem('user_id');
        let webFormData = new FormData();
        let tmpToken = localStorage.getItem('token');
        //========================================================================
        //ERROR(DEMO)
        //========================================================================
        // webFormData.append('recipientName', fullName);
        // webFormData.append('recipientEmail', email);

        //========================================================================
        //SOLUTION
        //========================================================================
        webFormData.append('recipientName', fullName);
        webFormData.append('recipientEmail', email);
        let pattern = new RegExp("^(?=.*[A-Za-z\s\.])[A-Za-z\s\.]{0,}$");
        if (pattern.test(fullName)) {
            console.log("Name is Valid!");
        } else {
            new Noty({
                timeout: '6000',
                type: 'error',
                layout: 'topCenter',
                theme: 'sunset',
                text: 'Unable to send email invitation. Due to Invalid Name',
            }).show();
            return;
        }
        axios({
            method: 'post',
            url: baseUrl + '/api/user/processInvitation',
            data: webFormData,
            headers: { 
            'Content-Type': 'multipart/form-data', 
            'user': userId,
            'authorization': 'Bearer ' +tmpToken,
        
        }
        })
            .then(function (response) {
                //Handle success
                console.dir(response);
                new Noty({
                    type: 'success',
                    timeout: '6000',
                    layout: 'topCenter',
                    theme: 'bootstrap-v4',
                    text: 'An email invitation is sent to ' + fullName + '<br />A cc email is sent to you.'
                }).show();
            })
            .catch(function (response) {
                //Handle error
                console.dir(response);
                new Noty({
                    timeout: '6000',
                    type: 'error',
                    layout: 'topCenter',
                    theme: 'sunset',
                    text: 'Unable to send email invitation.',
                }).show();
            });
    });

} //End of checking for $manageInviteFormContainer jQuery object
