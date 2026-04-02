function validateForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    if (name === "" || email === "") {
        document.getElementById("msg").innerHTML = "Fill all fields ❌";
        return false;
    }

    document.getElementById("msg").innerHTML = "Message Sent ✅";
    return false;
}