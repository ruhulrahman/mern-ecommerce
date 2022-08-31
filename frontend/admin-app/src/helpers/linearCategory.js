const linearCategory = (categories, options = []) => {
    categories.forEach(item => {
        options.push({
            value: item._id,
            id: item._id,
            name: item.name,
            label: item.name,
            type: item.type,
            parentId: item.parentId,
        })
        if (item.children.length > 0) {
            linearCategory(item.children, options)
        }
    })
    return options
}

export default linearCategory