const postContainer = document.querySelector("#posts-container");
const loaderContainer = document.querySelector(".loader");
const filterInput = document.querySelector("#filter");
let page = 1;

const getPosts = async () => {
const response = await 
fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
 return response.json();

}



const addPOstaItoDOM = async () => {

const posts = await getPosts();
const postsTemplate = generatePostsTemplates(posts);

postContainer.innerHTML += postsTemplate ;

}


 const generatePostsTemplates = posts => posts.map(({id, title, body}) => `

<div class="post" >

<div class="number"> ${id} </div>

<div class="post-info" > 

<h2 class="post-title" > ${title}  </h2> 

<p class="post-body"> ${body} </p>

</div>
</div>

`).join(" ") // o join retorna uma nova string com todos os itens do 
//meu array concatenados e separados por uma virgula


// adicionar mais posts na paguina
const getNextPosts = () => {

    setTimeout(() => {
        page++;
    addPOstaItoDOM();

    }, 300)

}

// remover loader
const removeLoader = () => {
setTimeout(() => {

loaderContainer.classList.remove("show") ;

getNextPosts();

},2000)

}
//adicionar loader
const showloader = () => {

loaderContainer.classList.add('show');

removeLoader();

}

const handleScrollPageBottom = () => {
    const {clientHeight, scrollHeight, scrollTop} =  document.documentElement; 
    const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10;
 
 
    if(isPageBottomAlmostReached){
 
    showloader();
 
    }
 
 }


// modifica a visibilidade, 
//seleciona quais posts são visiveis 
const handleInputValue = event => {
    // recebe o valor inserido na input 
    const inputValue = event.target.value.toLowerCase();
    
    const posts = document.querySelectorAll(".post");
    
    posts.forEach( showPostIfMatchInputValue(inputValue))
    
}


const showPostIfMatchInputValue = inputValue => post => {

    const postTitle = post.querySelector(".post-title").textContent.toLowerCase();
    const postBody = post.querySelector(".post-body").textContent.toLowerCase();
    const postContainsInputValue =  postTitle.includes(inputValue) || postBody.includes(inputValue) ;


if ( postContainsInputValue) {

    post.style.display = "flex";
    return;

}

post.style.display = "none";

}

addPOstaItoDOM();

window.addEventListener("scroll",handleScrollPageBottom );
// a target armazena a referencia do elemento em que o envento ocorreu
// event contem informacoes sobre o evento 
filterInput.addEventListener("input",handleInputValue )


