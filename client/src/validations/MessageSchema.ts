import * as yup from "yup"

export const MessageSchema = yup.object().shape({
    message: yup.string().required('Message is required').min(1, 'Message must be at least 1 character')
})
