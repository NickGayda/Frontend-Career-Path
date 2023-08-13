const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]

const content = document.getElementById("content");

posts.forEach((post) => {

    /* Create Post */
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("container");
    containerDiv.classList.add("post-container");

    /* User Details */
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info-container");

    const avatarImg = document.createElement("img");
    avatarImg.classList.add("avatar");
    avatarImg.src = post.avatar;
    avatarImg.alt = `${post.name}'s avatar`;

    const userInfoP = document.createElement("p");
    userInfoP.classList.add("user-info");

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("bold-text");
    nameSpan.textContent = post.name;

    const locationSpan = document.createElement("span");
    locationSpan.textContent = post.location;

    /* Post Details */
    const postImg = document.createElement("img");
    postImg.classList.add("post");
    postImg.src = post.post;
    postImg.alt = `${post.name}'s post`;
    postImg.addEventListener("dblclick", () => {
        if (likeImg.src.includes("images/icon-heart-red.png")) {
            post.likes--;
            likeCountSpan.textContent = `${post.likes} likes`;
            likeImg.src = "images/icon-heart.png";
        } else {
            post.likes++;
            likeCountSpan.textContent = `${post.likes} likes`;
            likeImg.src = "images/icon-heart-red.png";
        }
    });

    const postDetailDiv = document.createElement("div");
    postDetailDiv.classList.add("post-detail-container");

    const likeImg = document.createElement("img");
    likeImg.classList.add("icon");
    likeImg.src = "images/icon-heart.png";
    likeImg.alt = "heart icon";
    likeImg.addEventListener("click", () => {
        if (likeImg.src.includes("images/icon-heart-red.png")) {
            post.likes--;
            likeCountSpan.textContent = `${post.likes} likes`;
            likeImg.src = "images/icon-heart.png";
        } else {
            post.likes++;
            likeCountSpan.textContent = `${post.likes} likes`;
            likeImg.src = "images/icon-heart-red.png";
        }
    });

    const commentImg = document.createElement("img");
    commentImg.classList.add("icon");
    commentImg.src = "images/icon-comment.png";
    commentImg.alt = "comment icon";

    const shareImg = document.createElement("img");
    shareImg.classList.add("icon");
    shareImg.src = "images/icon-dm.png";

    const likeCountSpan = document.createElement("span");
    likeCountSpan.classList.add("bold-text");
    likeCountSpan.classList.add("mg-topbot-12");
    likeCountSpan.classList.add("block");
    likeCountSpan.textContent = `${post.likes} likes`;

    const captionSpan = document.createElement("span");
    captionSpan.classList.add("mg-topbot-12");
    captionSpan.classList.add("block");

    const usernameSpan = document.createElement("span");
    usernameSpan.classList.add("bold-text");
    usernameSpan.textContent = post.username;

    const commentSpan = document.createElement("span");
    commentSpan.textContent = ` ${post.comment}`;

    /* Append Elements */
    content.appendChild(containerDiv);

    containerDiv.appendChild(userInfoDiv);

    userInfoDiv.appendChild(avatarImg);
    userInfoDiv.appendChild(userInfoP);

    userInfoP.appendChild(nameSpan);
    userInfoP.appendChild(locationSpan);

    containerDiv.appendChild(postImg);
    containerDiv.appendChild(postDetailDiv);

    postDetailDiv.appendChild(likeImg);
    postDetailDiv.appendChild(commentImg);
    postDetailDiv.appendChild(shareImg);
    postDetailDiv.appendChild(likeCountSpan);
    postDetailDiv.appendChild(captionSpan);

    captionSpan.appendChild(usernameSpan);
    captionSpan.appendChild(commentSpan);
});