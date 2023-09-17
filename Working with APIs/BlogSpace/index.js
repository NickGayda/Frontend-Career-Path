const blogPosts = document.getElementById('blog-posts')
const postTitle = document.getElementById('post-title')
const postBody = document.getElementById('post-body')
const newPost = document.getElementById('new-post')

let postsArray = []

function renderPosts() {
    let postsHtml = ""
    postsArray.forEach(post => {
        postsHtml += `
        <div class='blog'>
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        </div>
        `
    })
    blogPosts.innerHTML = postsHtml
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()
    })

document.getElementById('new-post').addEventListener('submit', (event) => {
    event.preventDefault()

    const post = {
        title: postTitle.value,
        body: postBody.value
    }

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(post => {
        postsArray.unshift(post)
        renderPosts()
        newPost.reset()
    })
})