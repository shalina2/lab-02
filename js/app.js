'use strict'

//constructor
console.log('hello world');
function Animal (animalobject){
    this.url =animalobject.image_url;
    this.title =animalobject.title;
    this.description =animalobject.description;
    this.horns=animalobject.horns;
    this.keyword=animalobject.keyword;
    allanimals.push(this);
    console.log('creating animals');
}
    const allanimals =[];

    const readJSON = function () {
        $.get('../data/page-1.json',data => {
            data.forEach(animaljson => {
                new Animal(animaljson);
            })
        }).then(console.log(allanimals))
    }

    readJSON();