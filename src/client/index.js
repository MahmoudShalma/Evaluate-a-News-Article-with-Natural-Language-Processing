import { handleSubmit } from './js/formHandler'
import { validURL } from './js/checkURL'

import './style/base.scss'
import './style/footer.scss'
import './style/form.scss'
import './style/header.scss'

window.addEventListener('DOMContentLoaded', () => {
  
    const form = document.getElementById('form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        handleSubmit(event)
    })
});

export { handleSubmit, validURL }