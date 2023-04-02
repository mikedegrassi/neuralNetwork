
function loadData() {
    Papa.parse("./data/cwurData.csv", {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => prepareData(results.data)
    })
}

// Name,Platform,Year_of_Release,Genre,Publisher,NA_Sales,EU_Sales,JP_Sales,Other_Sales,Global_Sales,Critic_Score,Critic_Count,User_Score,User_Count,Developer,Rating

// world_rank,institution,country,national_rank,quality_of_education,alumni_employment,quality_of_faculty,publications,influence,citations,broad_impact,patents,score,year

function prepareData(data) {

    const nn = ml5.neuralNetwork({task: 'regression', debug: true})

    data.sort(() => Math.random() > 0.5)
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)

    for (let school of trainData) {

        // console.log(school.Critic_Score)

        nn.addData({ education: school.quality_of_education, faculty: school.quality_of_faculty, publications: school.publications },
            { score: school.score})

        // nn.addData({skills: player.skills, pace: player.pace, shooting:player.shooting, passing: player.passing, dribbling: player.dribbling, defending: player.defending, physicality: player.physicality, in_school_stats: player.in_school_stats }, { rating: player.rating })

    }

    nn.normalizeData()

    console.log('hoi')

    nn.train({ epochs: 10 }, () => trainCompleted(nn))
}

function trainCompleted(nn) {
    let button = document.getElementById('button')
    button.addEventListener('click', (event) => saveModel(nn));
}

function saveModel(nn) {
    nn.save()
}

loadData()