const API_URL = 'https://wedev-api.sky.pro/api/v1/masha-pavlenko/comments'
function formatDate(dateString) {
    const date = new Date(dateString)

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString().slice(-2)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${day}.${month}.${year} ${hours}:${minutes}`
}
export function fetchComments(onSuccess) {
    return fetch(API_URL, {
        method: 'GET',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка отправки комментариев')
            }
            return response.json()
        })
        .then((responseData) => {
            const newComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: comment.isLiked,
                    date: formatDate(comment.date),
                }
            })
            onSuccess(newComments)
        })
        .catch((error) => {
            console.log(error)
            throw error
        })
}
export function postComment(name, text, onSuccess) {
    return fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            text: text,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка отправки комментария')
            }

            return response.json()
        })
        .then((data) => {
            console.log('Ответ сервера:', data)
            return onSuccess()
        })
        .catch((error) => {
            console.log(error)
            throw error
        })
}
