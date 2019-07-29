const rp = require('request-promise');
const _ = require('lodash');
const baseApiUri = 'http://jservice.io/api';

// const singleJeopardyValues = [100, 200, 300, 400, 500];
// const doubleJeopardyValues = singleJeopardyValues.map(val => val * 2);
let cluesByCategoryResponse = [];
let grouped = [];
let categoryIds = [];
let allUrls = [];

const categoryOptions ={
    uri: `${baseApiUri}/categories?count=50`,
    json: true
};

const categoriesPromise = rp(categoryOptions);

categoriesPromise.then((response) => {

    const rand1 = random(1, 50);
    const rand2 = random(1, 50);
    const rand3 = random(1, 50);
    const rand4 = random(1, 50);
    const rand5 = random(1, 50);

    const randomIndexes = [rand1, rand2, rand3, rand4, rand5];

    randomIndexes.forEach((idx) => {
        urls = getUrls(response[idx].id); 
        urls.forEach(url => allUrls.push(url));
    });

    return new Promise((resolve, reject) => {
        resolve(allUrls);
    })

}).then((urls) => {
    let promises = [];
    urls.forEach((url) => {
        let promise = rp({uri: url, json: true});
        promises.push(promise);
    });

    Promise.all(promises).then((response) => {
        response.forEach((val) => {
            if (val.length > 0){
                const clue = {
                    categoryId: val[0].category.id,
                    category: val[0].category.title,
                    value: val[0].value,
                    question: val[0].question,
                    answer: val[0].answer
                }

                cluesByCategoryResponse.push(clue);
            }
        })
    });
    
});




function getUrls(categoryId) {
    const urls = [
        `${baseApiUri}/clues?value=100&category=${categoryId}`,
        `${baseApiUri}/clues?value=200&category=${categoryId}`,
        `${baseApiUri}/clues?value=300&category=${categoryId}`,
        `${baseApiUri}/clues?value=400&category=${categoryId}`,
        `${baseApiUri}/clues?value=500&category=${categoryId}`,
        `${baseApiUri}/clues?value=600&category=${categoryId}`,
        `${baseApiUri}/clues?value=700&category=${categoryId}`,
        `${baseApiUri}/clues?value=800&category=${categoryId}`,
        `${baseApiUri}/clues?value=900&category=${categoryId}`,
        `${baseApiUri}/clues?value=1000&category=${categoryId}`,
    ];
    categoryIds.push(categoryId);
    return urls;
}

function random(min, max) {
    return Math.floor((Math.random() * max) + min);
}

const data = {
    boardData: cluesByCategoryResponse
}
module.exports = data;