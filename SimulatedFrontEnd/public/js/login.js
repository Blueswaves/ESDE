//========================================================================
//SOLUTION
//========================================================================
var count = 1;
//========================================================================

let $loginFormContainer = $('#loginFormContainer');
if ($loginFormContainer.length != 0) {
    console.log('Login form detected. Binding event handling logic to form elements.');
    //If the jQuery object which represents the form element exists,
    //the following code will create a method to submit registration details
    //to server-side api when the #submitButton element fires the click event.
    $('#submitButton').on('click', function (event) {
        event.preventDefault();
        const baseUrl = 'http://ec2-3-223-249-44.compute-1.amazonaws.com:5000';
        let email = $('#emailInput').val();
        let password = $('#passwordInput').val();
        let webFormData = new FormData();
        webFormData.append('email', email);
        webFormData.append('password', password);
        axios({
            method: 'post',
            url: baseUrl + '/api/user/login',
            data: webFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                //Inspect the object structure of the response object.
                //console.log('Inspecting the respsone object returned from the login web api');
                //console.dir(response);
                userData = response.data;
                if (userData.role_name == 'user') {
                    localStorage.setItem('token', userData.token);
                    localStorage.setItem('user_id', userData.user_id);
                    localStorage.setItem('role_name', userData.role_name);
                    window.location.replace('user/manage_submission.html');
                    return;
                }
                if (response.data.role_name == 'admin') {
                    localStorage.setItem('token', userData.token);
                    localStorage.setItem('user_id', userData.user_id);
                    localStorage.setItem('role_name', userData.role_name);
                    window.location.replace('admin/manage_users.html');
                    return;
                }
            })
            //========================================================================
            //ERROR(DEMO)
            //========================================================================
            // .catch(function(response) {
            //     //Handle error
            //     console.dir(response);
            //     new Noty({
            //         type: 'error',
            //         layout: 'topCenter',
            //         theme: 'sunset',
            //         timeout: '6000',
            //         text: 'Unable to login. Check your email and password',
            //     }).show();

            // });

            //========================================================================
            //SOLUTION
            //========================================================================
            .catch(function (response) {
                //Handle error
                console.dir(response);
                if (count > 5) {
                    new Noty({
                        type: 'error',
                        layout: 'topCenter',
                        theme: 'sunset',
                        timeout: '6000',
                        text: 'You have exceeded the number of login attempts',
                    }).show();
                    document.getElementById("submitButton").disabled = true;
                    setTimeout(function () {
                        document.getElementById("submitButton").disabled = false;
                        count = 1;
                    }, 300000);
                } else {
                    new Noty({
                        type: 'error',
                        layout: 'topCenter',
                        theme: 'sunset',
                        timeout: '6000',
                        text: 'Unable to login. Check your email and password',
                    }).show();
                    count++;
                }
            });
    });

} //End of checking for $loginFormContainer jQuery object
