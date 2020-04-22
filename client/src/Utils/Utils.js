export const scrollToTop = () => {
    window.scrollTo(0, 0)
}

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

export const freezPageScroll = () => {
    if (document.body.style.overflow === "hidden") {
        document.body.style.overflow ="";
        document.body.style.width = "";
    } else {
        document.body.style.overflow ="hidden";
        document.body.style.width = "100%";
    }
}
