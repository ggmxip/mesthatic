export const sendContactEmail = async (formData) => {
  console.log('Contact form submission:', formData)
  return { status: 'success', data: formData }
}

export const subscribeToNewsletter = async (email) => {
  console.log('Newsletter subscription:', email)
  return { status: 'success', email }
}