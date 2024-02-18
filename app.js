const message = document.querySelector('#message')
const newsForm = document.querySelector('#newsForm')
const container = document.querySelector('#container')
const search = document.querySelector('#search')
const resultNum = document.getElementById('resultNum')
const news = document.getElementById("news")


const getNews = async () => {
    let url = `https://newsdata.io/api/1/news?apikey=pub_382913f3350be2fba3e927c99fdad97348631&q=${search.value}&language=en`
    const response = await fetch(url)
    const data = await response.json()
    if (!response.ok) throw error(data.error.message);
    return data
    console.log(data);
}

newsForm.addEventListener("submit", async (Event) => {
    Event.preventDefault()
    try {
        const info = await getNews();
        console.log(info);
        showNews(info)
    } catch (error) {
        console.error('Error:', error)
    }

})

const showNews = async (info) => {

  news.innerHTML = ""
  if (info.totalResults != undefined) {
    resultNum.innerHTML = `(${info.totalResults}) Results Found for ${search.value}`
  }

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

        news.innerHTML = news.innerHTML +`
        <div class="place-items-center min-[2100px]:w-[400px] min-[1800px]:w-[350px] min-[1950px]:w-[375px] w-72 bg-white mx-auto place-self-center p-4 min-h-[620px] md:max-h-[620px]">
        <img class="min-[1500px]:max-h-[130px] mx-auto min-[1800px]:max-h-[160px] min-[1950px]:max-h-[200px]" src="${item.image_url}" alt="Sorry Image Can't be loaded">
        <h2 class="text-sky-400 text-center text-xl font-semibold mt-[${num}]">${item.title}</h2>
        <p class="mt-5 mx-8 text-center">${myArray}</p>
        <a  class="place-items-center -mr-20" target="_blank" href="${item.link}">
        <button class="bg-red-500 px-8 min-[2100px]:ml-[80px] min-[1800px]:ml-[75px] min-[1600px]:ml-[70px] ml-[65px] py-3 rounded-xl mt-10 min-[1800px]:px-12 min-[1800px]:py-5 min-[1800px]:text-lg">Read More<button></a>
        </div>
        `
    }
}