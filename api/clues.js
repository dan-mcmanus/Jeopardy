const rp = require('request-promise');
let cluesByCategoryResponse = [],
    allUrls = [];
const baseApiUri = 'http://jservice.io/api';
const count = 50;

const categoryOptions = {
    uri: `${baseApiUri}/categories?count=${count}`,
    json: true
};

const categoriesPromise = rp(categoryOptions);

categoriesPromise.then((response) => {
    const randomIndexes = [random(1, count), random(1, count), random(1, count), random(1, count), random(1, count)];

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
        let promise = rp({ uri: url, json: true });
        promises.push(promise);
    });

    Promise.all(promises).then((response) => {
        response.forEach((val) => {
            if (val.length > 0) {
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
    return [
        `${baseApiUri}/clues?value=100&category=${categoryId}`,
        `${baseApiUri}/clues?value=200&category=${categoryId}`,
        `${baseApiUri}/clues?value=300&category=${categoryId}`,
        `${baseApiUri}/clues?value=400&category=${categoryId}`,
        `${baseApiUri}/clues?value=500&category=${categoryId}`,
        `${baseApiUri}/clues?value=600&category=${categoryId}`,
        `${baseApiUri}/clues?value=700&category=${categoryId}`,
        `${baseApiUri}/clues?value=800&category=${categoryId}`,
        `${baseApiUri}/clues?value=900&category=${categoryId}`,
        `${baseApiUri}/clues?value=1000&category=${categoryId}`
    ];
}

function random(min, max) {
    return Math.floor((Math.random() * max) + min);
}

const data = {
    boardData: cluesByCategoryResponse
}

module.exports = data;