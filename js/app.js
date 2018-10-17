'use strict';

//constructor

function Animal (animalobject){
    this.url =animalobject.image_url;
    this.title =animalobject.title;
    this.description =animalobject.description;
    this.horns=animalobject.horns;
    this.keyword=animalobject.keyword;
    allanimals.push(this);
    
}
    const allanimals =[];

    Animal.prototype.renderimage= function () {
        $('main').append('<div class ="clone"></div>');
        let $animalContainer =$('div[class="clone"]');
        let $clonedanimal =$('#photo-template').html();
        $animalContainer.html($clonedanimal);
        // console.log($animalContainer);
        $animalContainer.find('h2').text(this.title);
        $animalContainer.find('img').attr('src',this.url);
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
    }

    let readJSON = function () {
        $.get('../data/page-1.json',data => {
            data.forEach(animaljson => {
                new Animal(animaljson);
            })
        }).then(renderallanimals).then(renderdropdownanimals)
    }

    function renderallanimals () {
        allanimals.forEach(animal => {
            animal.renderimage();
        })
    }
    function renderdropdownanimals(){
        
        allanimals.forEach(animal => {
            animal.rendermenu();
        })
    }



    readJSON();
    //renderdropdownanimals();
    