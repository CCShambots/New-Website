document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const blogPosts = document.querySelectorAll(".blog-posts .blog-post");
    const blogNavLinks = document.querySelector(".blog-nav-links");

    postsData = Array.from(blogPosts).map(post => ({
        title: post.querySelector("h2").textContent,
        content: post.querySelector("p").textContent
    }));

    const fuse = new Fuse(postsData, {
        keys: [
            { name: "title", weight: 2 },   // title matches count more than body matches
            { name: "content", weight: 1 }
        ],
        threshold: 0.3,        // 0 = exact match only, 1 = match almost anything
        ignoreLocation: true,  // don't penalize matches based on where they appear in the string
        includeMatches: true,  // needed if you want to highlight matched text
        minMatchCharLength: 2
    });

    function renderPosts(items) {
        blogPostsEl.innerHTML = "";

        if (items.length === 0) {
            const noResults = document.createElement("p");
            noResults.id = "no-results-message";
            noResults.textContent = "No results found.";
            blogPostsEl.appendChild(noResults);
            return;
        }

        items.forEach(item => {
            const post = document.createElement("div");
            post.className = "post";

            const h2 = document.createElement("h2");
            h2.textContent = item.title;

            const p = document.createElement("p");
            p.textContent = item.content;

            post.appendChild(h2);
            post.appendChild(p);
            blogPostsEl.appendChild(post);
        });
    }

    function filterPosts() {
        const term = searchInput.value.trim();

        if (!term) {
            renderPosts(postsData);
            return;
        }

        const results = fuse.search(term).map(result => result.item);
        renderPosts(results);
    }

    let debounceTimer;
    searchInput.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(filterPosts, 150);
    });

    // Populate the blog navigation links
    blogPosts.forEach(post => {
        const title = post.querySelector("h2").textContent;
        const link = post.querySelector("a").getAttribute("href");
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.textContent = title;
        anchor.href = link;
        listItem.appendChild(anchor);
        blogNavLinks.appendChild(listItem);
    });
});