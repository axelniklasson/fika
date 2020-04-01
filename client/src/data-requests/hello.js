export const pingServer = () => {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}`)
            .then(res => res.json())
            .then(({ message }) => resolve({ message }))
            .catch(error => reject(error))
    })
}
