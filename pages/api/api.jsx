import Data from '../../Data/Data.json'

export default function handler(req, res) {

    // console.log(req.method);

    let index
    let newTask
    switch (req.method) {
        case "GET":
            res.status(200).json(Data)
            break;

        case "PUT":
            newTask = req.body.newTask
            const maxID = Math.max(...Data.map(o => o.id), 0) + 1;
            newTask.id = maxID
            Data.push(newTask)
            // console.log(Data);
            res.status(200).json({ text: 'Task added successfully' })
            break;

        case "POST":
            // console.log(req.body.id);
            let id = req.body.id
            let task = Data.filter((task) => task.id === id)[0]
            res.status(200).json(task)
            break;

        case "PATCH":
            newTask = req.body.newTask
            index = Data.findIndex((task) => task.id === parseInt(newTask.id))
            Data[index] = newTask
            res.status(200).json({ text: 'The task details have been successfully changed' })
            break;

        case "DELETE":
            // console.log(req.method,'DELETE')
            index = Data.findIndex((task) => task.id === parseInt(req.body.id))
            Data.splice(index, 1)
            res.status(200).json({ text: 'Task deleted successfully' })
            break;

        default:
            break;
    }
}