export const extractFromData = formData => {
    if (!formData) return false

    const fields = {
        ...formData
    }
    const data = {}

    for (const key in fields) {
        if (fields[key].value) {
            data[fields[key].name] = fields[key].value;
        }
    }

    return {
        ...data
    }
}