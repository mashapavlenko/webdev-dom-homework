function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}
export function addLikeListeners(comments, commentsEl, onChange) {
    const likeButtons = commentsEl.querySelectorAll('.like-button')

    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', function (event) {
            event.stopPropagation()

            const index = likeButton.dataset.index
            const comment = comments[index]

            if (comment.isLikeLoading) {
                return
            }
            comment.isLikeLoading = true
            onChange()

            delay(2000).then(() => {
                comment.likes = comment.isLiked
                    ? comment.likes - 1
                    : comment.likes + 1

                comment.isLiked = !comment.isLiked
                comment.isLikeLoading = false

                onChange()
            })
        })
    }
}
