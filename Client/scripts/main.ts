(function () {

    function AuthGuard(): void {
        let protectedRoutes: string[] = [
            '/contact-list',
            '/edit'
        ]
    
        if (protectedRoutes.indexOf(location.pathname) > -1) {
            // check if user is logged in
            if (!sessionStorage.getItem("user")) {
                // redirect the user to login.html
                location.href = '/login'
            }
        }
    }

    function DisplayHome(): Function {
        $("#RandomButton").on("click", function() {
            location.href = '/about'
        })

        // concatenation - '1' + '2' + '3'
        // interpolation - `${var_1}`
        let firstString = "This is a "
        let secondString = `${ firstString } main paragraph that we added through javascript and this is also on GitHub Pages`

        $("main").addClass("container").append(`<p id="MainParagraph" class="mt-3 container">${ secondString }</p>`)

        return new Function()
    }

    function DisplayProjects(): Function {
        console.log("Projects Page")

        return new Function()
    }

    function AddContact(fullName: string, contactNumber: string, emailAddress: string) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress)
        if (contact.serialize()) {
            let key = contact.Name.substring(0, 1) + Date.now()
            localStorage.setItem(key, contact.serialize() as string)
        }
    }

    function ValidateInput(inputFieldID: string, regularExpression: RegExp, exception: string) {
        let messageArea = $('#messageArea').hide()

        $('#' + inputFieldID).on("blur", function() {
            let inputText = $(this).val() as string

            if (!regularExpression.test(inputText)) {
                // failure to match full name with regex

                $(this).trigger("focus").trigger("select")

                messageArea.addClass("alert alert-danger").text(exception).show()
            } else {
                // success in matching full name with regex

                messageArea.removeAttr("class").hide()
            }
        })
    }

    function ContactFormValidate(): void {
        let emailAddressPattern = /^[\w-\.]+@([\w-]+\.)+[\w-][\D]{2,10}$/g
        let fullNamePattern = /^([A-Z][a-z]{1,25})((\s|,|-)([A-Z][a-z]{1,25}))*(\s|-|,)*([A-Z][a-z]{1,25})*$/g

        ValidateInput("fullName", fullNamePattern, "Please enter a valid Full name which means a capitalized first name and capitalized last name")
        ValidateInput("emailAddress", emailAddressPattern, "Please enter a valid Email Address")
    }

    function DisplayContacts(): Function {
        console.log("Contact Us Page")

        $('a[href="/contact-list"]').off('click')
        $('a[href="/contact-list"]').on('click', function() {
            location.href='/contact-list'
        })

        ContactFormValidate()

        let submitButton = document.getElementById("submitButton") as HTMLElement
        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement

        submitButton.addEventListener("click", function(e) {
            e.preventDefault()
            location.href = "/";
            // if (subscribeCheckbox.checked) {
            //     let fullName = document.forms[0].fullName.value
            //     let contactNumber = document.forms[0].contactNumber.value
            //     let emailAddress = document.forms[0].emailAddress.value

            //     // If user subscribes, store the contact in localStorage
            //     let contact = new core.Contact(fullName, contactNumber, emailAddress)

            //     if (contact.serialize()) {
            //         let key = contact.Name.substring(0,1) + Date.now()
            //         localStorage.setItem(key, contact.serialize() as string)
            //     }
            // }
        })

        return new Function()
    }

    function DisplayContactList(): Function {
            fetch("/users/users",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((r)=>{
                r.json().then((users)=>{
                    if(users){
                        console.log(users)

            let contactList = document.getElementById("contactList") as HTMLElement // Our contact list in the table of the contact-list page

            let data = "" // Add data to this variable. Append deserialized data from localStorage to data

            let index = 1 // Count number of keys

            // for every key in the keys collection
            for (const u in users) {
                const user = users[u]
                // Inject repeatable row into the contactList
                data += `<tr>
                    <th scope="row" class="text-center">${ index }</th>
                    <td class="text-center">${ user.firstName }</td>
                    <td class="text-center">${ user.lastName }</td>
                    <td class="text-center">${ user.email }</td>
                    <td class="text-center"><button value="${ user.email }" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i>&nbsp; Edit</button></td>
                    <td class="text-center"><button value="${ user.email }" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i>&nbsp; Delete</button></td>
                </tr>
                `
                
                index++
            }

            contactList.innerHTML = data

            $("button.delete").on("click", function() {
                if (confirm("Are you sure you want to delete this?")){
                    fetch("/users/user",{
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({email: ($(this).val() as string)})
                    })
                }

                // location.href = '/contact-list'
                location.href='/contact-list'
            })

            $("button.edit").on("click", function() {
                // location.href = '/edit#' + $(this).val()
                location.href='/edit#' + $(this).val() as string
            })
                    }
                })
            })

        $("#addButton").on("click", () => {
            // location.href = '/edit#Add'
            location.href='/edit#Add'
        })

        return new Function()
    }

    function DisplayEditPage(): Function {

        let page = location.hash.substring(1)
        console.log(page);
        

        switch(page) {
            case "Add":
                {
                    $("#welcome").text("WEBD6201 Demo Add Contact")

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`)

                    $("#editButton").on("click", (event) => {
                        event.preventDefault()

                        let fullName = document.forms[0].fullName.value
                        let contactNumber = document.forms[0].contactNumber.value
                        let emailAddress = document.forms[0].emailAddress.value

                        // Get form information (name, contact number, email address)
                        AddContact(fullName, contactNumber, emailAddress)

                        // redirect to contact-list
                        // location.href = '/contact-list'
                        location.href='/contact-list'
                    })
                }
                break
            default:
                {
                    let email = ""
                    let password = ""

                    fetch("users/user/read",{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({email: page})
                    })
                    .then((r)=>{
                        r.json()
                        .then((u)=>{
                            console.log(u)
                            if(!u.err){
                                email = u._doc.email
                                password = u._doc.password
                                console.log(page, email, password)
                                $("#firstName").val(u._doc.firstName)
                                $("#lastName").val(u._doc.lastName)
                            }
                        })
                    })
                    // get contact info from localStorage

                    // display contact info in edit form

                    // when edit button is pressed, update the contact
                    $("#editButton").on("click", (event) => {
                        event.preventDefault()
                        fetch("/users/user", {
                            method: "PUT",
                            headers: {
                               "Content-Type": "application/json" 
                            },
                            body: JSON.stringify({firstName: $("#firstName").val(), lastName: $("#lastName").val(), email, password})
                                
                        }).then((r)=>{
                            r.json()
                            .then((u)=>{
                                location.href= 'contact-list'
                            })
                        })
                    })

                    $("#resetButton").on("click", () => {
                        // location.href = '/contact-list'
                        location.href='/contact-list'
                    })
                }
                break
        }

        return new Function()
    }

    function DisplayReferences(): Function {
        console.log("References Page")

        return new Function()
    }

    function DisplayLoginPage(): Function {
        console.log("Login Page")

        let messageArea = $('#messageArea')
        messageArea.hide()

        $('#loginButton').on('click', function() {
            let success = false
            let newUser = new core.User()
            let email = (document.getElementById("email") as HTMLInputElement).value
            let password = (document.getElementById("password") as HTMLInputElement).value
            fetch('users/user/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password})
            })
            .then((r)=>{
                r.json()
                .then((u)=>{
                    if(!u.err){
                        sessionStorage.setItem('user', JSON.stringify(u))
                        CheckLogin()
                        location.href = "/contact-list"
                    }else{
                        messageArea.addClass('alert alert-danger').text('Error: Invalid Login Credentials.. Username/Password Mismatch').show()
                    }
                })
            })

            
        })

        $('#cancelButton').on('click', function() {
            // clear the form
            document.forms[0].reset()

            // return to home page
            // location.href = '/home'
            location.href='/home'
        })

        return new Function()
    }

    function CheckLogin(): void {
        // if the user is logged in, then
        if (sessionStorage.getItem("user")) {
            // switch the login button to logout
            $('#login').html(
                `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
            )

            $('#logout').on('click', function() {
                // perform logout
                sessionStorage.clear()

                // switch logout link to login link
                $('#login').html(
                    `<a class="nav-link" href="/login"><i class="fas fa-sign-in-alt"></i> Login</a>`
                )

                // redirect to login.html
                location.href = '/login'
            })
        }
    }
    
    function DisplayRegisterPage(): Function {
        console.log("Registration Page")

        const fn = document.getElementById('firstName')
        const ln = document.getElementById('lastName')
        const email = document.getElementById('emailAddress')
        const password = document.getElementById('password')
        const cp = document.getElementById('confirmPassword')
        const form = document.getElementById('registerForm')
        form?.addEventListener("submit", (e)=>{
            e.preventDefault()
            console.log("register form got submitted")

            fetch("/users/user", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({firstName: (fn as HTMLInputElement).value, lastName: (ln as HTMLInputElement).value, email: (email as HTMLInputElement).value, password: (password as HTMLInputElement).value!})
            })
        })


        return new Function()
    }

    function Display404Page(): Function {
        console.log("404 Page")

        return new Function()
    }
    
    function Start(): void {
        console.log("App Started Successfully!")

        let pageId = $('body')[0].getAttribute('id')

        CheckLogin()

        switch (pageId) {
            case "home":
                DisplayHome()
            case "projects":
                DisplayProjects()
            case "contact":
                DisplayContacts()
            case "contact-list":
                AuthGuard()
                DisplayContactList()
            case "references":
                DisplayReferences()
            case "edit":
                AuthGuard()
                DisplayEditPage()
            case "login":
                DisplayLoginPage()
            case "register":
                DisplayRegisterPage()
            case "404":
                Display404Page()
        }

    }

    window.addEventListener("load", Start)
})()