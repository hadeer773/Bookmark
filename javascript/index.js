// global variables
var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var deleteBtns;
var visitBtns;
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
var bookmarks = [];


//storage
if (localStorage.getItem("bookmarksList")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
    for (var x = 0; x < bookmarks.length; x++) {
        displayBookmark(x);
    }
}
//  Submit Function

submitBtn.addEventListener("click", function () {
    if (
        siteName.classList.contains("is-valid") &&
        siteURL.classList.contains("is-valid")
    ) {
        var bookmark = {
            siteName: capitalize(siteName.value),
            siteURL: siteURL.value,
        };
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
        displayBookmark(bookmarks.length - 1);
        clearInput();
        clearshadow()
        siteName.classList.remove("is-valid");
        siteURL.classList.remove("is-valid");
        
    } else {
        boxModal.classList.remove("d-none");
    }
});

function clearshadow(){
    siteName.classList.remove("shadow-red");
    siteName.classList.remove("shadow-green");
    siteName.classList.add("input-shadow");
    siteURL.classList.remove("shadow-red");
    siteURL.classList.remove("shadow-green");
    siteURL.classList.add("input-shadow");
}
// Display Function 
function displayBookmark(indexOfWebsite) {
    var userURL = bookmarks[indexOfWebsite].siteURL;
    var httpsRegex = /^https?:\/\//g;
    if (httpsRegex.test(userURL)) {
        validURL = userURL;
        fixedURL = validURL
            .split("")
            .splice(validURL.match(httpsRegex)[0].length)
            .join("");
    } else {
        var fixedURL = userURL;
        validURL = `https://${userURL}`;
    }
    var newBookmark = `
            <tr>
                <td>${indexOfWebsite + 1}</td>
                <td>${bookmarks[indexOfWebsite].siteName}</td>              
                <td>
            <button class="btn btn-visit" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
                </td>
                <td>
            <button class="btn btn-delete pe-2" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                    </button>
                </td>
            </tr>
            `;
    tableContent.innerHTML += newBookmark;

    //  delete buttons 

    deleteBtns = document.querySelectorAll(".btn-delete");
    if (deleteBtns) {
        for (var j = 0; j < deleteBtns.length; j++) {
            deleteBtns[j].addEventListener("click", function (e) {
                deleteBookmark(e);
            });
        }
    }

    //  visit buttons 

    visitBtns = document.querySelectorAll(".btn-visit");
    if (visitBtns) {
        for (var l = 0; l < visitBtns.length; l++) {
            visitBtns[l].addEventListener("click", function (e) {
                visitWebsite(e);
            });
        }
    }
}



// make it captel
function capitalize(str) {
    let strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
}

    // Clear Function

    function clearInput() {
        siteName.value = "";
        siteURL.value = "";
    }
    

//  Delete Function
function deleteBookmark(e) {
    tableContent.innerHTML = "";
    var deletedIndex = e.target.dataset.index;
    bookmarks.splice(deletedIndex, 1);
    for (var k = 0; k < bookmarks.length; k++) {
        displayBookmark(k);
    }
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

// Visit Function

function visitWebsite(e) {
    var websiteIndex = e.target.dataset.index;
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarks[websiteIndex].siteURL)) {
        open(bookmarks[websiteIndex].siteURL);
    } else {
        open(`https://${bookmarks[websiteIndex].siteURL}`);
    }
}

// enter correct data

siteName.addEventListener("input", function () {
    validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
    validate(siteURL, urlRegex);
});

function validate(item, regex) {
    var testRegex = regex;
    if (testRegex.test(item.value)) {
        item.classList.add("is-valid");        
        item.classList.add("shadow-green");        
        item.classList.remove("is-invalid");
        item.classList.remove("shadow-red");
        item.classList.remove("input-shadow");
    } else {
        item.classList.add("is-invalid");
        item.classList.add("shadow-red");  
        item.classList.remove("is-valid");
        item.classList.remove("shadow-green");        
        item.classList.remove("input-shadow");

    }
}

//Close Modal Function

function closeModal() {
    boxModal.classList.add("d-none");
}

//  close the reminder button  

closeBtn.addEventListener("click", closeModal);

