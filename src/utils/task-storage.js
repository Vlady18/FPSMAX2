
export const getStorageTasks = () => {
    return JSON.parse(localStorage.getItem("Tasks")) || [];
}

export const addStorageTask = (newObj)=>{
    const storageTasks = getStorageTasks();
    storageTasks.push(newObj);
    sendToStorage(storageTasks)

}

export const updateStorageTask = (activeTask, titleValue, descriptionValue)=>{
    const storageTasks = getStorageTasks();
    const tasksChange = storageTasks.filter((el, i) => {
        if(el.id === activeTask){
            storageTasks[i].titleValue = titleValue;
            storageTasks[i].descriptionValue = descriptionValue;
        }
        return storageTasks;
    });
    sendToStorage(tasksChange)
}

export const removeStorageTask = (id)=>{
    const storageTasks = getStorageTasks();
    const resultTasks = storageTasks.filter((el) => el.id !== id);
    sendToStorage(resultTasks)
}

export const sendToStorage = (arr)=>{
    const serialObj = JSON.stringify(arr);
    localStorage.setItem('Tasks', serialObj);
}