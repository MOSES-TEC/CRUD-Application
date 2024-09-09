document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("myForm"),
        imgInput = document.getElementById("showImg"),
        file = document.getElementById("imgInput"),
        userName = document.getElementById("name"),
        age = document.getElementById("age"),
        city = document.getElementById("city"),
        email = document.getElementById("email"),
        
        post = document.getElementById("post"),
        sDate = document.getElementById("sDate"),
        submitBtn = document.querySelector(".submit"),
        userInfo = document.getElementById("data"),
        modal = new bootstrap.Modal(document.getElementById("userForm")),
        modalTitle = document.querySelector("#userForm .modal-title"),
        newUserBtn = document.querySelector(".newUser");

    let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];
    let isEdit = false, editId;

    showInfo();

    newUserBtn.addEventListener('click', () => {
        submitBtn.innerText = 'Submit';
        modalTitle.innerText = "Fill the Form";
        isEdit = false;
        imgInput.src = "./images/profile.jpg";
        form.reset();
    });

    file.addEventListener('change', function () {
        if (file.files[0].size < 1000000) { // 1MB = 1000000
            const fileReader = new FileReader();
            fileReader.onload = function (e) {
                imgInput.src = e.target.result;
            };
            fileReader.readAsDataURL(file.files[0]);
        } else {
            alert("This file is too large!");
        }
    });

    function showInfo() {
        userInfo.innerHTML = '';
        getData.forEach((element, index) => {
            let createElement = `<tr class="employeeDetails">
                <td>${index + 1}</td>
                <td><img src="${element.image}" alt="image" width="50px" height="50px"></td>
                <td>${element.name}</td>
                <td>${element.age}</td>
                <td>${element.city}</td>
                <td>${element.email}</td>
                
                <td>${element.post}</td>
                <td>${element.startDate}</td>
                <td>
                    <button class="btn btn-success" onclick="readData(${index})" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                    <button class="btn btn-primary" onclick="editData(${index})" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger" onclick="deleteData(${index})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>`;
            userInfo.insertAdjacentHTML("beforeend", createElement);
        });
    }

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (userName.value === "" || age.value === "" || city.value === "" || email.value === "" || post.value === "" || sDate.value === "") {
            alert("All fields are required.");
        } else {
            let userProfile = {
                name: userName.value,
                age: age.value,
                city: city.value,
                email: email.value,
                
                post: post.value,
                startDate: sDate.value,
                image: imgInput.src
            };

            if (!isEdit) {
                getData.push(userProfile);
            } else {
                getData[editId] = userProfile;
                isEdit = false;
            }

            localStorage.setItem('userProfile', JSON.stringify(getData));
            showInfo();
            form.reset();
            imgInput.src = "./images/profile.jpg";
            modal.hide();
        }
    });

    window.readData = function(index) {
        let user = getData[index];
        document.getElementById("showName").value = user.name;
        document.getElementById("showAge").value = user.age;
        document.getElementById("showCity").value = user.city;
        document.getElementById("showEmail").value = user.email;
        
        document.getElementById("showPost").value = user.post;
        document.getElementById("showsDate").value = user.startDate;
        document.querySelector("#readData .showImg").src = user.image;
    };

    window.editData = function(index) {
        let user = getData[index];
        userName.value = user.name;
        age.value = user.age;
        city.value = user.city;
        email.value = user.email;
        
        post.value = user.post;
        sDate.value = user.startDate;
        imgInput.src = user.image;
        submitBtn.innerText = 'Update';
        modalTitle.innerText = "Edit User";
        isEdit = true;
        editId = index;
    };

    window.deleteData = function(index) {
        getData.splice(index, 1);
        localStorage.setItem('userProfile', JSON.stringify(getData));
        showInfo();
    };
});