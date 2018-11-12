let addNewArticle = document.getElementById("addArticle");
let divWindow = document.getElementById("window");
let title = document.getElementById("title");
let main_text = document.getElementById("main_text");
let photo = document.getElementById("photo");
let save = document.getElementById("save");
let cancel = document.getElementById("cancel");
let update = document.getElementsByClassName("update");
let delet = document.getElementsByClassName("del");
let check = 0;
let id_del = 0;


function getBlog() {
    $.ajax({
        url: "/api/blog",
        type: "GET",
        contentType: "application/json",
        dataType: 'json', 
        success: function (blog) {
            var divs = "";
            $.each(blog, function (index, article){
                divs += div(article);
            }) 
            $(".information-big-img").append(divs);   
        }
    });
}

var div = function (article) {
    return `
        <div class='title-3-images'>
            <img src="${article.picture}">
            <p class='your-title'>
                ${article.name}
            </p>
            <p>
                ${article.text}
            </p>
            <BUTTON onclick='up()' class='update' data-id=${article.id}>
                Изменить
            </BUTTON>
            <button class='del' onclick='del()' data-id=${article.id}>
                Удалить
            </button>
        </div>
    `;
};

getBlog();

addNewArticle.addEventListener('click', () => {
    check = 0;
    divWindow.style.display = 'block';
});

cancel.addEventListener('click', () => {
    divWindow.style.display = 'none';
});

let id = 0;
let p = '';
function up(){

    for(let i = 0; i < update.length; i++){
        update[i].onclick = function(event){
            check = 1;
            divWindow.style.display = 'block';
            let picture = event.target.parentElement.firstElementChild.attributes[0].nodeValue;
            let name = event.target.parentElement.firstElementChild.nextElementSibling.textContent;
            let text = event.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.textContent;
            p =  picture;
            title.value = name;
            main_text.value = text;
            id = event.target.parentElement.lastElementChild.attributes[2].value;
            event.target.parentElement.remove();

        }
    }  
}

let reader = new FileReader();
let uploadImage = function(image) {

    reader.onloadend = function() {
        let imageBase64 = this.result;
    };
    reader.readAsDataURL(image);
};


save.addEventListener('click', (event) => {

    let name = title.value;
    let text = main_text.value;
    if(!check){
        console.log("create");
        let picture = reader; 
        let path_pic = photo.value.substr(12);
        createArticle(name, text, picture.result, path_pic);
    }
    else{
        updateArticle(id, name, text, p);
    }
});


function createArticle(name_, text_, picture_, path_pic_){

    $.ajax({
        url: "/api/blog",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            picture: picture_,
            name: name_,
            text: text_,
            path: path_pic_
        }), 
        success: function (article) {
            console.log("success");
            reset();
            divWindow.style.display = 'none';
            $(".information-big-img").append(div(article));   
        }
    })
}

function updateArticle(id, name, text, picture){
   $.ajax({
        url: "/api/blog/"+id,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            id:id,
            picture: picture,
            name: name,
            text: text
        }), 
        success: function (article) {
            console.log("success");
            reset();
            divWindow.style.display = 'none';
            $(".information-big-img").append(div(article));   
        }
    }) 
}


function reset(){
    $("#title").val("");
    $("#main_text").val("");
    $("#photo").val("");
}



function del(){
    console.log("delete");
    for(let j = 0; j < delet.length; j++){
        console.log("for");
        delet[j].onclick = function(event){
            //console.log(event.target.parentElement.lastElementChild.attributes[2].value);
            id_del = event.target.parentElement.lastElementChild.attributes[2].value;
            event.target.parentElement.remove();
            deleteArticle();
        }
    } 
    
    
}

function deleteArticle(){
    console.log(id_del);
   $.ajax({
        url: "/api/blog/"+id_del,
        type: "DELETE",
        contentType: "application/json",
        data: JSON.stringify({
            id:id_del
        }), 
        success: function () {
            console.log("success");   
        }
    })  
}


