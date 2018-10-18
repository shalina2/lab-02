'use strict';

//constructor

function Animal (animalobject){
  this.image_url =animalobject.image_url;
  this.title =animalobject.title;
  this.description =animalobject.description;
  this.horns=animalobject.horns;
  this.keyword=animalobject.keyword;
  this.indropdown=false;
  allanimals.push(this);   
}
const allanimals =[];

Animal.prototype.renderimage= function () {
  $('main').append('<div class ="clone"></div>');
  let $animalContainer =$('div[class="clone"]');
  let $clonedanimal =$('#photo-template').html();
  $animalContainer.html($clonedanimal);
  console.log($animalContainer);
  $animalContainer.find('h2').text(this.title);
  $animalContainer.find('img').attr('src',this.image_url);
  $animalContainer.find('p').text(this.description);

  $animalContainer.attr('class','');
  $animalContainer.attr('data-keyword',this.keyword);
  $animalContainer.attr('data-horns',this.horns);

}


Animal.prototype.rendermenu= function () {
  $('select').append('<option class ="newdrop"></option>');
  let $menuContainer =$('option[class="newdrop"]');
  //$animalContainer.html($);
  console.log('in render menu');
       
       
  $menuContainer.attr('value',this.keyword);
  $menuContainer.text(this.keyword);
  $menuContainer.attr('class','');
  allanimals.forEach(animal => {
    if (animal.keyword ===this.keyword){
      animal.indropdown=true;
    }
  })
}


function renderallanimals () {
  console.log('hello!!')

  allanimals.forEach(animal => {
    renderAnyHandlebars('#animal-Handlebars',animal,'main');
  })
}
function renderdropdownanimals(){
        
  allanimals.forEach(animal => {
    if(animal.indropdown===false){
      animal.rendermenu();
    }
    
  })
  $('select').on('change',renderfilterdanimals)
  console.log('attempting to listen')
}

function renderfilterdanimals() {
  //let targetvalue =this.value;
  allanimals.forEach(animal => {
    let $selectcontainer = $(`div[data-keyword=${animal.keyword}]`);
    
    $selectcontainer.attr('hidden',true)
    console.log($selectcontainer)
  })
  allanimals.forEach(animal => {
    if(animal.keyword===this.value){
      let $selectcontainer = $(`div[data-keyword=${animal.keyword}]`);  
      $selectcontainer.attr('hidden',false)
    }
  })


}
Animal.prototype.renderHandlebars = function () {
  let animalSource = $('#animal-handlebars').html();
  let animalTemplate = Handlebars.compile(animalSource);
  let animalHtml = animalTemplate(this);

  $('body').append(animalHtml);
}

function renderAnyHandlebars(sourceId,data,logTarget) {
  let template = Handlebars.compile($(sourceId).html());
  let newHtml = template(data);
  console.log($(logTarget));
  $(logTarget).append(newHtml);
}
    
function renderAnyAnimals () {
  allanimals.forEach(animal => {
    renderAnyHandlebars ('#animal-handlebars',animal,'main')
  })
}


//renderdropdownanimals();
function logTarget(){
  console.log('this',this.value);
  console.log('$(this)', $(this.value));
}
let readJSON = function () {
  $.get('./data/page-1.json',data => {
    console.log('data')
    data.forEach(animaljson => {
      new Animal(animaljson);
    })
  }).then(renderallanimals).then(renderdropdownanimals)//.then(renderAnyAnimals)
}

readJSON();
