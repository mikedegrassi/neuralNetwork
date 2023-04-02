const nn = ml5.neuralNetwork({task: 'regression'})
nn.load('./model/model.json', modelLoaded)

async function modelLoaded() {
    console.log("Cool")

}


let button = document.getElementById('predict')
button.addEventListener('click', predict)

async function predict() {
    let education = document.getElementById('education').value;
    let faculty = document.getElementById('faculty').value;
    let publications = document.getElementById('publications').value;

    console.log(education, faculty)

    const result = await nn.predict({
        education: parseInt(education),
        faculty: parseInt(faculty),
        publications: parseInt(publications)
    })
    console.log(result)

    let endResult = document.getElementById('result')
    endResult.innerHTML = `Predicted Score = ${result[0].score}/100    `;
}