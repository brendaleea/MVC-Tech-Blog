const postSection = document.getElementById('all-posts');

// main post elements
const postView = document.getElementById('post-view');

const postViewTitle = document.getElementById('post-view-title');
const postViewInfo = document.getElementById('post-view-info');
const postViewContent = document.getElementById('post-view-content');

let currentPostId = null;


const goToPost = function (event) {
    currentTarget = event.target
    container = '';
    while (container !== 'post-container') {
        container = currentTarget.getAttribute('name');
        if (container !== 'post-container') currentTarget = currentTarget.parentElement;
    }
    currentPostId = currentTarget.id;

    const title = document.getElementById(`title-${currentTarget.id}`).textContent;
    const date = document.getElementById(`date-${currentTarget.id}`).textContent;
    const author = document.getElementById(`author-${currentTarget.id}`).textContent;
    const content = document.getElementById(`content-${currentTarget.id}`).textContent;

    // set post view elements
    postViewTitle.textContent = title;
    postViewInfo.textContent = `Post on ${date} by ${author}`;
    postViewContent.textContent = content;

    postSection.setAttribute('style', 'display: none');
    postView.setAttribute('style', 'display: block');

    // fetch comments
    fetch(`/api/post/comments/${currentPostId}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                comments.setAttribute('style', 'display: block');
            } else {
                return;
            }
            for (let i = 0; i < data.length; i++) {
                const currentComment = data[i];

                const commentContainer = document.createElement('div')
                const commentTitleContainer = document.createElement('div')
                const commentAuthor = document.createElement('h3')
                const commentDate = document.createElement('p')
                const commentContentContainer = document.createElement('p')

                commentTitleContainer.setAttribute('class', 'mx-3');
                commentTitleContainer.appendChild(commentAuthor);
                commentTitleContainer.appendChild(commentDate);

                commentContentContainer.setAttribute('class', 'mx-5');

                commentContainer.setAttribute('class', 'd-flex align-items-center my-4');

                commentContainer.appendChild(commentTitleContainer);
                commentContainer.appendChild(commentContentContainer);

                commentAuthor.textContent = currentComment.author;
                commentDate.textContent = currentComment.date;
                commentContentContainer.textContent = currentComment.content;

                comments.appendChild(commentContainer);
            }
        });
}

// leave current post
const backBtn = document.getElementById('back-button');

backBtn.addEventListener('click', (event) => {
    postSection.setAttribute('style', 'display: block');
    postView.setAttribute('style', 'display: none');
});


/* Add Comment Section */
try {
    const comments = document.getElementById('comments')

    const addCommentBtn = document.getElementById('add-comment');
    const addCommentSection = document.getElementById('post-comment-section');

    const commentContent = document.getElementById('post-comment-content');

    const cancelCommentBtn = document.getElementById('cancel-comment');
    const postCommentBtn = document.getElementById('post-comment');


    addCommentBtn.addEventListener('click', (event) => {
        addCommentBtn.setAttribute('style', 'display: none');
        addCommentSection.setAttribute('style', 'display: block');
    });

    postCommentBtn.addEventListener('click', (event) => {
        const content = commentContent.value;

        // send data to backend
        fetch('/api/post/comment', {
            method: 'POST',
            body: JSON.stringify({
                postid: currentPostId,
                content
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                if (response.ok) {
                    location.reload();
                } else {
                    alert('failed to send comment');
                }
            });
    });

    cancelCommentBtn.addEventListener('click', (event) => {
        addCommentSection.setAttribute('style', 'display: none');
        addCommentBtn.setAttribute('style', 'display: inline-block');
    });
} catch (e) { }