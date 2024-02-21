const createForm = document.getElementById('post-form');

const createPostBtn = document.getElementById('create-post');
const cancelPostBtn = document.getElementById('cancel-post');

const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content');


const hideForm = function () {
    createForm.setAttribute('style', 'display: none;');
    showFormBtn.setAttribute('style', 'display: block;');
    currentPosts.setAttribute('style', 'display: block;');

    postTitle.value = '';
    postContent.value = '';
}


createPostBtn.addEventListener('click', async (event) => {
    const title = postTitle.value.trim();
    const content = postContent.value.trim();

    // send data to backend
    fetch('/api/post/create', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => {
            if (response.ok) {
                location.reload();
            } else {
                alert('failed to create post');
            }
        });

});

cancelPostBtn.addEventListener('click', hideForm);



const showFormBtn = document.getElementById('show-post-form');

showFormBtn.addEventListener('click', (event) => {
    currentPosts.setAttribute('style', 'display: none');
    showFormBtn.setAttribute('style', 'display: none');
    createForm.setAttribute('style', 'display: block;');
});



// handle current posts
const currentPosts = document.getElementById('current-posts');

// update post form
const updateForm = document.getElementById('update-post-form');
const updateTitle = document.getElementById('update-post-title');
const updateContent = document.getElementById('update-post-content');

const updatePostBtn = document.getElementById('update-post');
const cancelUpdatePostBtn = document.getElementById('cancel-post-update');
const deletePostBtn = document.getElementById('delete-post');

const postId = document.getElementById('post-id')


const showUpdateForm = function (event) {
    currentTarget = event.target
    container = '';
    while (container !== 'post-container') {
        container = currentTarget.getAttribute('name');
        if (container !== 'post-container') currentTarget = currentTarget.parentElement;
    }

    // get data from backend
    fetch(`/api/post/${currentTarget.id}`)
        .then((response) => response.json())
        .then((data) => {
            updateTitle.value = data.title;
            updateContent.value = data.content;
            postId.textContent = currentTarget.id

            updateForm.setAttribute('style', 'display: block');
            currentPosts.setAttribute('style', 'display: none');
            showFormBtn.setAttribute('style', 'display: none');
        });

}

const hideUpdateForm = function (event) {
    updateForm.setAttribute('style', 'display: none');
    currentPosts.setAttribute('style', 'display: block');
    showFormBtn.setAttribute('style', 'display: block');
}

updatePostBtn.addEventListener('click', (event) => {
    const title = updateTitle.value;
    const content = updateContent.value;

    // send data to backend
    fetch(`/api/post/update/${postId.textContent}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
        if (response.ok) {
            location.reload();
        } else {
            alert('failed to update post');
        }
    });
});

cancelUpdatePostBtn.addEventListener('click', (event) => {
    hideUpdateForm(event);
});

deletePostBtn.addEventListener('click', (event) => {
    // send data to backend
    fetch(`/api/post/delete/${postId.textContent}`, {
        method: 'DELETE',
    })
    .then((response) => {
        if (response.ok) {
            location.reload();
        } else {
            console.log(response)
            alert('failed to delete post');
        }
    });
});