function Validation(values) {
    let error={}
    const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if(values.name==='')
    {
        error.name="Name should not be empty";
    }
    else
    {
        error.name=""
    }
    if(values.email==="")
    {
        error.email="Email should not be empty";
    }
    else if(!email_pattern.test(values.email))
    {
        error.email = "Invalid email address";
    }
    else
    {
        error.email=""
    }
    if(values.password==="")
    {
        error.password="Password should not be empty";
    }
    else if(!password_pattern.test(values.password)){
        error.password = "Weak Password";
    }
    else
    {
        error.password="";
    }
    if(values.role===""){
        error.role="Select Role";
    }
    else{
        error.role="";
    }
    return error;
}

export default Validation;
