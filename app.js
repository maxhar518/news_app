const news = document.getElementById("news")
const search = document.getElementById('search')
const newsForm = document.getElementById('newsForm')


const getNews = async () => {
    let url = `https://newsdata.io/api/1/news?apikey=pub_382913f3350be2fba3e927c99fdad97348631&q=${search.value}&language=en`
    const response = await fetch(url)
    const data = await response.json()
    if (!response.ok) throw new Error(data.error.message);
    // console.log(data);
    return data;
}

newsForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    try {
        const info = await getNews();
        console.log(info);
        showNews(info)
    } catch (error) {
        console.error('Error:', error)
    }

})

const showNews = (info) => {
    news.innerHTML = ""

    for (let item of info.results) {
        let description = item.description
        let myArray = description.split(" ")
        let length = myArray.length
        let num = 2
        if (item.image_url === null || undefined) {
            num = "270px"
        }
        if (length > 20) {
            myArray.splice(20, (length - 1));
        }
        myArray.push("...")
        myArray = myArray.join(" ")

        news.innerHTML = news.innerHTML + `
        <div class="card m-4" style="width: 18rem;">
           <img src="${item.image_url}" class="card-img-top" alt="Can't load image">
            <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${myArray}</p>
            <a href="${item.link}" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        `
    }
}