function validateTask(task) {
    if (!task.title || !task.description) {
        return false;
    }
    return true;
}

module.exports = validateTask;