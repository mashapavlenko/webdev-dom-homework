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
            if (response.status === 500) {
                throw new Error('Ошибка сервера')
            }
            if (!response.ok) {
                throw new Error('Неизвестная ошибка')
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
            if (error.message === 'Ошибка сервера') {
                alert('Сервер сломался, попробуй позже')
            }
            if (error.name === 'TypeError') {
                alert('Кажется, у вас сломался интернет, попробуйте позже')
            }
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
            if (response.status === 500) {
                throw new Error('Ошибка сервера')
            }
            if (response.status === 400) {
                throw new Error('Короткий комментарий')
            }
            if (!response.ok) {
                throw new Error('Неизвестная ошибка')
            }
            return response.json()
        })
        .then((data) => {
            console.log('Ответ сервера:', data)
            return onSuccess()
        })
        .catch((error) => {
            if (error.message === 'Короткий комментарий') {
                alert('Имя и комментарий должны быть не короче 3 символов')
            }
            if (error.message === 'Ошибка сервера') {
                alert('Сервер сломался, попробуй позже')
            }
            if (error.name === 'TypeError') {
                alert('Кажется, у вас сломался интернет, попробуйте позже')
            }
            console.log(error)
            throw error
        })
}
