//creating heading for content

var heading=document.createElement("h3")
heading.innerHTML="Makeup API"
//creating heading for nav
var page=document.createElement("h3")
page.innerHTML="Pagination"
//creating container
var wrapper=document.createElement("div")
wrapper.setAttribute("id","wrapper")
wrapper.setAttribute("class","container")
//creating row1
var contents=document.createElement("div")
contents.setAttribute("id","content")
contents.setAttribute("class","row")
//creating row2
var nav=document.createElement("div")
nav.setAttribute("id","nav")




//appending
wrapper.append(heading,contents,page,nav)
document.body.append(wrapper)

var items=[]

//fetch the api
async function foo(){
  let x=await fetch("https://makeup-api.herokuapp.com/api/v1/products.json")
  let res=await x.json()
  items=res
  
}

foo()

let pageIndex=0;
let itemsPerPage=6;

//display the contents which you were asked
load()
async function load(){
    try{
        await foo()
        console.log(items)
    
    
        document.getElementById("content").innerHTML='';
        for(var i=pageIndex*itemsPerPage; i<(pageIndex*itemsPerPage)+itemsPerPage; i++){
            if(!items[i]){
                break;
            }
            var col=document.createElement("div")
            col.setAttribute("class","col-md-6")
            col.innerHTML+=`<div class="card mb-3 cards" style="max-width: 540px;">
            <div class="row no-gutters">
              <div class="col">
                <img src="${items[i].image_link}" alt="brand-image">
              </div>
              <div class="col">
                <div class="card-body">
                  <h5 class="card-title">Brand:${items[i].brand}</h5>
                  <h6>Name:${items[i].name}</h6>
                  <h6>Price:${items[i].price}<h6>
                  <h6 id="des">Description:${items[i].description}<h6>
                  <a href="${items[i].product_link}" class="btn btn-primary" target="blank">product link</a>
                </div>
              </div>
            </div>
          </div>`
            document.getElementById("content").append(col)
        }
    }
    catch(error){
        console.log(error)
    }

}
//creating pagination
async function loadPage(){
    try{
        await foo()
        document.getElementById("nav").innerHTML='';
        for(var i=0; i<(items.length/itemsPerPage);i++){
            const span=document.createElement("button")
            span.setAttribute("class","button")
            span.innerHTML=i+1
            span.addEventListener('click',(e)=>{
                pageIndex=e.target.innerHTML-1;
                load()
            })
            document.getElementById("nav").append(span)
        }
    }
    catch(error){
        console.log(error)
    }

}
loadPage()





