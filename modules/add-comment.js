import { escapeHtml } from './escape-html.js'
import { postComment, fetchComments } from './api.js'
const formElement = document.querySelector('.add-form')
const loadingElement = document.querySelector('.add-form-loading')
let isLoading = false
export function addCommentListener(
    comments,
    nameEl,
    textEl,
    buttonEl,
    onChange,
) {
    buttonEl.addEventListener('click', function () {
        if (isLoading) {
            return
        }
        if (nameEl.value.trim() === '' || textEl.value.trim() === '') {
            return
        }
        isLoading = true
        formElement.classList.add('hidden')
        loadingElement.classList.remove('hidden')

        postComment(
            escapeHtml(nameEl.value.trim()),
            escapeHtml(textEl.value.trim()),
            () => {
                return fetchComments((newComments) => {
                    comments.splice(0, comments.length, ...newComments)
                    onChange()

                    nameEl.value = ''
                    textEl.value = ''
                })
            },
        )
            .then(() => {
                isLoading = false

                formElement.classList.remove('hidden')
                loadingElement.classList.add('hidden')
            })
            .catch((error) => {
                console.log(error)

                isLoading = false

                formElement.classList.remove('hidden')
                loadingElement.classList.add('hidden')
            })
    })
}
