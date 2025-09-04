// JavaScript for handling file upload
document.getElementById("photo-upload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profile-photo").style.backgroundImage = `url('${e.target.result}')`;
            };
            reader.readAsDataURL(file);
        }

});

document.getElementById("profile-email").value = localStorage.getItem("userEmail");
document.getElementById("profile-password").value = localStorage.getItem("userPassword");
