let darkmode = localStorage.getItem('darkmode');
const toggle = document.getElementById('theme-toggle');

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    document.getElementById("brand-logo").src = "assets/Logo (3).svg"
    document.getElementById("footer-logo").src = "assets/Copyright info (1).svg"
    localStorage.setItem('darkmode', 'active')
    document.getElementById("theme-toggle").checked = true
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    document.getElementById("brand-logo").src = "assets/Logo.svg"
    document.getElementById("footer-logo").src = "assets/Copyright info.svg"
    localStorage.setItem('darkmode', null)
    document.getElementById("theme-toggle").checked = false
}

if(darkmode === 'active') enableDarkmode()

toggle.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
})

{
    let posts = [];
    let currentIndex = 0; 
    const limit = 10;
    const defaultPosts = 9;


    fetch("json/post.json")
    .then(res => res.json())
    .then(data => {
        posts = data;
        loadPosts(defaultPosts);
    })
    .catch(err => console.error("Error:", err));


    function loadPosts(limit) {
        const container = document.getElementById("postGrid");
        const nextPosts = posts.slice(currentIndex, currentIndex + limit);

        nextPosts.forEach(post => {
            const div = document.createElement("div");
            div.className = "col";
            div.innerHTML = `
            <div class="card">
                <img src="${post.imgSrc}" class="card-img" alt="post${post.id}">
                <div class="card-body p-2">
                <span class="category">${post.category}</span>
                <h4 class="card-title mt-3"><b>${post.title}</b></h4>
                <div class="post-info d-flex align-items-center">
                    <div class="user">
                    <i class="fa-solid fa-circle-user"></i>
                    <span class="author">${post.author}</span>
                    </div>
                    <span class="date">${post.date}</span>
                </div>
                </div>
            </div>
            `;
            container.appendChild(div);
        });

        currentIndex += limit;


        if (currentIndex >= posts.length) {
            document.getElementById("loadMoreBtn").style.display = "none";
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => loadPosts(limit));
    }
    });
}