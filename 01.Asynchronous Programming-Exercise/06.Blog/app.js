function attachEvents() {
    let loadPostsButton = document.getElementById('btnLoadPosts');
    loadPostsButton.addEventListener('click', loadPosts);
    let viewButton = document.getElementById('btnViewPost');
    viewButton.addEventListener('click', view);
    const selectOption = document.getElementById('posts');

    async function loadPosts() {
        const url = 'http://localhost:3030/jsonstore/blog/posts';
        const response = await fetch(url);
        const data = await response.json();
        Array.from(selectOption.children).forEach(option=>{
            option.remove();
        })
        Object.entries(data).forEach(post => {
            const option = document.createElement('option');
            option.value = post[0];
            option.textContent = post[1].title;
            selectOption.appendChild(option);
        })
    }
    async function view() {
        const url = 'http://localhost:3030/jsonstore/blog/comments';
        const response = await fetch(url);
        const data = await response.json();
        const postsUrl = 'http://localhost:3030/jsonstore/blog/posts';
        const postsResponse = await fetch(postsUrl);
        const postsData = await postsResponse.json();

        const postId = selectOption.value;
        const commentsArr = Object.values(data);
        const comments = commentsArr.filter(x => x.postId === postId);
        const searchedPost = postsData[postId];
        const title = searchedPost.title;
        const id=searchedPost.id;
        document.getElementById('post-title').textContent = title;
        const body = searchedPost.body;
        let postBody=document.getElementById('post-body');
        postBody.textContent=body;
        let commentsUl = document.getElementById('post-comments');
        Array.from(commentsUl.children).forEach(li=>{
            li.remove()
        })
        comments.forEach(commentObj => {
            const comment = commentObj.text;
            let liEl = document.createElement('li');
            liEl.id=id;
            liEl.textContent = comment;
            commentsUl.appendChild(liEl);
        });
    }
}

attachEvents();